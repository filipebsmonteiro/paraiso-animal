import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { TipoInterface } from "./Tipo";

export interface ContatoInterface {
  id: string | number;
  valor: string;
  tipo: TipoInterface;
}

export class Contato implements ContatoInterface {
  constructor(
    public id: string,
    public valor: string,
    public tipo: TipoInterface,
  ) {
    this.id = id;
    this.valor = valor;
    this.tipo = tipo;
  }
}

export const ContatoConverter = {
  toFirestore(contato: Contato): any {
    return {
      valor: contato.valor,
      tipo: contato.tipo,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Contato {
    const data = snapshot.data(options)!;
    return new Contato(
      snapshot.id,
      data.valor,
      data.tipo,
    );
  }
};
