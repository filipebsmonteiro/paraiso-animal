import { TipoInterface } from "@/models/Tipos/Tipo";
import TipoContato from "@/models/Tipos/TipoContato";
import { Model } from "@/models/Model";
import { QueryDocumentSnapshot, DocumentData, SnapshotOptions } from "firebase/firestore";

export interface ContatoInterface {
  id: string | number;
  valor: string;
  tipo: TipoInterface | string | number | null | undefined;
}

export class Contato extends Model implements ContatoInterface {
  constructor(
    public id: string,
    public valor: string,
    public tipo: TipoInterface,
  ) {
    super(id, { valor, tipo })
  }

  // fromFirestore = (snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>, options: SnapshotOptions): Model => {
  //   const contato = super.fromFirestore(snapshot, options);
  //   if (contato.tipo) {
  //     contato.tipo = TipoContato.fromFirestore(snapshot.get(`tipo`), options);
  //   }
  //   return contato;
  // };
}

export default new Contato(``, ``, TipoContato);
