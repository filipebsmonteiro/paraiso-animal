<template>
  <div class="w-50 mx-auto text-center pt-5">
    <h1 class="my-5">
      {{ $route.name === 'pessoa.create' ? 'Criar' : 'Editar' }} Pessoa
    </h1>
    <FormGenerator :fields="fields" :submitHandler="submitHandler" />
  </div>
</template>

<script>
import FormGenerator from '@/components/Form/FormGenerator.vue'
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useContatoStore } from '@/stores/contato';
import { usePessoaStore } from '@/stores/pessoa';

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
                // ['matches', /^(\d{2}) \d{5}-\d{4}$/]
              ],
              // validationMessages: {
              //   matches: 'Para telefone use o formato: (xx)xxxxx-xxxx',
              // }
            },
            {
              type: 'select',
              name: 'tipo',
              modelValue: this.current?.contato?.tipo || '',
              placeholder: 'Tipo de Contato',
              validation: [[`required`]],
              options: [
                { label: 'Selecione', value: '', attrs: { disabled: true } },
              ],
            }
          ]
        },
      ]
    }
  },
  methods: {
    ...mapActions(usePessoaStore, ['find', 'post']),
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
      this.current = {
        ...this.current,
        ...params,
        contato: {
          ...this.current?.contato,
          ...params.contato,
        }
      };
      await this.post()
      .then(() => {
        this.$notify.success('Pessoa criada com sucesso!');
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