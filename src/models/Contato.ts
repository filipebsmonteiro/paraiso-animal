import { TipoInterface } from "@/models/Tipos/Tipo";
import TipoContato from "@/models/Tipos/TipoContato";
import { FirestoreModel } from "@/models/Base/FirestoreModel";

export interface ContatoInterface {
  id: string | number;
  valor: string;
  tipo: TipoInterface | string | number | null | undefined;
}

export class Contato extends FirestoreModel implements ContatoInterface {
  constructor(
    public id: string,
    public valor: string,
    public tipo: TipoInterface,
  ) {
    super(id, { valor, tipo })
  }
}

export default new Contato(``, ``, TipoContato);
