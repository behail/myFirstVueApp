<template>
  <div class="m-auto shadow-lx2 border rounded p-4">
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
      class="flex justify-between p-2 my-6"
      :class="inputBgColor"
      @submit.prevent="addItem"
    >
      <div>
        <select class="type border rounded shadow" @change="operation">
          <option value="+" selected>+</option>
          <option value="-">-</option>
        </select>
        <input
          type="text"
          placeholder="Description"
          class="focus:border border rounded shadow px-2"
          v-model="newDescription"
        />
      </div>
      <div>
        <input
          class="border rounded shadow px-2"
          type="number"
          placeholder="Amount $"
          v-model="newValue"
        />
        <button
          type="submit"
          class="shadow-2xl rounded px-2 text-gray-50 hover:bg-gray-600 transition duration-100 ease-in-out bg-blue-600 transform hover:-translate-y-0.5 hover:scale-100"
        >
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
import { ref } from "vue";

export default {
  setup() {
    const currentMonthName = new Date().toLocaleString("default", {
      month: "long",
    });
    const currentYear = ref(new Date().getFullYear());
    const incomeList = ref([{ description: "", amount: 0 }]);
    const expenseList = ref([{ description: "", amount: 0 }]);
    const newValue = ref("");
    const newDescription = ref("");
    const sign = ref("+");
    const plusOrMinus = ref("");
    const totExpense = ref(0);
    const totIncome = ref(0);
    const totBudget = ref(0);
    const budgetcolor = ref("text-blue-600");
    const inputBgColor = ref("bg-green-500");
    const isHovered = ref(false);
    const isHoveredEx = ref(false);

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
        plusOrMinus.value = "+";

        // this.$store.commit("setBudgetSign");
        budgetcolor.value = "text-green-600";
      } else if (totBudget.value < 0) {
        budgetcolor.value = "text-red-600";
        plusOrMinus.value = "";
      } else {
        budgetcolor.value = "text-blue-600";
        plusOrMinus.value = "";
      }
    }
    function inputColor() {
      if (sign.value === "+") {
        inputBgColor.value = "bg-green-500";
      } else if (sign.value === "-") {
        inputBgColor.value = "bg-pink-500";
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