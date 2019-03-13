<template>
  <div class="modal is-active" @keyup.escape="cancel">
    <div class="modal-background" @click="cancel" />
    <div class="modal-content">
      <div class="container box form-container" @keyup.enter="done">
        <div class="field">
          <label class="label">Command</label>
          <div class="control">
            <input
              v-model="dcommand"
              v-focus
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
              v-model="dshortDescription"
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
              v-model="dlongDescription"
              class="input"
              type="text"
              placeholder="Long description"
            >
          </div>
        </div>

        <div class="field">
          <label class="label">ExampleInput</label>
          <div class="control">
            <textarea v-model="dexampleInput" class="textarea" placeholder="Example (Input)" />
          </div>
        </div>

        <div class="field">
          <label class="label">ExampleOutput</label>
          <div class="control">
            <textarea v-model="dexampleOutput" class="textarea" placeholder="Example (Output)" />
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button class="button is-link" @click="done">
              {{ cta }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="cancel" />
  </div>
</template>

<script>
function defaultData() {
  return {
    dcommand: '',
    dshortDescription: '',
    dlongDescription: '',
    dexampleInput: '',
    dexampleOutput: '',
  };
}
export default {
  name: 'CommandDialog',
  props: {
    cta: {
      type: String,
      default: '',
    },
    command: {
      type: String,
      default: '',
    },
    shortDescription: {
      type: String,
      default: '',
    },
    longDescription: {
      type: String,
      default: '',
    },
    exampleInput: {
      type: String,
      default: '',
    },
    exampleOutput: {
      type: String,
      default: '',
    },
  },
  data: defaultData,
  created() {
    this.dcommand = this.command;
    this.dshortDescription = this.shortDescription;
    this.dlongDescription = this.longDescription;
    this.dexampleInput = this.exampleInput;
    this.dexampleOutput = this.exampleOutput;
  },
  methods: {
    cancel() {
      this.$emit('canceled');
      Object.assign(this.$data, defaultData());
    },
    done() {
      this.$emit('done', {
        command: this.dcommand,
        shortDescription: this.dshortDescription,
        longDescription: this.dlongDescription,
        exampleInput: this.dexampleInput,
        exampleOutput: this.exampleOutput,
      });
      Object.assign(this.$data, defaultData());
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
