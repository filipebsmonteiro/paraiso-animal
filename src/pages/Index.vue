<template>
  <h1>HOME</h1>
  <h1>Chegamos no estado da arte</h1>
  <h1>Mas agora falta revisar o fluxo de carregamento e reatividade, pq os subniveis são atualizados mas não mostram em tela </h1>
</template>

<script lang="ts">
import { useContatoStore } from '@/stores/contato';
import { usePessoaStore } from '@/stores/pessoa';

export default {
  name: 'Home',
  mounted() {
    const { find: findContato } = useContatoStore();
    const { find: findPessoa } = usePessoaStore();
    findContato(`O8sL1h69rIIqBT6DDQC4`); // Contato
    findPessoa(`MEduFu8c5WsgvcNOgsGT`); // Pessoa
  }
}
</script>