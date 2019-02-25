<template>
  <div class="ccontainer has-background-white">
    <command-list-category
      v-for="(category, categoryTitle) in commands"
      :key="categoryTitle"
      :category="category"
      :category-title="categoryTitle"
      :selected="selected"
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
  computed: {
    commands() {
      return this.$store.state.commands;
    },
    selected() {
      return this.$store.state.selected;
    },
  },
};
</script>

<style lang="scss" scoped>
  .ccontainer {
    padding: 20px;
  }
</style>
