<template>
  <div class="ccontainer has-background-white">
    <command-list-category
      v-for="(category, categoryTitle) in commands"
      :key="categoryTitle"
      :category="category"
      :category-title="categoryTitle"
      :selected="selected"
      @commandSelected="commandSelected"
    />
  </div>
</template>

<script>
import CommandListCategory from '@/components/CommandListCategory.vue';

export default {
  name: 'CommandList',
  components: {
    CommandListCategory,
  },
  props: {
    commands: {
      type: Object,
      default: () => ({}),
    },
    selected: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    commandSelected(selected) {
      this.$emit('commandSelected', selected);
    },
  },
};
</script>

<style lang="scss" scoped>
  .ccontainer {
    padding: 20px;
  }
</style>
