<template>
  <router-link :to="{ name: 'pessoa.create' }" class="btn btn-link">Criar</router-link>
  <SimpleTable :columns="columns" :rows="pessoas">
    <template #nome="{ row }">
        {{ !!row.razaoSocial ? row.razaoSocial : row.nome }}
        <span v-if="row.razaoSocial" class="caption">Responsável: {{ row.responsavel }}</span>
    </template>
    <template #actions="{ row }">
      <div class="tooltip" data-tip="Editar">
        <router-link :to="{ name: 'pessoa.edit', params: { id: row.id } }">
          <font-awesome-icon icon="pencil" class="text-info" />
        </router-link>
      </div>
      <div class="tooltip" data-tip="Excluir">
        <font-awesome-icon icon="trash-can" class="text-error" @click="deleteHandler(row)" />
      </div>
    </template>
  </SimpleTable>
</template>

<script lang="ts">
import { usePessoaStore } from '@/stores/pessoa'
import { mapActions, mapWritableState } from 'pinia';
import SimpleTable from '@/components/Table/SimpleTable.vue';

export default {
  name: 'ListPage',
  components: {
    SimpleTable,
  },
  computed: {
    ...mapWritableState(usePessoaStore, {
      pessoas: 'list',
      current: 'current',
    }),
  },
  data() {
    return {
      columns: [
        { key: 'nome', label: 'Nome/Fantasia' },
        { key: 'contato', label: 'Contato', formatter: (value) => `${value?.valor} - ${value?.tipo?.tipo}` },
        { key: 'actions', label: 'Ações' },
      ],
    }
  },
  methods: {
    ...mapActions(usePessoaStore, ['delete', 'load']),
    async deleteHandler(row) {
      // this.$dialog
      //   .confirm(`Deseja excluir a pessoa ${row.nome}?`)
      //   .then(() => this.delete(row.id))
      this.current = row
      await this.delete()
      this.load()
      this.current = null
    },
  },
  created() {
    this.load()
  },
}
</script>

<style>
td .tooltip {
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;
}
</style>