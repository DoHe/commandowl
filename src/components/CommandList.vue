<template>
  <div class="ccontainer has-background-white">
    <div class="field">
      <p class="control has-icons-right">
        <input
          v-model="search"
          class="input is-rounded"
          type="text"
          name="search"
          placeholder="Filter"
        >
        <span class="icon is-small is-right">
          <i class="icon-search" />
        </span>
      </p>
    </div>
    <command-list-category
      v-for="(category, categoryTitle) in commands"
      :key="categoryTitle"
      :category="category"
      :category-title="categoryTitle"
      :selected="selected"
    />
    <a
      class="button is-rounded add-button"
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
    search: {
      get() {
        return this.$store.state.search;
      },
      set(value) {
        this.$store.commit('setSearch', value);
      },
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
@import "~bulma/sass/elements/button.sass";
@import "~bulma/sass/form/_all.sass";
@import "~bulma/sass/elements/icon.sass";
@import "@/assets/styles.scss";
@import "@/assets/variables.scss";

.ccontainer {
  padding: 20px;
}

.add-button {
  margin-top: 20px;
}
</style>
