import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import App from './App';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('App', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state: {},
    });
  });

  it('renders', () => {
    const wrapper = shallowMount(App, {
      store,
      localVue,
    });
    expect(wrapper.isVisible()).toBe(true);
    expect(wrapper.text()).toStrictEqual('Commandowl');
  });
});
