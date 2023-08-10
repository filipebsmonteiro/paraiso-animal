import TipoContato from "@/models/Tipos/TipoContato";
import { FirebaseRepository } from "@/repositories/Base/FirebaseRepository";

class TipoContatoRepository extends FirebaseRepository {
  constructor() {
    super(TipoContato, `tipo-contato`);
  }

}

export default new TipoContatoRepository()
