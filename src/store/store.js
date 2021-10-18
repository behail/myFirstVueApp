import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      plusOrMinus: "",
    };
  },
  mutations: {
    setBudgetPsetiveSign(state) {
      state.plusOrMinus = "+";
    },
    setBudgetNegativeSign(state) {
      state.plusOrMinus = "";
    },
  },
});

export default store;
