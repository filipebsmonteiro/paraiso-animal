import { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export interface TipoInterface {
  id: string;
  tipo: any;
}

export class Tipo implements TipoInterface {
  constructor(
    public id: string,
    public tipo: any,
  ) {
    this.id = id;
    this.tipo = tipo;
  }
}

export const TipoConverter = {
  toFirestore(tipo: Tipo): DocumentData {
    return {
      tipo: tipo.tipo,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Tipo {
    const data = snapshot.data(options)!;
    return new Tipo(
      snapshot.id,
      data.tipo,
    );
  }
};