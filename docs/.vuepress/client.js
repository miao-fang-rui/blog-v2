import { defineClientConfig } from 'vuepress/client'
import { reactive, provide } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/display.css'
import Products from './components/Products.vue'
import ElImageI18n from './components/ElImageI18n.vue'
import NotFound from './components/NotFound.vue'
import Layout from './layouts/Layout.vue'
import Edit from './components/Edit.vue'
import Login from './components/Login.vue'

export default defineClientConfig({
    enhance({ app, router, siteData }) {
        app.use(ElementPlus)
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
        app.component('Products', Products)
        app.component('ElImageI18n', ElImageI18n)

        if (typeof window !== "undefined") {
            // 在浏览器环境下执行 sessionStorage 相关操作

            router.beforeEach((to, from, next) => {
                const token = sessionStorage.getItem('token');
                const isLoggedIn = !!token;
                if (to.path === '/login.html') {
                    if (isLoggedIn) {
                        return next(from.fullPath)
                    } else {
                        sessionStorage.removeItem('token')
                        return next()
                    }
                }

                if (!isLoggedIn && to.path !== '/login.html') {
                    sessionStorage.removeItem('token')
                    return next({ path: '/login.html', replace: true })
                }
                next()
            
            })
        }
    },
    setup() {
        const lS = reactive({ u: 'admin', p: 'tmkj@123456' })
        provide('lS', lS)
    },
    rootComponents: [],
    layouts: {
        NotFound,
        Layout,
        Edit,
        Login
    },
})