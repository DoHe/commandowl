import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default function createStore() {
  return new Vuex.Store({
    state: {
      selected: {},
      commands: {},
      adding: '',
      editing: {},
      addingCategory: false,
      search: '',
      varaibles: [],
    },
    mutations: {
      /* eslint-disable no-param-reassign */
      setSelected(state, selected) {
        state.selected = selected;
      },
      setCategory(state, { name, commands }) {
        state.commands[name] = commands;
      },
      setAdding(state, adding) {
        state.adding = adding;
      },
      setEditing(state, editing) {
        state.editing = editing;
      },
      setSearch(state, search) {
        state.search = search;
      },
      setAddingCategory(state, adding) {
        state.addingCategory = adding;
      },
      setVariables(state, variables) {
        state.variables = variables;
      },
      addCommand(state, { category, command }) {
        state.commands[category] = state.commands[category] || {};
        Vue.set(state.commands[category], command.command, command);
      },
      editCommand(state, { category, oldCommand, newCommand }) {
        if (!state.commands[category]) {
          return;
        }
        Vue.delete(state.commands[category], oldCommand.command);
        Vue.set(state.commands[category], newCommand.command, newCommand);
      },
      deleteCommand(state, { category, command }) {
        if (!state.commands[category]) {
          return;
        }
        Vue.delete(state.commands[category], command.command);
      },
      addCategory(state, category) {
        Vue.set(state.commands, category, {});
      },
      /* eslint-enable no-param-reassign */
    },
    actions: {

    },
    getters: {
      selectedCommand: (state) => {
        const category = state.commands[state.selected.category];
        if (category) {
          const command = category[state.selected.command];
          if (command) {
            return { category: state.selected.category, command };
          }
        }
        return {};
      },
    },
  });
}
