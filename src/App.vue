<template>
  <div id="app">
      <NavBar />
      <main>
          <router-view />
      </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

main {
  padding: 20px;
}
</style>
