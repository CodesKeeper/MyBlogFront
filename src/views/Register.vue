<template>
    <div class="container">
        <el-form ref="registerForm" :model="registerForm" :rules="registerRules" label-width="80px" class="form">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="registerForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="registerForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
                <el-input type="password" v-model="registerForm.confirmPassword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleRegister">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { register } from '../api/user'

export default {
    name: 'Register',
    setup() {
        const registerForm = ref({
            username: '',
            password: '',
            confirmPassword: ''
        })

        const registerRules = ref({
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
            ],
            confirmPassword: [
                { required: true, message: '请再次输入密码', trigger: 'blur' },
                {
                    validator: (rule, value, callback) => {
                        if (value === '') {
                            callback(new Error('请再次输入密码'))
                        } else if (value !== registerForm.value.password) {
                            callback(new Error('两次输入密码不一致'))
                        } else {
                            callback()
                        }
                    },
                    trigger: 'blur'
                }
            ]
        })

        const handleRegister = async () => {
            try {
                await register(registerForm.value)
                ElMessage.success('注册成功')
                router.push('/login')
            } catch (error) {
                ElMessage.error('注册失败')
            }
        }

        return {
            registerForm,
            registerRules,
            handleRegister
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
