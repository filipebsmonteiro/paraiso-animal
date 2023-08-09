import { Tipo } from "@/models/Tipo";
import { FirebaseRepository } from "@/repositories/Base/FirebaseRepository";

class TipoContatoRepository extends FirebaseRepository {
  constructor() {
    super(`tipo-contato`, Tipo.converter);
  }

}

export default new TipoContatoRepository()
