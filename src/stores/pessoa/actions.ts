import ContatoRepository from "@/repositories/ContatoRepository";
import PessoaRepository from "@/repositories/PessoaRepository";

export default {
  async find(id: string | number) {
    this.loading = true;

    await PessoaRepository.find(id)
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

    // const unsubscribe = PessoaRepository.subscribeAllChanges();
    // setTimeout(() => {
    //   unsubscribe();
    // }, 10000);

    this.loading = false;
  },
  async create() {
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
  },
  async update() {
    this.loading = true;
    let pessoa = {...this.current},
    contato = {...this.current.contato};

    if (pessoa.contato) {
      ContatoRepository.put(pessoa.contato.id, pessoa.contato)
        .catch((error) => {
          console.error(`Error On Edit Contato of Pessoa`);
          console.error(error);
        })
    }

    await PessoaRepository.put(pessoa.id, {
      ...pessoa,

      //TODO: ESSE CARA DEVE SER UMA REFERENCE MAS TA VINDO COMO OBJETO
      contato
    }).catch((error) => {
      console.error(`Error On Edit Pessoa`);
      console.error(error);
    });

    this.loading = false;
  },
  async delete() {
    this.loading = true;
    let pessoa = {...this.current},
    contato = {...this.current.contato};

    if (pessoa.contato) {
      contato = await ContatoRepository.delete(pessoa.contato.id);
    }

    await PessoaRepository.delete(pessoa.id)
    .catch((error) => {
      console.error(`Error On Delete Pessoa`);
      console.error(error);
    });

    this.loading = false;
  },
}