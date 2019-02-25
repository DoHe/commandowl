<template>
  <div class="ccontainer has-background-white">
    <h5 class="title is-4">
      {{ selectedCommand.command }}
    </h5>
    <p>{{ selectedCommand.longDescription }}</p>

    <div v-if="selectedCommand.exampleInput" class="command-container">
      <h6 class="title is-5">
        Example
      </h6>
      <div class="command has-text-light">
        <p class="command-input is-italic">
          <span class="pre">$ {{ selectedCommand.exampleInput }}</span>
        </p>
        <p class="command-output">
          <span class="pre">{{ selectedCommand.exampleOutput }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommandDetails',
  computed: {
    selectedCommand() {
      return this.$store.getters.selectedCommand;
    },
  },
};
</script>

<style lang="scss" scoped>
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
