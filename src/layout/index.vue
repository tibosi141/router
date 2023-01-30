<template>
  <div class="layout">
    <Header />
    <Main />
    <!-- <Footer /> -->
  </div>
</template>

<script setup lang='ts'>
import Header from './Header/index.vue'
import Main from './Main/index.vue'
import Footer from './Footer/index.vue'

</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>