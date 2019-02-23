<template>
  <aside class="menu">
    <p class="menu-label">
      {{ categoryTitle }}
    </p>
    <ul class="menu-list">
      <li
        v-for="command in category"
        :key="command.command"
        @click="handleSelected(command.command)"
      >
        <a
          :class="{
            'is-active': selected.command==command.command && selected.category==categoryTitle
          }"
        >
          <command-list-item
            :command="command.command"
            :short-description="command.shortDescription"
          />
        </a>
      </li>
    </ul>
  </aside>
</template>

<script>
import CommandListItem from '@/components/CommandListItem.vue';

export default {
  name: 'CommandListCategory',
  components: {
    CommandListItem,
  },
  props: {
    selected: {
      type: Object,
      default: () => ({}),
    },
    categoryTitle: {
      type: String,
      default: '',
    },
    category: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    handleSelected(command) {
      this.$emit('commandSelected', { category: this.categoryTitle, command });
    },
  },
};
</script>
