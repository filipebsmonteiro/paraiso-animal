import { default as Pessoa, PessoaInterface } from "@/models/Pessoa";
import { FirebaseRepository } from "@/repositories/Base/FirebaseRepository";

class PessoaRepository extends FirebaseRepository {
  constructor() {
    super(Pessoa, `pessoa`);
  }

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

  async put(id: string, {
    nome,
    fantasia,
    razaoSocial,
    observacao,
    contato
  }: PessoaInterface)
  {
    return super.put(id, {
      nome,
      fantasia,
      razaoSocial,
      observacao,
      contato
    });
  }
}

export default new PessoaRepository()
