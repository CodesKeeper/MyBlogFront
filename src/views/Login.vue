<template>
    <div class="container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="80px" class="form">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { login } from '../api/user'
import { setToken } from '../utils/auth'

export default {
    name: 'Login',
    setup() {
        const loginForm = ref({
            username: '',
            password: ''
        })

        const loginRules = ref({
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' }
            ]
        })

        const handleLogin = async () => {
            try {
                const data = await login(loginForm.value)
                setToken(data.token) // 保存 token
                ElMessage.success('登录成功')
            } catch (error) {
                ElMessage.error('用户名或密码错误')
            }
        }

        return {
            loginForm,
            loginRules,
            handleLogin
        }
    }
}
</script>

<style scoped>
.container {
    margin: 20px auto;
    width: 400px;
}

.form {
    max-width: 300px;
    margin: 50px auto;
}
</style>
