import { QueryDocumentSnapshot, SnapshotOptions, SnapshotOptions, doc, setDoc } from "firebase/firestore";
import { ContatoInterface } from "./Contato";

export interface PessoaInterface {
  id: string;
  nome: string;
  fantasia: string;
  observacao: string;
  razaoSocial: string;
  contato: ContatoInterface[];
}

export class Pessoa implements PessoaInterface {
  constructor(
    public id: string,
    public nome: string,
    public fantasia: string,
    public observacao: string,
    public razaoSocial: string,
    public contato: ContatoInterface[],
  ) {
    this.id = id;
    this.nome = nome;
    this.fantasia = fantasia;
    this.observacao = observacao;
    this.razaoSocial = razaoSocial;
    this.contato = contato;
  }
};

export const PessoaConverter = {
  toFirestore(pessoa: Pessoa): object {
    return {
      nome: pessoa.nome,
      fantasia: pessoa.fantasia,
      observacao: pessoa.observacao,
      razaoSocial: pessoa.razaoSocial,
      contato: pessoa.contato,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Pessoa {
    const data = snapshot.data(options)!;
    return new Pessoa(
      snapshot.id,
      data.nome,
      data.fantasia,
      data.observacao,
      data.razaoSocial,
      data.contato,
    );
  }
};