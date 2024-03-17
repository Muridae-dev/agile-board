<template>
  <header>
    <nav>
      <router-link v-for="link in links" class="header-link" :to="link.link">{{
        link.title
      }}</router-link>
    </nav>
  </header>
</template>

<script setup lang="ts">
const links = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Board",
    link: "/board",
  },
];
</script>

<style lang="scss">
nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  height: $header-height;
  width: 100%;

  display: flex;
  justify-content: center;

  .header-link {
    text-decoration: none;
  }
}
</style>
