<template>
  <div>
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
};
</script>
