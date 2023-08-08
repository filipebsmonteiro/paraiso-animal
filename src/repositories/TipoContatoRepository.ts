import { FirebaseRepository } from "@/repositories/Firebase/FirebaseRepository";

class TipoContatoRepository extends FirebaseRepository {
  constructor() {
    super(`tipo-contato`);
  }

}

export default new TipoContatoRepository()
