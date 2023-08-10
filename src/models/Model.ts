import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export interface ModelInterface {
  id: string | number;
}

export abstract class Model implements ModelInterface {
  constructor(public id: string, ...data: any[]) {
    this.id = id;
    data.forEach((item) => Object.assign(this, item));
    this.converter.toFirestore = this.converter.toFirestore.bind(this);
    this.converter.fromFirestore = this.converter.fromFirestore.bind(this);
  }

  toJSON(): any {
    const { toJSON, converter, ...rest } = this;
    return rest;
  }

  converter = {
    toFirestore: (model: Model | null = null): any => {
      if (model) {
        const { id, snapshot, ...rest } = model.toJSON();
        return rest;
      } else{
        const { id, snapshot, ...rest } = this.toJSON();
        return rest;
      }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Model => {
      let data = snapshot.data(options);
      // data = Object.entries(data)
      // .reduce((acc, [key, value]) => value?.constructor.name === `_DocumentReference` ? {...acc, [key]: { snapshot: value }} : acc, {})
      Object.assign(this, { id: snapshot.id, snapshot, ...data });
      return this.toJSON();
    }
  }

}
