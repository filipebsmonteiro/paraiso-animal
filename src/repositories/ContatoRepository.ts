import { ContatoConverter, ContatoInterface } from "@/models/Contato";
import { FirebaseRepository } from "@/repositories/Firebase/FirebaseRepository";

class ContatoRepository extends FirebaseRepository {
  constructor() {
    super(`contato`);
  }

  converter = ContatoConverter

  async post({ valor, tipo }: ContatoInterface) {
    return super.post({
      valor,
      tipo: this.getDocReference(tipo, `tipo-contato`)
    });
  }

  async put(id: string, { valor, tipo }: ContatoInterface) {
    return super.put(id, {
      valor,
      tipo: this.getDocReference(tipo, `tipo-contato`)
    });
  }
}

export default new ContatoRepository()
