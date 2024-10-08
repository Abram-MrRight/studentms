import { shallowMount } from '@vue/test-utils';
import SearchComponent from '../components/SearchComponent.vue';

describe('SearchComponent.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(SearchComponent);
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('input').exists()).toBe(true);
    expect(wrapper.find('select').exists()).toBe(true);
  });

  it('emits search event with correct payload on input change', async () => {
    const searchQuery = 'John Doe';
    const filter = 'last_name';

    // Set input value and select value
    await wrapper.setData({ searchQuery });
    await wrapper.setData({ filter });

    // Trigger the emitSearch method
    await wrapper.vm.emitSearch();

    // Check emitted event
    expect(wrapper.emitted().search).toBeTruthy();
    expect(wrapper.emitted().search.length).toBe(1);
    expect(wrapper.emitted().search[0]).toEqual([{ filter, searchQuery }]);
  });

  it('emits search event when the button is clicked', async () => {
    const searchQuery = 'Jane Smith';

    // Set input value
    await wrapper.setData({ searchQuery });

    // Trigger button click
    await wrapper.find('button').trigger('click');

    // Check emitted event
    expect(wrapper.emitted().search).toBeTruthy();
    expect(wrapper.emitted().search.length).toBe(1);
    expect(wrapper.emitted().search[0]).toEqual([{ filter: 'first_name', searchQuery }]);
  });

  it('emits search event on pressing Enter', async () => {
    const searchQuery = 'Michael Johnson';

    // Set input value
    await wrapper.setData({ searchQuery });

    // Trigger keypress event
    await wrapper.find('input').trigger('keypress.enter');

    // Check emitted event
    expect(wrapper.emitted().search).toBeTruthy();
    expect(wrapper.emitted().search.length).toBe(1);
    expect(wrapper.emitted().search[0]).toEqual([{ filter: 'first_name', searchQuery }]);
  });
});
