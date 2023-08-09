import { TipoInterface } from "./Tipo";
import { Model } from "./Model";

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
