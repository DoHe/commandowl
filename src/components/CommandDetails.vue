<template>
  <div class="ccontainer has-background-white">
    <span
      v-if="selectedCommand.command"
      class="icon is-pulled-right interative-icon"
      @click="deleteCommand"
    >
      <i class="icon-remove" />
    </span>
    <span
      v-if="selectedCommand.command"
      class="icon is-pulled-right interative-icon"
      @click="setEditing"
    >
      <i class="icon-pencil" />
    </span>
    <h5 class="title is-4">
      {{ selectedCommand.command }}
    </h5>
    <p>{{ selectedCommand.longDescription }}</p>

    <div v-if="exampleInput" class="command-container">
      <h6 class="title is-5">
        Example
      </h6>
      <div class="command has-text-light">
        <p class="command-input is-italic">
          <span class="pre">$ {{ exampleInput }}</span>
        </p>
        <p class="command-output">
          <span class="pre">{{ selectedCommand.exampleOutput }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import postJSON from '../helpers';

function formatInput(cmd, store) {
  if (!cmd.exampleInput) {
    return cmd.exampleInput;
  }

  let replaced = cmd.exampleInput;
  Object.keys(store.state.variables).forEach((varKey) => {
    replaced = replaced.replace(`{{${varKey}}}`, store.state.variables[varKey]);
  });

  return replaced;
}

export { formatInput };
export default {
  name: 'CommandDetails',
  computed: {
    selectedCommand() {
      const { command } = this.$store.getters.selectedCommand;
      return command || {};
    },
    exampleInput() {
      return formatInput(this.selectedCommand);
    },
  },
  methods: {
    setEditing() {
      this.$store.commit('setEditing', this.$store.getters.selectedCommand);
    },
    deleteCommand() {
      const { category, command } = this.$store.getters.selectedCommand;
      postJSON('/delete_command', { category, command })
        .then(() => {
          this.$store.commit('setSelected', {});
          this.$store.commit('deleteCommand', { category, command });
        })
        .catch(err => console.log(err)); // eslint-disable-line no-console
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~bulma/sass/elements/icon.sass";
@import "~bulma/sass/elements/title.sass";
@import "@/assets/styles.scss";
@import "@/assets/variables.scss";

.ccontainer {
  padding: 10px;
}

.command-container {
  padding-top: 20px;
}

.command {
  background-color: $dark;
  padding: 20px;
}

.command-input {
  padding-left: 5px;
}

.command-input,
.command-output {
  overflow-x: auto;
  max-width: 70%;
}

.pre {
  white-space: pre;
  font-family: monospace;
  max-width: 40px;
}
</style>
