<template>
  <h1>HOME</h1>
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