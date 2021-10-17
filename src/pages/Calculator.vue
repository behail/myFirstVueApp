<template>
  <section class="flex w-full">
    <div class="m-auto shadow-lx2 border rounded p-4">
      <!-- <h1 class="text-2xl text-center">Calculator</h1> -->
      <p class="text-3xl text-right w-32 h-10" style="direction: ltr">
        {{ curValue }}
      </p>
      <div class="h-2">
        <small v-if="selectedOperation"
          >{{ preValue }} {{ selectedOperation }} {{ curValue }}</small
        >
      </div>
      <div class="my-4 grid grid-cols-4 gap-1">
        <button
          class="p-2 w-10 h-10 border rounded shadow"
          @click="clicked('1')"
        >
          1
        </button>
        <button
          class="p-2 w-10 h-10 border rounded shadow"
          @click="clicked('2')"
        >
          2
        </button>
        <button
          class="p-2 w-10 h-10 border rounded shadow"
          @click="clicked('3')"
        >
          3
        </button>
        <button
          class="p-2 w-10 h-10 border rounded shadow"
          @click="clicked('+')"
        >
          +
        </button>
        <button
          class="p-2 w-10 h-10 border rounded shadow"
          @click="clicked('4')"
        >
          4
        </button>
        <button
          class="p-2 w-10 h-10 border rounded shadow"
          @click="clicked('5')"
        >
          5
        </button>
        <button
          class="p-2 w-10 h-10 border rounded shadow"
          @click="clicked('6')"
        >
          6
        </button>
        <button
          class="p-2 w-10 h-10 border rounded shadow"
          @click="clicked('-')"
        >
          -
        </button>
        <button
          class="p-2 w-10 h-10 border rounded shadow"
          @click="clicked('7')"
        >
          7
        </button>
        <button
          class="p-2 w-10 h-10 border rounded shadow"
          @click="clicked('8')"
        >
          8
        </button>
        <button
          class="p-2 w-10 h-10 border rounded shadow"
          @click="clicked('9')"
        >
          9
        </button>
        <button
          class="p-2 w-10 h-10 border rounded shadow"
          @click="clicked('*')"
        >
          *
        </button>
        <button
          class="p-2 w-10 h-10 border rounded shadow"
          @click="clicked('c')"
        >
          C
        </button>
        <button
          class="p-2 w-10 h-10 border rounded shadow"
          @click="clicked('0')"
        >
          0
        </button>
        <button
          class="p-2 w-10 h-10 border rounded shadow"
          @click="clicked('=')"
        >
          =
        </button>
        <button
          class="p-2 w-10 h-10 border rounded shadow"
          @click="clicked('/')"
        >
          /
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const curValue = ref("");
    const preValue = ref("");
    const selectedOperation = ref("");
    const operation = ["+", "-", "*", "/"];

    function clicked(val) {
      if (val === "=") calculate();
      else if (operation.includes(val)) applyOperation(val);
      else if (val === "c") clear();
      else apendValue(val);
    }
    function applyOperation(val) {
      preValue.value = curValue.value;
      curValue.value = "";
      selectedOperation.value = val;
    }

    function clear() {
      curValue.value = "";
    }
    function apendValue(val) {
      curValue.value = curValue.value + val;
    }
    function calculate() {
      if (selectedOperation.value === "*") multiply();
      else if (selectedOperation.value === "/") devide();
      else if (selectedOperation.value === "-") subtract();
      else if (selectedOperation.value === "+") sum();

      preValue.value = "";
      selectedOperation.value = "";
    }

    function multiply() {
      curValue.value = preValue.value * curValue.value;
    }
    function devide() {
      curValue.value = preValue.value / curValue.value;
    }
    function subtract() {
      curValue.value = preValue.value - curValue.value;
    }
    function sum() {
      curValue.value = +preValue.value + +curValue.value;
    }
    return {
      curValue,
      preValue,
      applyOperation,
      apendValue,
      clicked,
      calculate,
      clear,
      selectedOperation,
    };
  },
};
</script>

<style></style>
