<template>
  <div class="ccontainer has-background-white">
    <h5 class="title is-4">
      {{ command.command }}
    </h5>
    <p>{{ command.longDescription }}</p>

    <div v-if="command.exampleInput" class="command-container">
      <h6 class="title is-5">
        Example
      </h6>
      <div class="command has-text-light">
        <p class="command-input is-italic">
          $ {{ command.exampleInput }}
        </p>
        <p>{{ command.exampleOutput }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommandDetails',
  props: {
    command: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
  pre {
    font-size: inherit;
    color: inherit;
    border: initial;
    padding: initial;
    background-color: inherit;
  }

  .ccontainer {
    min-height: 300px;
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
</style>
