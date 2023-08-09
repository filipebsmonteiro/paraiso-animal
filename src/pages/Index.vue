<template>
  <h1>HOME</h1>
</template>

<script lang="ts">
import { Contato } from '@/models/Contato';

export default {
  name: 'Home',
  // data() {
  //   return {
  //   }
  // },
  // methods: {
  // }
  mounted() {
    const contato = new Contato(`idCONTATO`, `VALORCONTATO`, { id: `TIPO_ID`, tipo: `TIPO`});
    console.log('contato :>> ', contato);
    console.log('contato.converter :>> ', contato.converter);
    console.log('contato.converter.toFirestore(contato) :>> ', contato.converter.toFirestore(contato));
    console.log('contato.converter.toFirestore() :>> ', contato.converter.toFirestore());
  }
}
</script>