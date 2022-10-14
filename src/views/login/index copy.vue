<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>用户登录</span>
          <el-link type="primary">
            没有账户？前去注册
          </el-link>
        </div>
      </template>
      <el-form
        class="demo-form"
        ref="formRef"
        :model="formData"
        :rules="rules"
        :hide-required-asterisk="true"
      >
        <el-form-item
          label="账号"
          prop="username"
        >
          <el-input
            v-model="formData.username"
            placeholder="请输入账户"
            clearable
            :prefix-icon="User"
          />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model="formData.password"
            placeholder="请输入密码"
            show-password
            :prefix-icon="Lock"
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
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { setCookie } from '@/utils/auth'
type Form = {
  username: string,
  password: string
}

const router = useRouter()
const formRef = ref<FormInstance>()
const formData = reactive<Form>({
  username: '',
  password: ''
})
const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      fetch('/api//user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formData)
      }).then(r => r.json()).then(res => {
        let { success } = res
        if (success) {
          setCookie('userInfo', JSON.stringify(formData))
          ElMessage.success({
            message: '登录成功！',
            duration: 1000,
            onClose () {
              router.push('/index')
            }
          })
        } else {
          ElMessage.error(res.message)
          formEl.resetFields()
        }
      })
    } else {
      ElMessage.error('请将账号密码输入完整！')
      formEl.resetFields()
    }
  })
}
</script>

<style lang="less" scoped>
.box-card {
  width: 380px;
  margin: 280px auto;

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
        margin-bottom: 28px;

        &:last-child {
          margin-bottom: 0;
        }

        .el-form-item__content {
          justify-content: center;

          .el-form-item__error {
            line-height: 20px;
          }
        }
      }
    }
  }
}
</style>