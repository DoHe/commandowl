<template>
  <aside class="menu">
    <a
      class="button is-rounded is-small is-pulled-right"
      @click="setAdding"
    >
      <span class="is-size-5 has-text-weight-bold">
        +
      </span>
    </a>
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
    categoryTitle: {
      type: String,
      default: '',
    },
    category: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    selected() {
      return this.$store.state.selected;
    },
  },
  methods: {
    handleSelected(command) {
      this.$store.commit('setSelected', { category: this.categoryTitle, command });
    },
    setAdding() {
      this.$store.commit('setAdding', this.categoryTitle);
    },
  },
};
</script>
