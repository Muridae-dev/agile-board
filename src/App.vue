<template>
  <Header />

  <Grain />
  <AnimatedCursor />
  <main>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script setup lang="ts">
import Grain from "@/components/Grain.vue";
import AnimatedCursor from "@/components/AnimatedCursor.vue";
import Header from "./components/navigation/Header.vue";
</script>

<style lang="scss">
/* ------------- TRANSITIONS ------------- */
.fade-enter-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from {
  opacity: 0;
}

.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-leave-to {
  opacity: 0;
}

/* ------------- GENERAL STYLING ------------- */
body {
  cursor: none;

  @media (max-width: 768px) {
    cursor: unset;
  }
}

#app {
  width: 100%;
  height: 100%;
}

a {
  cursor: pointer;
}

* {
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100dvh;
  overflow: auto;
  // overflow-x: hidden;
}

body::-webkit-scrollbar-track {
  background-color: transparent;
}

body::-webkit-scrollbar {
  width: 10px;
  background-color: transparent;
}

body::-webkit-scrollbar-thumb {
  background-color: $primary-scroll-bar-color;
  border: 2px solid $primary-scroll-bar-color;
}
</style>
