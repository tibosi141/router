<template>
  <div class="page">
    <ElCard class="box-card">
      <template #header>
        <div class="card-header">
          <span>用户登录</span>
          <ElLink
            type="primary"
            href="/index"
          >
            没有账户？前去注册
          </ElLink>
        </div>
      </template>
      <ElForm
        class="demo-form"
        ref="formRef"
        :model="userData"
        :rules="rules"
        :hide-required-asterisk="true"
      >
        <ElFormItem
          label="账号"
          prop="username"
        >
          <ElInput
            v-model="userData.userName"
            placeholder="请输入账户"
            :prefix-icon="User"
            clearable
          />
        </ElFormItem>
        <ElFormItem
          label="密码"
          prop="password"
        >
          <ElInput
            v-model="userData.password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            show-password
          />
        </ElFormItem>
        <ElFormItem
          label="验证码"
          prop="code"
        >
          <ElInput
            v-model="userData.code"
            placeholder="请输入验证码"
          />
          <img
            class="code"
            :src="codeUrl"
            @click="resetCode"
          />
        </ElFormItem>
        <!-- <ElFormItem>
          <el-checkbox
            v-model="userData.rememberMe"
            label="记住密码"
          />
        </ElFormItem> -->
        <ElFormItem>
          <ElButton
            type="primary"
            @click="onSubmit(formRef)"
          >
            登录
          </ElButton>
        </ElFormItem>
      </ElForm>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/index'
import { ElCard, ElLink, ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import type { UserData } from '@/utils/interface/user'
import type { FormInstance, FormRules } from 'element-plus'

const Route = useRoute()
const Router = useRouter()
const UserStore = useUserStore()

const redirect = ref<string>('/')
// 验证码
const codeUrl = ref<string>(import.meta.env.VITE_APP_BASE_API + '/user/code')
const resetCode = () => {
  userData.code = ''
  codeUrl.value = codeUrl.value.split('?')[0] + '?' + Math.random()
}
const userData = reactive<UserData>({
  userName: '',
  password: '',
  code: '',
})
const formRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
})

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      await UserStore.Login(userData)
      redirect.value && Router.push(redirect.value)
    } else {
      ElMessage.error('请将登录信息输入完整！')
    }
  })
}

watchEffect(() => {
  redirect.value = Route.query && (Route.query.redirect as string)
})
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

  .code {
    width: 120px;
    height: 30px;
    cursor: pointer;
    background: #000;
  }

  :deep(.el-card__body) {
    padding: 30px 0;

    .demo-form {
      width: 280px;
      margin: 0 auto;

      .el-form-item {
        margin-bottom: 18px;

        &:last-child {
          margin-bottom: 0;

          .el-form-item__content {
            justify-content: center;
          }
        }

        .el-form-item__label {
          width: 54px;
        }

        .el-form-item__content {
          flex-wrap: nowrap;
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
