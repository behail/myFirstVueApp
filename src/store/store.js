import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      count: 1,
      plusOrMinus: "x",
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    setBudgetSign(state) {
      state.plusOrMinus = "s";
    },
  },
});

export default store;
