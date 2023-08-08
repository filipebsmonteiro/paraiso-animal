import ContatoRepository from "@/repositories/ContatoRepository";
import PessoaRepository from "@/repositories/PessoaRepository";
import TipoContatoRepository from "@/repositories/TipoContatoRepository";

export default {
  async find(id: string | number, params: any = null) {
    this.loading = true;

    await PessoaRepository.fetchOne(id, params)
      .then(response => this.current = response)
      .catch((error) => {
        console.error(`Error On Load Pessoa: ${id}`);
        console.error(error);
        this.current = null
      });

    this.loading = false;
  },
  async load() {
    this.loading = true;

    await PessoaRepository.fetch({ with: [`contato`] })
      .then(response => this.list = response)
      .catch((error) => {
        console.error(`Error On Load Pessoas`);
        console.error(error);
        this.list = []
      });

    // this.list.forEach(async (pessoa: any) => {
    //   pessoa = await Pessoa.hydrateRelations(pessoa, [`contato`, `dados-bancarios`, `documento`, `endereco`])
    // });

    // const unsubscribe = Pessoa.subscribeAllChanges();
    // setTimeout(() => {
    //   unsubscribe();
    // }, 10000);

    this.loading = false;
  },
  async post() {
    this.loading = true;
    let pessoa = {...this.current},
    contato = {...this.current.contato};

    if (pessoa.contato) {
      contato = await ContatoRepository.post(pessoa.contato);
    }

    await PessoaRepository.post({
      ...pessoa,
      contato
    }).catch((error) => {
      console.error(`Error On Create Pessoa`);
      console.error(error);
    });

    this.loading = false;
  }
}