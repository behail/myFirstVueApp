import { createStore } from "vuex";
import actions from "./actions";

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
      sign: "+",
      totExpense: 0,
      totIncome: 0,
      totBudget: 0,
    };
  },
  actions,
  mutations: {
    setCalculateBudget(state) {
      return (state.totBudget = state.totIncome - state.totExpense);
    },
    setSumExpense(state, payload) {
      state.totExpense = 0;
      for (let index = 0; index < payload.length; index++) {
        state.totExpense += payload[index].amount;
      }
    },
    setSumIncome(state, payload) {
      state.totIncome = 0;
      for (let index = 0; index < payload.length; index++) {
        state.totIncome += payload[index].amount;
      }
    },
    setRemoveIncome(state, payload) {
      state.incomeList = state.incomeList.filter((list, i) => payload != i);
    },
    setRemoveExpense(state, payload) {
      state.expenseList = state.expenseList.filter((list, i) => payload != i);
    },
    setExpenseList(state, payload) {
      state.expenseList.unshift({
        description: payload.description,
        amount: payload.amount,
      });
    },
    setIncomeList(state, payload) {
      state.incomeList.unshift({
        description: payload.description,
        amount: payload.amount,
      });
    },
    setSign(state, payload) {
      state.sign = payload.target.value;
    },
    setIsHoveredExTrue(state) {
      state.isHoveredEx = true;
    },
    setIsHoveredExFalse(state) {
      state.isHoveredEx = false;
    },
    setIsHoveredTrue(state) {
      state.isHovered = true;
    },
    setIsHoveredFalse(state) {
      state.isHovered = false;
    },
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
  // plugins,
});

export default store;
