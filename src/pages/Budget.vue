<template>
  <div class="m-auto shadow-lx2 border rounded p-2 md:p-4">
    <section>
      <div class="text-center border shadow">
        <h2 class="my-2" data-test="budgetTitle">
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
        <select class="type border rounded shadow m-1" @change="setSign">
          <option value="+" selected>+</option>
          <option value="-">-</option>
        </select>
        <input
          type="text"
          autofocus
          placeholder="Description"
          class="focus:border border rounded shadow px-2 mx-2"
          v-model="newDescription"
          id="descIn"
        />
      </div>
      <div class="py-1">
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
              @mouseover="setIsHoveredTrue"
              @mouseleave="setIsHoveredFalse"
            >
              {{ list.description }} {{ list.amount }}

              <button
                class="mx-2 order rounded shadow-2xl px-1 text-gray-50 transition duration-200 ease-in-out bg-blue-600 hover:bg-purple-600 transform hover:-translate-y-1 hover:scale-110"
                v-show="list.amount && isHovered"
                @click="removeIncome(index)"
              >
                x
              </button>
              <button
                class="mx-2 order rounded shadow-2xl px-1 text-gray-50 transition duration-200 ease-in-out bg-blue-600 hover:bg-purple-600 transform hover:-translate-y-1 hover:scale-110"
                v-show="list.amount && isHovered"
              >
                edit
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="w-1/2 border-l-2 px-2">
        <h3 class="text-pink-600 font-bold ">EXPENSE</h3>
        <div>
          <ul>
            <li
              v-show="exList.amount != 0"
              v-for="(exList, index) in expenseList"
              :key="index"
              class="px-2 my-2"
              @mouseover="setIsHoveredExTrue"
              @mouseleave="setIsHoveredExFalse"
            >
              {{ exList.description }} {{ exList.amount }}
              <button
                class="mx-2 px-1 border rounded shadow-2xl text-gray-50 transition duration-200 ease-in-out bg-blue-600 hover:bg-purple-600 transform hover:-translate-y-1 hover:scale-110"
                v-show="exList.amount && isHoveredEx"
                @click="removeExpense(index)"
              >
                x
              </button>
               <button
                class="mx-2 px-1 border rounded shadow-2xl text-gray-50 transition duration-200 ease-in-out bg-blue-600 hover:bg-purple-600 transform hover:-translate-y-1 hover:scale-110"
                v-show="exList.amount && isHoveredEx"               
              >
                edit
              </button>
              
            </li>
          </ul>
        </div>
      </div>
      
    </section>   
    <div>
     <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-gray-500 text-sm font-medium text-gray-100 hover:bg-gray-50 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
        History
        <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems class="origin-top absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
        <div class="py-1">
          <MenuItem v-slot="{ active }">
            <ul :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
              <li v-for="(monDat, index) in monthlyData" :key="index"> 
                <div  class="border-b-2 py-3" v-show="monDat.lenght > 0">
                  <h2><b>{{monDat.logDate.month}}/{{monDat.logDate.year}}</b></h2>
                  <h3>--> Total Income was = {{monDat.monthlyTotIcome}}</h3>
                  <h3>--> Total Expense was = {{monDat.monthlyTotExp}}</h3>
                  <h3>--> Total Budget was = {{monDat.monthlyTotBudget}}</h3>
                </div>
              </li>
          </ul>         
          </MenuItem>         
        </div>
      </MenuItems>
    </transition>
  </Menu>
  </div>
  </div>
  
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useGtag } from "vue-gtag-next";

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/solid'


export default {
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    ChevronDownIcon,
  },
  setup() {
    const currentDate = ref(new Date().getDate());
    const currentHour = ref(new Date().getHours);
    const currentMinute = ref(new Date().getMinutes());
    const currentSecond = ref(new Date().getSeconds());
    const currentMonthName = new Date().toLocaleString("default", {
      month: "long",
    });
    const currentYear = ref(new Date().getFullYear());
    const newValue = ref("");
    const newDescription = ref("");

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
    const isHovered = computed(() => store.state.isHovered);
    const setIsHoveredTrue = () => store.commit("setIsHoveredTrue");
    const setIsHoveredFalse = () => store.commit("setIsHoveredFalse");
    const isHoveredEx = computed(() => store.state.isHoveredEx);
    const setIsHoveredExTrue = () => store.commit("setIsHoveredExTrue");
    const setIsHoveredExFalse = () => store.commit("setIsHoveredExFalse");
    const sign = computed(() => store.state.sign);
    const setSign = (val) => {
      return store.commit("setSign", val), inputColor();
    };
    
    const incomeList = computed(() => store.state.incomeList);
    const setIncomeList = ({ description, amount }) =>
      store.commit({ type: "setIncomeList", description, amount });
    const expenseList = computed(() => store.state.expenseList);
    const setExpenseList = ({ description, amount }) =>
      store.commit({ type: "setExpenseList", description, amount });
    const setRemoveIncome = (id) => store.commit("setRemoveIncome", id);
    const setRemoveExpense = (id) => store.commit("setRemoveExpense", id);
    const totExpense = computed(() => store.state.totExpense);
    const totIncome = computed(() => store.state.totIncome);
    const totBudget = computed(() => store.state.totBudget);
    const setSumIncome = (income) => store.commit("setSumIncome", income);
    const setSumExpense = (exp) => store.commit("setSumExpense", exp);
    const setCalculateBudget = () => store.commit("setCalculateBudget");
    const setMonthlyLoger = () => store.commit("setMonthlyLoger");
    const setMonthlyData = (data) => store.commit("setMonthlyData", data);
    const monthlyData = computed(() => store.state.monthlyData)

    function inputColor() {
      if (sign.value === "+") {
        setInputBgColorGreen();
      } else if (sign.value === "-") {
        setInputBgColorPink();
      }
    }
    function addItem() {
      const description = newDescription.value;
      const amount = newValue.value;
      if (description && amount) {
        sign.value === "+"
          ? setIncomeList({ description, amount })
          : setExpenseList({ description, amount });
        sumIncome();
        sumExpense();
        calculateBudget();
        budgetSign();
        newDescription.value = "";
        newValue.value = "";
        document.getElementById("descIn").focus();
        addItemGALog();
      }
    }
    function removeIncome(id) {
      setRemoveIncome(id);
      sumIncome();
      calculateBudget();
      budgetSign();
      incomeDeletedGALog();
    }
    function removeExpense(id) {
      setRemoveExpense(id);
      sumExpense();
      calculateBudget();
      budgetSign();
      expenDeletedGALog();
    }
    function sumIncome() {
      setSumIncome(incomeList.value);
    }
    function sumExpense() {
      setSumExpense(expenseList.value);
    }
    function calculateBudget() {
      setCalculateBudget();
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

    function copyMonthlyData() {
      const data = [{ currentMonthName,currentYear, totIncome, totExpense, totBudget }];
      setMonthlyData(data);
    }
    if (
      // currentDate.value == 30 &&
      // currentHour.value == 0 &&
      // currentMinute.value == 0 &&
      // currentSecond.value == 0
       currentDate.value == 8 &&
      currentHour.value == 20 &&
      currentMinute.value == 7 &&
      currentSecond.value == 10
    ) {
      setMonthlyLoger();
      copyMonthlyData();
      console.log('logged');
    }

    const { event } = useGtag();
    const addItemGALog = () => {
      event("add-income-or-expense", {
        event_category: "data-entry",
        event_label: "user-add-income-or-expense",
      });
    };
    const incomeDeletedGALog = () => {
      event("income-deleted", {
        event_category: "data-remove",
        event_label: "user-remove-income",
      });
    };
    const expenDeletedGALog = () => {
      event("expense-deleted", {
        event_category: "data-remove",
        event_label: "user-remove-expense",
      });
    };
   
    return {
      monthlyData,
      addItem,
      currentMonthName,
      currentYear,
      incomeList,
      expenseList,
      setSign,
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
      setIsHoveredTrue,
      setIsHoveredFalse,
      isHoveredEx,
      setIsHoveredExTrue,
      setIsHoveredExFalse,
      addItemGALog,
      incomeDeletedGALog,
      expenDeletedGALog,
    };
  },
};
</script>

<style></style>
