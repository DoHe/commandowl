<template>
  <div v-if="this.$store.state.addingCategory" class="modal is-active" @keyup.escape="stopAdding">
    <div class="modal-background" @click="stopAdding" />
    <div class="modal-content">
      <div class="container box form-container">
        <div class="field">
          <label class="label">Category</label>
          <div class="control">
            <input
              v-model="category"
              v-focus
              class="input"
              type="text"
              placeholder="Category"
              @keyup.enter="add"
            >
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button class="button is-link" @click="add">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="stopAdding" />
  </div>
</template>

<script>
import postJSON from '../helpers';

function defaultData() {
  return {
    category: '',
  };
}

export default {
  name: 'AddCommand',
  data: defaultData,
  methods: {
    add() {
      postJSON('/add_category', { category: this.category })
        .then((j) => {
          // eslint-disable-next-line no-console
          console.log(j);
          this.$store.commit('addCategory', this.category);
          this.stopAdding();
        })
        .catch((err) => console.log(err)); // eslint-disable-line no-console
    },
    stopAdding() {
      this.$store.commit('setAddingCategory', false);
      Object.assign(this.$data, defaultData());
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
