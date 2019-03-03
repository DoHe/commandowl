<template>
  <div v-if="this.$store.state.adding" class="modal is-active">
    <div class="modal-background" @click="stopAdding" />
    <div class="modal-content">
      <div class="container box form-container">
        <div class="field">
          <label class="label">Command</label>
          <div class="control">
            <input
              v-model="command"
              class="input"
              type="text"
              placeholder="Command"
            >
          </div>
        </div>

        <div class="field">
          <label class="label">Short description</label>
          <div class="control">
            <input
              v-model="shortDescription"
              class="input"
              type="text"
              placeholder="Short description"
            >
          </div>
        </div>

        <div class="field">
          <label class="label">Long description</label>
          <div class="control">
            <input
              v-model="longDescription"
              class="input"
              type="text"
              placeholder="Long description"
            >
          </div>
        </div>

        <div class="field">
          <label class="label">ExampleInput</label>
          <div class="control">
            <textarea
              v-model="exampleInput"
              class="textarea"
              placeholder="Example (Input)"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">ExampleOutput</label>
          <div class="control">
            <textarea
              v-model="exampleOutput"
              class="textarea"
              placeholder="Example (Output)"
            />
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
export default {
  name: 'AddCommand',
  data() {
    return {
      command: '',
      shortDescription: '',
      longDescription: '',
      exampleInput: '',
      exampleOutput: '',
    };
  },
  methods: {
    add() {
      const cmd = {
        command: this.command,
        shortDescription: this.shortDescription,
        longDescription: this.longDescription,
        exampleInput: this.exampleInput,
        exampleOutput: this.exampleOutput,
      };
      const payload = {
        category: this.$store.state.adding,
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
.form-container {
  max-width: 100%;
}
</style>
