import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default function createStore() {
  return new Vuex.Store({
    state: {
      selected: {},
      commands: {},
    },
    mutations: {
      setSelected(state, selected) {
        // eslint-disable-next-line no-param-reassign
        state.selected = selected;
      },
      setCommands(state, commands) {
        // eslint-disable-next-line no-param-reassign
        state.commands = commands;
      },
    },
    actions: {

    },
    getters: {
      selectedCommand: (state) => {
        const category = state.commands[state.selected.category];
        if (category) {
          const command = category[state.selected.command];
          if (command) {
            return command;
          }
        }
        return {};
      },
    },
  });
}
