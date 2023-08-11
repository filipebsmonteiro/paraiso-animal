import { default as Contato, ContatoInterface } from "@/models/Contato";
import { Model } from "@/models/Model";
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export interface PessoaInterface {
  id: string;
  nome: string;
  fantasia: string;
  observacao: string;
  razaoSocial: string;
  contato: ContatoInterface;
}

export class Pessoa extends Model implements PessoaInterface {
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
