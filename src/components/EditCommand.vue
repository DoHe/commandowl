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
        category: this.$store.state.editing.category,
        command: cmd,
      };
      const opts = {
        credentials: 'same-origin',
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      };
      fetch('/add_command', opts)
        .then(response => response.json())
        .then((j) => {
          console.log(j);
          this.$store.commit('addCommand', { category: this.categoryToEdit, command: cmd });
          this.stopEditing();
        })
        .catch(err => console.log(err));
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
@import "~bulma/sass/elements/form.sass";
@import "~bulma/sass/components/modal.sass";

.form-container {
  max-width: 100%;
}
</style>
