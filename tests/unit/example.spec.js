import  { createStore } from 'vuex'
import { mount } from '@vue/test-utils'
import Budget from '../../src/pages/Budget.vue'
import vuexStore from '../../src/store/store.js'


const store = createStore(vuexStore)

test('Budget.vue render', () => {
  const wrapper = mount(Budget, { store})
  expect(wrapper.html()).toContain(' Available Budget in')
})