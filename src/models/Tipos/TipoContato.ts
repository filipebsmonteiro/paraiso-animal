import { FirestoreModel } from "@/models/Base/FirestoreModel";
import { TipoInterface } from "@/models/Tipos/Tipo";

export class TipoContato extends FirestoreModel implements TipoInterface {
  constructor(public id: string, public tipo: any) {
    super(id,  { tipo })
  }
}

export default new TipoContato(``, ``);
