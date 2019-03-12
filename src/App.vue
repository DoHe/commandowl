<template>
  <div id="app" class="container is-fluid">
    <figure class="image is-32x32 is-pulled-left">
      <img src="./assets/icon.svg">
    </figure>
    <h1 class="title">
      Commandowl
    </h1>
    <AddCommand />
    <EditCommand />
    <AddCategory />
    <div class="columns">
      <div class="column is-two-fifths">
        <CommandList />
      </div>
      <div class="column">
        <CommandDetails :command="selectedCommand" />
      </div>
    </div>
  </div>
</template>

<script>
import CommandDetails from '@/components/CommandDetails.vue';
import CommandList from '@/components/CommandList.vue';
import AddCommand from '@/components/AddCommand.vue';
import EditCommand from '@/components/EditCommand.vue';
import AddCategory from '@/components/AddCategory.vue';

export default {
  name: 'Main',
  components: {
    CommandDetails,
    CommandList,
    AddCommand,
    AddCategory,
    EditCommand,
  },
  computed: {
    selectedCommand() {
      if (this.selected) {
        const category = this.commands[this.selected.category];
        if (category) {
          const command = category[this.selected.command];
          if (command) {
            return command;
          }
        }
      }
      return {};
    },
  },
};
</script>

<style lang="scss">
@import "~bulma/sass/grid/columns.sass";
@import "~bulma/sass/layout/section.sass";
@import "~bulma/sass/elements/container.sass";
@import "~bulma/sass/elements/image.sass";
@import "~bulma/sass/elements/title.sass";

html {
  height: 100%;
}

body {
  min-height: 100%;
  background-color: $light;
}
</style>
