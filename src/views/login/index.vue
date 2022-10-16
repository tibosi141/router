<template>
  <div class="page">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>用户登录</span>
          <el-link 
            type="primary" 
            href="/index"
          >
            没有账户？前去注册
          </el-link>
        </div>
      </template>
      <el-form
        class="demo-form"
        ref="formRef"
        :model="userData"
        :rules="rules"
        :hide-required-asterisk="true"
      >
        <el-form-item
          label="账号"
          prop="username"
        >
          <el-input
            v-model="userData.username"
            placeholder="请输入账户"
            :prefix-icon="User"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model="userData.password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-checkbox
            v-model="userData.rememberMe"
            label="记住密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit(formRef)"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/index';
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { UserData } from '@/utils/types/user'
import Cookies from 'js-cookie'
import { decode, encode } from 'js-base64'

const Route = useRoute()
const Router = useRouter()
const UserStore = useUserStore()

let redirect = ref<string>('/')
let formRef = ref<FormInstance>()
const userData = reactive<UserData>({
  username: '',
  password: '',
  rememberMe: false
})
const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})

const getUserData = () => {
  const username = Cookies.get('username')
  const password = Cookies.get('password')
  const rememberMe = Cookies.get('rememberMe')

  userData.username = username === undefined ? '' : username
  userData.password = password === undefined ? '' : encode(password)
  userData.rememberMe = rememberMe === undefined ? false : Boolean(rememberMe)
}
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (userData.rememberMe) {
        Cookies.set('username', userData.username)
        Cookies.set('password', decode(userData.password))
        Cookies.set('rememberMe', String(userData.rememberMe))
      } else {
        Cookies.remove('username')
        Cookies.remove('password')
        Cookies.remove('rememberMe')
      }
      UserStore.Login(userData)
        .then(res => {
          let { success, message } = res
          UserStore.$patch((state) => {
            state.loginStatus = success
            state.userName = userData.username
          })
          if (success) {
            ElMessage.success({
              message: '登录成功',
              duration: 1000,
              onClose () {
                Router.replace({ path: redirect.value })
              }
            })
          } else {
            ElMessage.error(message || '未知错误，请联系管理员解决')
            formEl.resetFields()
          }
        })
    } else {
      ElMessage.error('请将账号密码输入完整！')
      formEl.resetFields()
    }
  })
}

watchEffect(() => {
  redirect.value =  Route.query && Route.query.redirect as string
})

getUserData()
</script>

<style lang="less" scoped>
.page {
  background: url('@/assets/images/login_bg.jpg') no-repeat 0 0;
  background-size: 100% auto;
}

.box-card {
  width: 380px;
  margin: 15% auto;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  :deep(.el-card__body) {
    padding: 30px 0;

    .demo-form {
      width: 280px;
      margin: 0 auto;

      .el-form-item {
        margin-bottom: 22px;

        &:nth-of-type(3) {
          margin-top: -5px;
          margin-bottom: 5px;
        }

        &:last-child {
          margin-bottom: 0;

          .el-form-item__content {
            justify-content: center;
          }
        }

        .el-form-item__content {
          justify-content: flex-start;

          .el-form-item__error {
            line-height: 18px;
          }
        }
      }
    }
  }
}
</style>