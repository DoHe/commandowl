<template>
  <div v-if="show">
    <p>{{ command }}</p>
    <p class="has-text-grey-light is-size-7">
      {{ shortDescription }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'CommandList',
  props: {
    command: {
      type: String,
      default: '',
    },
    shortDescription: {
      type: String,
      default: '',
    },
  },
  computed: {
    show() {
      if (!this.$store.state.search) {
        return true;
      }
      if (this.command.includes(this.$store.state.search)) {
        return true;
      }
      if (this.shortDescription.includes(this.$store.state.search)) {
        return true;
      }
      return false;
    },
  },
};
</script>
