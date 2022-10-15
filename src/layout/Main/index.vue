<template>
  <div class="main">
    <div class="main-area">
      <router-view></router-view>
      <div
        v-if="route.name == 'Detail'"
        class="main-tabs"
      >
        <div class="main-tabs-nav">
          <div
            v-for="item in tabs.comList"
            :key="item"
            @click="tabs.current = item"
            :class="{active: tabs.current == item}"
          >{{item}}</div>
        </div>
        <router-view :name="tabs.current"></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const tabs = reactive({
  current: 'details',
  comList: ['details', 'question', 'comments']
})
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

  &-tabs {
    width: 600px;
    height: 400px;
    margin: 50px auto 0;

    &-nav {
      height: 40px;
      display: flex;

      &>div {
        width: 100px;
        height: 100%;
        margin-right: 14px;
        text-align: center;
        line-height: 40px;
        border: 1px solid red;
        cursor: pointer;
      }

      &>div.active {
        color: aliceblue;
        background-color: red;
      }
    }
  }

}
</style>