<template>
  <div class="w-50 mx-auto text-center pt-5">
    <h1 class="my-5">
      {{ $route.name === 'pessoa.create' ? 'Criar' : 'Editar' }} Pessoa
    </h1>
    <FormGenerator :fields="fields" :submitHandler="submitHandler" />
  </div>
</template>

<script lang="ts">
import FormGenerator from '@/components/Form/FormGenerator.vue'
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useContatoStore } from '@/stores/contato';
import { usePessoaStore } from '@/stores/pessoa';
import { deepMerge } from '@/helpers/functions';

export default {
  name: 'CreateEditForm',
  components: {
    FormGenerator,
  },
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...mapState(useContatoStore, { contactTypes: 'types'}),
    ...mapWritableState(usePessoaStore, ['current']),
  },
  data() {
    return {
      fields: [
        {
          type: 'text',
          name: 'nome',
          placeholder: 'Nome ou Responsável',
          modelValue: this.current?.nome,
          validation: [[`required`]],
        },
        {
          type: 'text',
          name: 'razaoSocial',
          placeholder: 'Razão Social',
          modelValue: this.current?.razao || ``,
          // validation: [[`required`]],
        },
        {
          type: 'text',
          name: 'fantasia',
          placeholder: 'Fantasia',
          modelValue: this.current?.fantasia || ``,
          // validation: [[`required`]],
        },
        {
          type: 'text',
          name: 'observacao',
          placeholder: 'Observacao',
          modelValue: this.current?.observacao || ``,
          // validation: [[`required`]],
        },
        {
          type: 'group',
          name: 'contato',
          children: [
            {
              type: 'text',
              name: 'valor',
              modelValue: this.current?.contato?.valor,
              placeholder: 'Contato',
              validation: [
                [`required`],
                ['matches', /^\w+@\w+\.\w{2,3}|\(\d{2}\)\d{4,5}-\d{4}$/]
              ],
              validationMessages: {
                matches: 'Para contato use o formato: (99)99999-9999 ou Email válido',
              }
            },
            {
              type: 'select',
              name: 'tipo',
              modelValue: this.current?.contato?.tipo || '',
              placeholder: 'Tipo de Contato',
              validation: [[`required`]],
              options: [
                { label: 'Selecione o Tipo de Contato', value: '', attrs: { disabled: true } },
              ],
            }
          ]
        },
      ]
    }
  },
  methods: {
    ...mapActions(usePessoaStore, ['find', 'create', `update`]),
    ...mapActions(useContatoStore, {loadContactTypes: 'loadTypes'}),
    populateFieldValues() {
      this.fields.forEach(field => {
        if (field.type === 'group') {
          field.children.forEach(child => {
            child.modelValue = this.current[field.name][child.name].id ?
              this.current[field.name][child.name].id :
              this.current[field.name][child.name]
          })
        } else {
          field.modelValue = this.current[field.name]
        }
      })
    },
    async submitHandler(params) {
      this.current = deepMerge(this.current || {}, params);
      if (this.current?.id) {
        await this.update()
        .then(() => {
          this.$notify.success('Pessoa editada com sucesso!');
          this.current = null;
          this.$router.push({ name: 'pessoa.list' });
        })  
        return;
      }

      await this.create()
      .then(() => {
        this.$notify.success('Pessoa criada com sucesso!');
        this.current = null;
        this.$router.push({ name: 'pessoa.list' });
      })
    },
  },
  async mounted() {
    await this.loadContactTypes();

    this.fields.map(field => {
      if (field.name === `contato`) {
        field.children.map(contatoField => {
          if (contatoField.name === `tipo`) {
            contatoField.options = [
              ...contatoField.options,
              ...this.contactTypes.map(type => ({ label: type.tipo, value: type.id }))
            ]
          }
        })
      }
    })

    let id = this.id;
    if (this.$route.params.id && this.$route.name === `pessoa.edit`) {
      id = this.$route.params.id
    }
    if (id) {
      await this.find(id, { with: ['contato'] });
      this.populateFieldValues();
    }
  },
}
</script>