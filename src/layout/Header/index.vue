<template>
  <div class="header">
    <div class="header-logo"></div>
    <div class="header-nav">
      <ElButton
        v-if="userInfo.userName"
        text
      >
        欢迎！{{ userInfo.userName }}
      </ElButton>
      <p
        v-else
        @click="toLogin"
      >
        去登陆
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/index'
import { ElButton } from 'element-plus'

const Router = useRouter()
const UserStore = useUserStore()

const { userInfo } = storeToRefs(UserStore)

const toLogin = () => Router.push({ name: 'Login' })
</script>

<style scoped lang="less">
.header {
  height: 80px;
  color: #fff;
  background-color: #6e8ab3;
  display: flex;
  align-items: center;
  justify-content: space-around;

  &-logo {
    width: 50px;
    height: 50px;
    background: url(../../assets/vue.svg) no-repeat center;
  }
}
</style>
