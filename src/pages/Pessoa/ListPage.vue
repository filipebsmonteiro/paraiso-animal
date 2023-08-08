<template>
  <router-link :to="{ name: 'pessoa.create' }" class="btn btn-link">Criar</router-link>
  <SimpleTable :columns="columns" :rows="pessoas" />
</template>

<script>
import { usePessoaStore } from '@/stores/pessoa'
import { mapState } from 'pinia';
import SimpleTable from '@/components/Table/SimpleTable.vue';

export default {
  name: 'ListPage',
  components: {
    SimpleTable,
  },
  computed: {
    ...mapState(usePessoaStore, {
      pessoas: 'list'
    }),
  },
  data() {
    return {
      columns: [
        { key: 'nome', label: 'Nome' },
        { key: 'razao', label: 'Razão Social' },
        { key: 'responsavel', label: 'Responsável' },
        { key: 'contato', label: 'Contato', formatter: (value) => `${value?.valor} - ${value?.tipo?.tipo}` },
      ],
    }
  },
  async created() {
    const { load } = usePessoaStore()
    await load()
  },
}
</script>