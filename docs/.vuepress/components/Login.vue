<script setup>
import { ref, reactive, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const lS = inject('lS')
const isClient = ref(false)

onMounted(() => {
    isClient.value = true
})

const router = useRouter()

const login = reactive({
    username: '',
    password: ''
})

const onSubmit = () => {

    if (login.username === '') {
        return ElMessage({
            message: '用户名不能为空!',
            type: 'error',
            plain: true,
        })
    }

    if (login.password === '') {
        return ElMessage({
            message: '密码不能为空!',
            type: 'error',
            plain: true,
        })
    }

    if (login.username !== lS.u | login.password !== lS.p) {
        return ElMessage({
            message: '用户名或者密码错误,请重新输入!',
            type: 'error',
            plain: true,
        })
    }

    if (login.username === lS.u && login.password === lS.p) {
        if (!__VUEPRESS_SSR__) {
            sessionStorage.setItem('token', 'login-success')
        }

        router.replace({ path: '/' })
        ElMessage.success({
            message: '登陆成功！',
            type: 'success',
            plain: true,
        })
    }
}
</script>

<template>
    <div class="login-contain" v-if="isClient">
        <div class="login">
            <div class="login-title">天迈文章中心</div>
            <el-form class="login-form">
                <el-form-item>
                    <input class="input" v-model="login.username" placeholder="用户名" />
                </el-form-item>
                <el-form-item>
                    <input class="input" v-model="login.password" type="password" placeholder="密码" />
                </el-form-item>
                <el-form-item>
                    <button class="btn primary" type="primary" @click.prevent="onSubmit">登陆</button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login-contain {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .login {
        border: 1px solid var(--vp-c-border);
        padding: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: auto;
        border-radius: 4px;

        .login-title {
            font-size: 28px;
            margin-bottom: 40px;
            text-align: center;
            background-clip: text;
            color: transparent;
            background-image: linear-gradient(to right, #ff5cb5, #9f79f9);
        }

        .login-form {
            width: 300px;
        }

    }


}

.input {
    width: 100%;
    height: 29px;
    border-radius: 4px;
    border: 1px solid var(--vp-c-border);
    text-indent: 10px;
    background-color: var(--vp-c-bg);

    &:hover {
        border-color: var(--vp-c-border-hard);
    }

    &:focus {
        outline: none;
        border-color: #5468ff;
    }
}

.btn {
    box-sizing: border-box;
    padding: 10px 18px;
    margin-top: 20px;
    background-color: var(--c-bg);
    border: 1px solid var(--c-border-dark);
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
    width: 100%;


    &:hover {
        border-color: #8795ff;
        color: #5468ff;
    }

    &:active {
        border-color: #4556d8;
    }
}

.primary {
    border: none;
    background-color: #5468ff;
    color: white;

    &:hover {
        background-color: #5f72ff;
        color: white;
    }

    &:active {
        background-color: #4556d8;
    }

}


@media screen and (max-width: 720px) {

    .login-contain {

        .login {
            border: none;
            padding: 0;
            box-shadow: none;
            width: 100%;
            height: 100%;
        }
    }

}
</style>