<template>
  <div class="page">
    <h3>
      我是详情页
      <button @click="router.back()">返回</button>
    </h3>
    <div>品牌：{{ shop?.name }}</div>
    <div>价格：{{ shop?.price }}</div>
    <div>ID：{{ shop?.id }}</div>
  </div>
</template>

<script setup lang='ts'>
import { data } from '../../assets/list.json'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const shop = data.find(v => Number(route.params?.id) === v.id)
</script>

<style lang="less" scoped>
</style>