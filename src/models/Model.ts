import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export interface ModelInterface {
  id: string | number;
}

export abstract class Model implements ModelInterface {
  constructor(public id: string, ...data: any[]) {
    this.id = id;
    data.forEach((item) => Object.assign(this, item));
  }

  toJSON(): any {
    return Object.assign({}, this);
  }

  converter = {
    toFirestore: (model: Model | null = null): any => {
      if (model) {
        const { converter, id, ...rest } = model.toJSON();
        return rest;
      } else{
        const { converter, id, ...rest } = this.toJSON();
        return rest;
      }
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): Model {
      const data = snapshot.data(options)!;
      // return new this(snapshot.id, data);
      return this.constructor(snapshot.id, data);
    }
  }

}
