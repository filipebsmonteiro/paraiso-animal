<script setup>
import { ref } from 'vue'
const props = defineProps({
  fields: {
    type: Array,
    required: true,
  },
  submitHandler: {
    type: Function,
    required: true,
  },
})

const submitting = ref(false);
const handleSubmit = async (params) => {
  submitting.value = true
  await new Promise(resolve => resolve(props.submitHandler(params)))
  submitting.value = false
}
</script>

<template>
  <FormKit
    type="form"
    id="registration-example"
    @submit="handleSubmit"
    :actions="false"
  >
    <div v-for="(field, i) in fields" :key="i">
      <FormKit
        v-if="field.type === 'group'"
        :key="i"
        :type="field.type"
        :name="field.name"
      >
        <FormKit
          v-for="(child, c) in field.children"
          v-bind="child"
          :key="c"
          :outer-class="`mb-4 ${child.outerClass}`"
        />
      </FormKit>
      <FormKit
        v-else
        v-bind="field"
        :outer-class="`mb-4 ${field.outerClass}`"
      />
    </div>
    <slot name="submit">
      <FormKit
        type="submit"
        label="Enviar"
        :disabled="submitting"
      />
    </slot>
  </FormKit>
</template>