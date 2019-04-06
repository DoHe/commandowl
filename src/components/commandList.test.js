import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import CommandList from './CommandList';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('CommandList', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state: {},
    });
  });

  it('renders', () => {
    const wrapper = shallowMount(CommandList, {
      store,
      localVue,
    });
    expect(wrapper.isVisible()).toBe(true);
  });
});
