<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from "./layout/TheHeader.vue";
export default {
  components: {
    TheHeader,
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.route-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.route-enter-active {
  transition: all 0.5s ease-in-out;
}
.route-leave-active {
  transition: all 0.5s ease-in-out;
}
</style>
