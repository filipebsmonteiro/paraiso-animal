<script>
import { mapActions } from "pinia";
import { useAuthStore } from "@/stores/auth";

export default {
  methods: {
    ...mapActions(useAuthStore, { storeLogin: `login` }),
    async login(provider) {
      await this.storeLogin(provider);
      this.$router.push({ name: `home` });
    },
  },
};
</script>

<template>
  <div class="bg-blur p-5 rounded">
    <button class="btn" @click="login(`google`)">
      <font-awesome-icon :icon="['fab', 'google']" class="cursor-pointer"/>
      Logar com Google
    </button>
  </div>
</template>

<style lang="scss" scoped>
.button {
  @apply bg-white text-black;
  margin-bottom: 1rem;
}
</style>
