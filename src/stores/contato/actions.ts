import ContatoRepository from "@/repositories/ContatoRepository";
import TipoContatoRepository from "@/repositories/TipoContatoRepository";

export default {
  async find(id: string | number) {
    this.loading = true;

    await ContatoRepository.find(id)
      .then(response => this.current = response)
      .catch((error) => {
        console.error(`Error On Load Contato: ${id}`);
        console.error(error);
        this.current = null
      });

    this.loading = false;
  },
  async load() {
    this.loading = true;

    await ContatoRepository.fetch()
      .then(response => this.list = response)
      .catch((error) => {
        console.error(`Error On Load Contatos`);
        console.error(error);
        this.list = []
      });

    this.loading = false;
  },
  async loadTypes() {
    this.loading = true;

    await TipoContatoRepository.fetch()
      .then(response => this.types = response)
      .catch((error) => {
        console.error(`Error On Load Tipos de Contato`);
        console.error(error);
        this.types = []
      });

    this.loading = false;
  },
}