<template>
  <CommandDialog
    v-if="this.$store.state.adding"
    cta="Add"
    @canceled="stopAdding"
    @done="add"
  />
</template>

<script>
import CommandDialog from '@/components/CommandDialog.vue';
import postJSON from '../helpers';

export default {
  name: 'AddCommand',
  components: {
    CommandDialog,
  },
  methods: {
    add(cmd) {
      const payload = {
        category: this.$store.state.adding,
        command: cmd,
      };
      postJSON('/add_command', payload)
        .then((j) => {
          console.log(j);
          this.$store.commit('addCommand', { category: this.$store.state.adding, command: cmd });
          this.stopAdding();
        })
        .catch(err => console.log(err));
    },
    stopAdding() {
      this.$store.commit('setAdding', '');
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
