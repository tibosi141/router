<script setup lang="ts">
  import Layout from './layout/index.vue'
// import { useRouter } from 'vue-router';

// const router = useRouter()

// // 上一页
// const prevPage = () => {
//   router.back()
//   // router.go(-1)
// }
// // 下一页
// const nextPage = () => {
//   router.go(1)
// }

// // 替换
// const replacePage = () => {
//   router.replace({
//     name: 'Index'
//   })
// }

</script>

<template>
  <div class="app">
    <router-view></router-view>
    <!-- <h1 @click="replacePage"> -->
      <!-- 小满最骚 -->
      <!-- <button @click="prevPage">后退</button> -->
      <!-- <button @click="nextPage">前进</button> -->
    <!-- </h1> -->
    <!-- <hr /> -->
    <!--使用 router-link 组件进行导航 -->
    <!--通过传递 `to` 来指定链接 -->
    <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
    <!-- <router-link to="/">首页</router-link> -->
    <!-- <router-link style="margin-left:200px" :to="{name: 'About'}">更多</router-link> -->
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <!-- <router-view></router-view> -->
  </div>
</template>

<style scoped>
.app {
  height: inherit;
}
</style>
