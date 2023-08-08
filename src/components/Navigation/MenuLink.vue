<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: "",
  },
  external: {
    type: Boolean,
    default: false,
  },
  link: {
    type: [String, Object],
    default: "#",
  },
  icon: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <component
    :is="external ? `a` : `router-link`"
    :target="external ? `_blank` : null"
    :href="external ? link : undefined"
    :to="external ? undefined : link"
    :class="{'menu-item': true, active: $route.name === link.name}"
  >
    <span class="icon">
      <font-awesome-icon v-if="icon" :icon="icon" />
    </span>

    <div>
      <span>{{ title }}</span>
      <span class="caption">
        {{ caption }}
      </span>
    </div>
  </component>
</template>

<style lang="scss" scoped>
.menu-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgrey;
  margin: 0 10px;
  padding: 2px 0;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }

  &:last-child {
    border-bottom: none;
  }

  &.active {
    border-left: 3px solid #65c3c7;
  }
  
  .icon {
    padding: 0 12px;
  }
}
</style>