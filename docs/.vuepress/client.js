import { defineClientConfig } from 'vuepress/client'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/display.css'
import Products from './components/Products.vue'
import ElImageI18n from './components/ElImageI18n.vue'
import NotFound from './components/NotFound.vue'
import Layout from './layouts/Layout.vue'
import Edit from './components/Edit.vue'

export default defineClientConfig({
    enhance({ app, router, siteData }) {
        app.use(ElementPlus)
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
        app.component('Products', Products)
        app.component('ElImageI18n', ElImageI18n)
    },
    setup() { },
    rootComponents: [],
    layouts: {
        NotFound,
        Layout,
        Edit
    },
})