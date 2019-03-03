import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default function createStore() {
  return new Vuex.Store({
    state: {
      selected: {},
      commands: {},
      adding: '',
      addingCategory: false,
    },
    mutations: {
      setSelected(state, selected) {
        // eslint-disable-next-line no-param-reassign
        state.selected = selected;
      },
      setCategory(state, { name, commands }) {
        // eslint-disable-next-line no-param-reassign
        state.commands[name] = commands;
      },
      setAdding(state, adding) {
        // eslint-disable-next-line no-param-reassign
        state.adding = adding;
      },
      setAddingCategory(state, adding) {
        // eslint-disable-next-line no-param-reassign
        state.addingCategory = adding;
      },
      addCommand(state, { category, command }) {
        // eslint-disable-next-line no-param-reassign
        state.commands[category] = state.commands[category] || {};
        // eslint-disable-next-line no-param-reassign
        Vue.set(state.commands[category], command.command, command);
      },
      addCategory(state, category) {
        Vue.set(state.commands, category, {});
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
