import { Model } from "./Model";

export interface TipoInterface {
  id: string;
  tipo: any;
}

export class Tipo extends Model implements TipoInterface {
  constructor(public id: string, public tipo: any) {
    super(id, { tipo })
  }
}
