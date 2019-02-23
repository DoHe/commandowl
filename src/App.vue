<template>
  <div id="app" class="container is-fluid">
    <h1 class="title">
      Commandowl
    </h1>
    <div class="columns">
      <div class="column is-two-fifths">
        <CommandList
          :commands="commands"
          :selected="selected"
          @commandSelected="commandSelected"
        />
      </div>
      <div class="column">
        <CommandDetails
          :command="selectedCommand"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CommandDetails from '@/components/CommandDetails.vue';
import CommandList from '@/components/CommandList.vue';
import commands from '@/commands';

export default {
  name: 'Main',
  components: {
    CommandDetails,
    CommandList,
  },
  data() {
    return {
      commands,
      selected: {},
    };
  },
  computed: {
    selectedCommand() {
      if (this.selected) {
        const category = commands[this.selected.category];
        if (category) {
          const command = category[this.selected.command];
          if (command) {
            return command;
          }
        }
      }
      return {};
    },
  },
  methods: {
    commandSelected(selected) {
      this.selected = selected;
    },
  },
};
</script>

<style lang="scss">
html {
  height: 100%;
}

body {
  min-height: 100%;
  background-color: $light;
}
</style>
