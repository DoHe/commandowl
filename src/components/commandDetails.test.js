import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import CommandDetails, { formatInput } from './CommandDetails';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('CommandDetails', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        variables: {},
      },
      getters: {
        selectedCommand: () => ({ command: {} }),
      },
    });
  });

  it('renders', () => {
    const wrapper = shallowMount(CommandDetails, {
      store,
      localVue,
    });
    expect(wrapper.isVisible()).toBe(true);
  });
});

describe('formatInput', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        variables: { var1: 'VALUE' },
      },
      getters: {
        selectedCommand: () => ({ command: {} }),
      },
    });
  });

  it('Handles empty object', () => {
    const input = formatInput({});
    expect(input).toBe(undefined);
  });

  it('Handles empty input', () => {
    const input = formatInput({ exampleInput: '' });
    expect(input).toStrictEqual('');
  });

  it('Replaces vars', () => {
    const input = formatInput({ exampleInput: 'ls {{var1}}' }, store);
    expect(input).toStrictEqual('ls VALUE');
  });

  it('Ignores single braces', () => {
    const input = formatInput({ exampleInput: 'ls {var1}' }, store);
    expect(input).toStrictEqual('ls {var1}');
  });
});
