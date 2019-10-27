<template>
  <CommandDialog
    v-if="categoryToEdit"
    cta="Edit"
    :command="commandToEdit.command"
    :short-description="commandToEdit.shortDescription"
    :long-description="commandToEdit.longDescription"
    :example-input="commandToEdit.exampleInput"
    :example-output="commandToEdit.exampleOutput"
    @canceled="stopEditing"
    @done="edit"
  />
</template>

<script>
import CommandDialog from '@/components/CommandDialog.vue';
import postJSON from '../helpers';

export default {
  name: 'EditCommand',
  components: {
    CommandDialog,
  },
  computed: {
    commandToEdit() {
      const { command } = this.$store.state.editing;
      return command || {};
    },
    categoryToEdit() {
      return this.$store.state.editing.category;
    },
  },
  methods: {
    edit(cmd) {
      const payload = {
        category: this.categoryToEdit,
        newCommand: cmd,
        oldCommand: this.commandToEdit,
      };
      postJSON('/edit_command', payload)
        .then((j) => {
          // eslint-disable-next-line no-console
          console.log(j);
          this.$store.commit('editCommand', {
            category: this.categoryToEdit,
            newCommand: cmd,
            oldCommand: this.commandToEdit,
          });
          this.stopEditing();
        })
        .catch((err) => console.log(err)); // eslint-disable-line no-console
    },
    stopEditing() {
      this.$store.commit('setEditing', {});
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~bulma/sass/elements/box.sass";
@import "~bulma/sass/elements/button.sass";
@import "~bulma/sass/form/_all.sass";
@import "~bulma/sass/components/modal.sass";

.form-container {
  max-width: 100%;
}
</style>
