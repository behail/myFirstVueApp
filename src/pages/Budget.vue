<template>
  <div class="m-auto shadow-lx2 border rounded p-2 md:p-4">
    <section>
      <div class="text-center border shadow">
        <!-- <h1 class="text-2xl my-2">Budget</h1> -->
        <h2 class="my-2">
          Available Budget in {{ currentMonthName }} ,{{ currentYear }}
        </h2>
        <h3 class="my-2 font-bold" :class="budgetcolor">
          {{ plusOrMinus }}{{ totBudget }}
        </h3>
      </div>
    </section>
    <section>
      <div class="my-2 text-center">
        <div class="flex bg-green-500 justify-between">
          <h3 class="mx-2 text-gray-50">INCOME</h3>
          <h3 class="px-4 text-gray-50">{{ totIncome }}</h3>
        </div>
        <div class="flex bg-pink-500 justify-between">
          <h3 class="mx-2 text-gray-50">EXPENSE</h3>
          <h3 class="px-4 text-gray-50">{{ totExpense }}</h3>
        </div>
      </div>
    </section>
    <form
      class="md:flex justify-center md:justify-between p-2 my-6"
      :class="inputBgColor"
      @submit.prevent="addItem"
    >
      <div>
        <select class="type border rounded shadow m-1" @change="operation">
          <option value="+" selected>+</option>
          <option value="-">-</option>
        </select>
        <input
          type="text"
          placeholder="Description"
          class="focus:border border rounded shadow px-2 mx-2"
          v-model="newDescription"
        />
      </div>
      <div>
        <input
          class="border rounded shadow px-2 mx-2"
          type="number"
          placeholder="Amount $"
          v-model="newValue"
        />
        <button
          type="submit"
          class="shadow-2xl rounded px-2 text-gray-50 hover:bg-gray-600 transition duration-100 ease-in-out bg-blue-600 transform hover:-translate-y-0.5 hover:scale-100"
        >
          {{ count }}
          Add
        </button>
      </div>
    </form>
    <section class="flex w-full">
      <div class="w-1/2">
        <h3 class="text-green-600 font-bold">INCOME</h3>
        <div>
          <ul>
            <li
              v-for="(list, index) in incomeList"
              :key="index"
              v-show="list.amount != 0"
              class="my-2"
              @mouseover="isHovered = true"
              @mouseleave="isHovered = false"
            >
              {{ list.description }} {{ list.amount }}
              <button
                class="mx-2 order rounded shadow-2xl px-1 text-gray-50 transition duration-200 ease-in-out bg-blue-600 hover:bg-purple-600 transform hover:-translate-y-1 hover:scale-110"
                v-show="list.amount && isHovered"
                @click="removeIncome(index)"
              >
                x
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="w-1/2">
        <h3 class="text-pink-600 font-bold">EXPENSE</h3>
        <div>
          <ul>
            <li
              v-show="exList.amount != 0"
              v-for="(exList, index) in expenseList"
              :key="index"
              class="px-2 my-2"
              @mouseover="isHoveredEx = true"
              @mouseleave="isHoveredEx = false"
            >
              {{ exList.description }} {{ exList.amount }}
              <button
                class="mx-2 px-1 border rounded shadow-2xl text-gray-50 transition duration-200 ease-in-out bg-blue-600 hover:bg-purple-600 transform hover:-translate-y-1 hover:scale-110"
                v-show="exList.amount && isHoveredEx"
                @click="removeExpense(index)"
              >
                x
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const currentMonthName = new Date().toLocaleString("default", {
      month: "long",
    });
    const currentYear = ref(new Date().getFullYear());
    // localStorage.setItem("incomeList", [{ description: "", amount: 0 }]);
    // localStorage.setItem("expenseList", [{ description: "", amount: 0 }]);
    // const incomeList = localStorage.getItem("incomeList");
    // const expenseList = localStorage.getItem("expenseList");
    const incomeList = ref([{ description: "", amount: 0 }]);
    const expenseList = ref([{ description: "", amount: 0 }]);
    const newValue = ref("");
    const newDescription = ref("");
    const sign = ref("+");
    const totExpense = ref(0);
    const totIncome = ref(0);
    const totBudget = ref(0);
    const isHovered = ref(false);
    const isHoveredEx = ref(false);
    //*******Vuex************ //
    const store = useStore();
    const plusOrMinus = computed(() => store.state.plusOrMinus);
    const setBudgetPsetiveSign = () => store.commit("setBudgetPsetiveSign");
    const setBudgetNegativeSign = () => store.commit("setBudgetNegativeSign");
    const budgetcolor = computed(() => store.state.budgetcolor);
    const setBudgetcolorGreen = () => store.commit("setBudgetcolorGreen");
    const setBudgetcolorRed = () => store.commit("setBudgetcolorRed");
    const setBudgetcolorBlue = () => store.commit("setBudgetcolorBlue");
    const inputBgColor = computed(() => store.state.inputBgColor);
    const setInputBgColorGreen = () => store.commit("setInputBgColorGreen");
    const setInputBgColorPink = () => store.commit("setInputBgColorPink");

    function sumIncome() {
      totIncome.value = 0;
      for (let index = 0; index < incomeList.value.length; index++) {
        totIncome.value += incomeList.value[index].amount;
      }
      return totIncome.value;
    }

    function sumExpense() {
      totExpense.value = 0;
      for (let index = 0; index < expenseList.value.length; index++) {
        totExpense.value += expenseList.value[index].amount;
      }
      return totExpense.value;
    }

    function calculateBudget() {
      return (totBudget.value = totIncome.value - totExpense.value);
    }
    function operation(val) {
      return (sign.value = val.target.value), inputColor();
    }
    function budgetSign() {
      if (totBudget.value > 0) {
        setBudgetPsetiveSign();
        setBudgetcolorGreen();
      } else if (totBudget.value < 0) {
        setBudgetcolorRed();
        setBudgetNegativeSign();
      } else {
        setBudgetcolorBlue();
        setBudgetNegativeSign();
      }
    }
    function inputColor() {
      if (sign.value === "+") {
        setInputBgColorGreen();
      } else if (sign.value === "-") {
        setInputBgColorPink();
      }
    }

    function addItem() {
      sign.value === "+"
        ? incomeList.value.unshift({
            description: newDescription.value,
            amount: newValue.value,
          })
        : expenseList.value.unshift({
            description: newDescription.value,
            amount: newValue.value,
          });

      sumIncome();
      sumExpense();
      calculateBudget();
      budgetSign();
      newDescription.value = "";
      newValue.value = "";
    }

    function removeIncome(id) {
      incomeList.value = incomeList.value.filter((list, i) => i != id);
      sumIncome();
      calculateBudget();
      budgetSign();
    }

    function removeExpense(id) {
      expenseList.value = expenseList.value.filter((list, i) => i != id);
      sumExpense();
      calculateBudget();
      budgetSign();
    }

    return {
      addItem,
      currentMonthName,
      currentYear,
      incomeList,
      expenseList,
      operation,
      newValue,
      newDescription,
      sign,
      totExpense,
      totIncome,
      totBudget,
      plusOrMinus,
      budgetcolor,
      removeIncome,
      removeExpense,
      inputBgColor,
      isHovered,
      isHoveredEx,
    };
  },
};
</script>

<style>
</style>