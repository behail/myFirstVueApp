<template>
  <nav class="w-full bg-gradient-to-l from-blue-800 to-green-500 px-0 md:px-4 py-4">
    <router-link
      to="/"
      class="px-3"
      :class="[isActiveHome]"
      @click="changeTextColor('Home')"
      >Home</router-link
    >
    <router-link
      to="/calculator"
      class="px-3"
      :class="[isActiveCalculator]"
      @click="changeTextColor('Calculator')"
      >Calculator</router-link
    >
    <router-link
      to="/calander"
      class="px-3"
      :class="[isActiveCalander]"
      @click="changeTextColor('Calander')"
      >Calander</router-link
    >
    <router-link
      to="/budget"
      class="px-3"
      :class="[isActiveBudget]"
      @click="changeTextColor('Budget')"
      >Budget</router-link
    >
  </nav>
</template>
<script>
export default {
  data() {
    return {
      isActiveHome: "text-gray-50",
      isActiveCalculator: "text-gray-300",
      isActiveCalander: "text-gray-300",
      isActiveBudget: "text-gray-300",
    };
  },
  methods: {
    changeTextColor(active) {
      console.log(active);
      if (active === "Home") {
        this.isActiveHome = "text-gray-50";
        this.isActiveCalculator = "text-gray-300";
        this.isActiveCalander = "text-gray-300";
        this.isActiveBudget = "text-gray-300";
      } else if (active == "Calculator") {
        this.isActiveHome = "text-gray-300";
        this.isActiveCalculator = "text-gray-50";
        this.isActiveCalander = "text-gray-300";
        this.isActiveBudget = "text-gray-300";
      } else if (active == "Calander") {
        this.isActiveHome = "text-gray-300";
        this.isActiveCalculator = "text-gray-300";
        this.isActiveCalander = "text-gray-50";
        this.isActiveBudget = "text-gray-300";
      } else if (active == "Budget") {
        this.isActiveHome = "text-gray-300";
        this.isActiveCalculator = "text-gray-300";
        this.isActiveCalander = "text-gray-300";
        this.isActiveBudget = "text-gray-50";
      }
    },
  },
};
</script>

<style></style>
