import { default as Contato, ContatoInterface } from "@/models/Contato";
import { FirestoreModel } from "@/models/Base/FirestoreModel";

export interface PessoaInterface {
  id: string;
  nome: string;
  fantasia: string;
  observacao: string;
  razaoSocial: string;
  contato: ContatoInterface;
}

export class Pessoa extends FirestoreModel implements PessoaInterface {
  constructor(
    public id: string,
    public nome: string,
    public fantasia: string,
    public observacao: string,
    public razaoSocial: string,
    public contato: ContatoInterface,
  ) {
    super(id, { nome, fantasia, observacao, razaoSocial, contato })
  }

};

export default new Pessoa(``, ``, ``, ``, ``, Contato);
