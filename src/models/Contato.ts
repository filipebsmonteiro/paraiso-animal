import { TipoInterface } from "@/models/Tipos/Tipo";
import TipoContato from "@/models/Tipos/TipoContato";
import { Model } from "@/models/Model";

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
}

export default new Contato(``, ``, TipoContato);
