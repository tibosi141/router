<template>
  <div class="main">
    <div class="main-area">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang='ts'>
</script>

<style scoped lang="less">
.main {
  flex: 1;
  padding: 20px 0;
  box-sizing: border-box;

  &-area {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
  }
}
</style>