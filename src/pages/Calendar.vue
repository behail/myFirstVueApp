<template>
  <div class="m-auto">
    <!-- <h1 class="text-2xl my-2 text-center">Calendar</h1> -->

    <div class="shadow-lx2 border rounded p-4">
      <section class="mx-2 my-2 flex justify-between">
        <h2 class="font-bold">{{ currentMonthName() }}</h2>
        <h2 class="font-bold">{{ currentYear }}</h2>
      </section>
      <section class="flex">
        <p
          class="text-center"
          style="width: 14.28%"
          v-for="day in days"
          :key="day"
        >
          {{ day }}
        </p>
      </section>

      <section class="flex flex-wrap my-2">
        <p
          class="text-center"
          style="width: 14.28%"
          v-for="num in firstday()"
          :key="num"
        ></p>
        <p
          class="text-center"
          style="width: 14.28%"
          v-for="num in daysInMonth(currentYear, currentMonth)"
          :key="num"
          :class="calClass(num)"
        >
          {{ num }}
        </p>
      </section>
      <section class="flex justify-between">
        <button
          @click="prev"
          @mouseover="analyticsLog"
          class="px-2 border shadow rounded"
        >
          prev
        </button>
        <button @click="next" class="px-2 border shadow rounded">next</button>
      </section>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];

    let currentMonth = ref(new Date().getMonth());
    const currentYear = ref(new Date().getFullYear());

    function daysInMonth(year, month) {
      return new Date(year, month, 0).getDate();
    }

    function firstday() {
      return new Date(currentYear.value, currentMonth.value, 1).getDay();
    }

    function currentMonthName() {
      return new Date(currentYear.value, currentMonth.value).toLocaleString(
        "default",
        {
          month: "long",
        }
      );
    }

    function prev() {
      if (currentMonth.value === 0) {
        currentMonth.value = 11;
        currentYear.value--;
      }
      return currentMonth.value--;
    }
    function next() {
      if (currentMonth.value === 11) {
        currentMonth.value = 1;
        currentYear.value++;
      }
      return currentMonth.value++;
    }

    function calClass(num) {
      const calFullDate = new Date(
        currentYear.value,
        currentMonth.value,
        num
      ).toDateString();
      const currentFullDate = new Date().toDateString();
      return calFullDate === currentFullDate ? "text-pink-600" : "";
    }
    function analyticsLog() {
      this.$gtag.event("latest-release-clicked", {
        event_category: "documentation",
        event_label: "Prev Button was Clicked",
        value: 1,
      });
    }
    return {
      days,
      currentMonth,
      currentYear,
      currentMonthName,
      daysInMonth,
      firstday,
      prev,
      next,
      calClass,
      analyticsLog,
    };
  },
};
</script>

<style></style>
