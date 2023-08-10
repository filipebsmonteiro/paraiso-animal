import { Model } from "@/models/Model";
import { TipoInterface } from "@/models/Tipos/Tipo";

export class TipoContato extends Model implements TipoInterface {
  constructor(public id: string, public tipo: any) {
    super(id,  { tipo })
  }
}

export default new TipoContato(``, ``);
