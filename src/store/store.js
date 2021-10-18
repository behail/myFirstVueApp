import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      plusOrMinus: "",
      count: 1,
      incomeList: [{ description: "", amount: 0 }],
      expenseList: [{ description: "", amount: 0 }],

      budgetcolor: "text-blue-600",
      inputBgColor: "bg-green-500",
      isHovered: false,
      isHoveredEx: false,
    };
  },
  mutations: {
    setInputBgColorGreen(state) {
      state.inputBgColor = "bg-green-500";
    },
    setInputBgColorPink(state) {
      state.inputBgColor = "bg-pink-500";
    },

    increment(state) {
      state.count++;
    },
    setBudgetPsetiveSign(state) {
      state.plusOrMinus = "+";
    },
    setBudgetNegativeSign(state) {
      state.plusOrMinus = "";
    },
    setBudgetcolorGreen(state) {
      state.budgetcolor = "text-green-600";
    },
    setBudgetcolorRed(state) {
      state.budgetcolor = "text-red-600";
    },
    setBudgetcolorBlue(state) {
      state.budgetcolor = "text-blue-600";
    },
  },
});

export default store;
