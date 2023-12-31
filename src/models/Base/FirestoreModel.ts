import { DocumentReference, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { Model } from "@/models/Base/Model";

export interface FirestoreModelInterface {
  id: string | number;
  toJSON(): any;
  snapshot: QueryDocumentSnapshot | null;
  references(): Record<string, DocumentReference>;
  converter: FirestoreDataConverter<Model>;
}

export abstract class FirestoreModel extends Model implements FirestoreModelInterface {
  snapshot: QueryDocumentSnapshot|null = null;

  constructor(public id: string, ...data: any[]) {
    super(id, ...data)
    this.converter.toFirestore = this.converter.toFirestore.bind(this);
    this.converter.fromFirestore = this.converter.fromFirestore.bind(this);
  }

  toJSON(): Record<string, any> {
    const { toJSON, references, converter, ...rest } = this;
    return rest;
  }

  private isReference(value: any): boolean {
    return value?.constructor.name === `_DocumentReference` || value instanceof DocumentReference;
  }

  private getReferences(model: Record<string, any>): Record<string, DocumentReference> {
    const modelReferences = Object.entries(model)
      .reduce(
        (acc: object, [key, value]: Array<any>) =>  value.reference || this.isReference(value)
          ? {...acc, [key]: value}
          : acc,
        {}
      );

    return modelReferences;
  }

  references(): Record<string, DocumentReference> {
    const model = this.toJSON(),
    modelReferences = this.getReferences(model);

    return modelReferences;
  }

  getRelations(): Record<string, Model> {
    const model = this.toJSON();
    const relations = Object.entries(model)
      .reduce(
        (acc: object, [key, value]: Array<any>) =>  value instanceof Model
          ? {...acc, [key]: value}
          : acc,
        {}
      );
      return relations;
    }
    

  converter: FirestoreDataConverter<Model> = {
    toFirestore: (model: Model): any => {
      if (model) {
        const { id, snapshot, ...rest } = model.toJSON();
        return rest;
      } else {
        const { id, snapshot, ...rest } = this.toJSON();
        return rest;
      }
    },
    // Parse called when request snapshot.data()
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Model => {
      let data = snapshot.data(options);

      // Select which references are Models
      const references = this.getReferences(data);
      Object.keys(this.getRelations()).map(key => {

        // Change the DocReference to Model
        if (this.isReference(references[key])) {
          delete data[key];
          Object.assign(this[key], {
            id: references[key].id,
            reference: references[key]
          });
        }
      });

      Object.assign(this, { id: snapshot.id, snapshot, ...data });
      return this;
    }
  }

}
