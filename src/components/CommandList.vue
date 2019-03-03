<template>
  <div class="ccontainer has-background-white">
    <command-list-category
      v-for="(category, categoryTitle) in commands"
      :key="categoryTitle"
      :category="category"
      :category-title="categoryTitle"
      :selected="selected"
    />
    <a
      class="button is-rounded"
      @click="setAddingCategory"
    >
      Add category
    </a>
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
  methods: {
    setAddingCategory() {
      this.$store.commit('setAddingCategory', true);
    },
  },
};
</script>

<style lang="scss" scoped>
.ccontainer {
  padding: 20px;
}

.circle {
  display: table-cell;
  height: 20px;
  width: 20px;
  text-align: center;
  vertical-align: middle;
  border-radius: 50%;
  /*make it pretty*/
  background: #000;
  color: #fff;
}
</style>
