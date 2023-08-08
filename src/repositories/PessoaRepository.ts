import { PessoaConverter, PessoaInterface } from "@/models/Pessoa";
import { FirebaseRepository } from "@/repositories/Firebase/FirebaseRepository";

class PessoaRepository extends FirebaseRepository {
  constructor() {
    super(`pessoa`);
  }

  converter = PessoaConverter;

  async post({
    nome,
    fantasia,
    razaoSocial,
    observacao,
    contato
  }: PessoaInterface)
  {
    return super.post({
      nome,
      fantasia,
      razaoSocial,
      observacao,
      contato
    });
  }
}

export default new PessoaRepository()
