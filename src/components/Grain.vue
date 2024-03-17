<template>
  <div class="grain-bg"></div>
  <div class="grain-helper"></div>
</template>

<style scoped lang="scss">
.grain-bg {
  height: 100%;
  width: 100%;
  position: fixed;
  opacity: 1;
  background-image: url("../assets/animations/noise.gif");
  background-size: 300px;
  opacity: calc(10 / 100);
  mix-blend-mode: overlay;
  z-index: 1;
  pointer-events: none;
}

.grain-helper {
  height: 100%;
  width: 100%;
  position: fixed;

  background: rgb(224, 15, 196);
  background: $primary-background-color;
  // background: rgb(166, 210, 192);
  pointer-events: none;

  opacity: 1;
  filter: contrast(120%);
  z-index: -6;
}
</style>
