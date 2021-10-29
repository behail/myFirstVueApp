import { createStore } from "vuex";
import actions from "./actions";

const store = createStore({
  state() {
    return {
      plusOrMinus: "",
      incomeList: JSON.parse(localStorage.getItem("incomeList")) || [
        { description: "", amount: 0 },
      ],
      expenseList: JSON.parse(localStorage.getItem("expenseList")) || [
        { description: "", amount: 0 },
      ],
      budgetcolor: localStorage.getItem("budgetcolor") || "text-blue-600",
      inputBgColor: "bg-green-500",
      isHovered: false,
      isHoveredEx: false,
      sign: "+",
      totExpense: localStorage.getItem("totExpense") || 0,
      totIncome: localStorage.getItem("totIncome") || 0,
      totBudget: localStorage.getItem("totBudget") || 0,
      monthlyTotIcome: localStorage.getItem("monthlyTotIcome") || 0,
      monthlyTotExp: localStorage.getItem("monthlyTotExp") || 0,
      monthlyTotBudget: localStorage.getItem("monthlyTotBudget") || 0,
      monthlyData: localStorage.getItem("monthlyData") || [
        { date: "", monthlyTotIcome: 0, monthlyTotExp: 0, monthlyTotBudget: 0 },
      ],
    };
  },
  actions,
  mutations: {
    setMonthlyData(state, payload) {
      state.monthlyData.push(payload);
      localStorage.setItem("monthlyData", JSON.stringify(state.monthlyData));
    },
    setMonthlyLoger(state) {
      state.monthlyTotBudget = state.totBudget;
      state.monthlyTotIcome = state.totIncome;
      state.monthlyTotExp = state.totExpense;
      localStorage.setItem("monthlyTotBudget", state.monthlyTotBudget);
      localStorage.setItem("monthlyTotIcome", state.monthlyTotIcome);
      localStorage.setItem("monthlyTotExp", state.monthlyTotExp);
      localStorage.removeItem("totExpense");
      localStorage.removeItem("totIncome");
      localStorage.removeItem("totBudget");
      localStorage.removeItem("incomeList");
      localStorage.removeItem("expenseList");
      location.reload();
    },
    setCalculateBudget(state) {
      state.totBudget = state.totIncome - state.totExpense;
      localStorage.setItem("totBudget", state.totBudget);
    },
    setSumExpense(state, payload) {
      state.totExpense = 0;
      for (let index = 0; index < payload.length; index++) {
        state.totExpense += payload[index].amount;
      }
      localStorage.setItem("totExpense", state.totExpense);
    },
    setSumIncome(state, payload) {
      state.totIncome = 0;
      for (let index = 0; index < payload.length; index++) {
        state.totIncome += payload[index].amount;
      }
      localStorage.setItem("totIncome", state.totIncome);
    },
    setRemoveIncome(state, payload) {
      state.incomeList = state.incomeList.filter((list, i) => payload != i);
      localStorage.removeItem("incomeList");
      localStorage.setItem("incomeList", JSON.stringify(state.incomeList));
    },
    setRemoveExpense(state, payload) {
      state.expenseList = state.expenseList.filter((list, i) => payload != i);
      localStorage.removeItem("expenseList");
      localStorage.setItem("expenseList", JSON.stringify(state.expenseList));
    },
    setExpenseList(state, payload) {
      state.expenseList.unshift({
        description: payload.description,
        amount: payload.amount,
      });
      localStorage.setItem("expenseList", JSON.stringify(state.expenseList));
    },
    setIncomeList(state, payload) {
      state.incomeList.unshift({
        description: payload.description,
        amount: payload.amount,
      });
      localStorage.setItem("incomeList", JSON.stringify(state.incomeList));
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
    setBudgetPsetiveSign(state) {
      state.plusOrMinus = "+";
    },
    setBudgetNegativeSign(state) {
      state.plusOrMinus = "";
    },
    setBudgetcolorGreen(state) {
      state.budgetcolor = "text-green-600";
      localStorage.setItem("budgetcolor", state.budgetcolor);
    },
    setBudgetcolorRed(state) {
      state.budgetcolor = "text-red-600";
      localStorage.setItem("budgetcolor", state.budgetcolor);
    },
    setBudgetcolorBlue(state) {
      state.budgetcolor = "text-blue-600";
      localStorage.setItem("budgetcolor", state.budgetcolor);
    },
  },
  // plugins,
});

export default store;
