<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { ElMessage } from 'element-plus'

const dialogVisible = defineModel('dialogVisible')

const ruleFormRef = ref()
defineExpose({ruleFormRef})

const prevLinkOptions = ref([])
const nextLinkOptions = ref([])
const articlePictureOptions = ref([])

const articlePrevText = ref()
const articleNextText = ref()
const articlePictureText = ref()

const themeLocale = useThemeLocaleData()
const productClassification = themeLocale.value.productClassification || []
const products = themeLocale.value.products || []

const article = reactive({
    prev: {
        text: '',
        link: '',
    },
    next: {
        text: '',
        link: '',
    },
    title: '',
    imgSrc: '',
})

const rules = reactive({
    title: [ { required: true, message:'请输入标题', trigger: 'blur' },  ],
    'prev.text': [ { required: true, message:'请输入标题', trigger: 'blur' },  ],
    'next.text': [ { required: true, message:'请输入标题', trigger: 'blur' },  ],
    imgSrc: [ { required: true, message:'请选择图片路径', trigger: 'blur' },  ],
})

const handlePictureClear = () => {
    article.imgSrc = ''
    articlePictureOptions.value = ''
}

const handlePictureSelect = (value) => {
    articlePictureOptions.value = ''
    article.imgSrc =  '/' + value + '/'
}

const handlePictureChange = (value) => {
    if(value){
        if(!article.imgSrc) return ElMessage({ message: '请先选择分类！', type: 'warning' }) && (articlePictureOptions.value = '') 
        let list = article.imgSrc.split('/').filter(item => item !== '')
        article.imgSrc = '/' + list[0] + '/'
        value.forEach(item => {
            article.imgSrc += item + '/'
        })
    }
}

const handlePrevClear = () => {
    article.prev.link = ''
}

const handlePrevSelect = (value) => {
    prevLinkOptions.value = ''
    article.prev.link = ''
    if(value === '调试维修'){
        article.prev.link = '/zh/调试维修/'
    }else{
        article.prev.link = '/zh/产品/'
    }
}

const handlePrevChange = (value) => {
    if(value){
        if(!article.prev.link) return ElMessage({ message: '请先选择分类！', type: 'warning' }) && (prevLinkOptions.value = '') 
        
        if(article.prev.link === '') return
        const newVal = article.prev.link.split('/').filter(Boolean);
        article.prev.link = '/' + newVal[0] + '/' + newVal[1] + '/'

        value.forEach((item, index) => {
            if (index < value.length - 1) {
                article.prev.link += item + '/'
            }else{
                article.prev.link += item
            }
        })
        article.prev.link += '.md';
    }
}

const handleNextClear = () => {
    article.next.link = ''
}

const handleNextSelect = (value) => {
    nextLinkOptions.value = ''
    article.next.link = ''
    if(value === '调试维修'){
        article.next.link = '/zh/调试维修/'
    }else{
        article.next.link = '/zh/产品/'
    }
}

const handleNextChange = (value) => {
    if(value){
        if(!article.next.link) return ElMessage({ message: '请先选择分类！', type: 'warning' }) && (nextLinkOptions.value = '') 
        
        if(article.next.link === '') return
        const newVal = article.next.link.split('/').filter(Boolean);
        article.next.link = '/' + newVal[0] + '/' + newVal[1] + '/'

        value.forEach((item, index) => {
            if (index < value.length - 1) {
                article.next.link += item + '/'
            }else{
                article.next.link += item
            }
        })
        article.next.link += '.md';
    }
}

const handleSettingSave = async(formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            localStorage.setItem('blog', JSON.stringify({
                'title': article.title,
                'imgSrc': article.imgSrc,
                'prev': { 'text': article.prev.text, 'link': article.prev.link },
                'next': { 'text': article.next.text, 'link': article.next.link },
            }))
            ElMessage({ message: '保存成功！', type: 'success' })
            dialogVisible.value = false
        } else {
            ElMessage({ message: '请填写完整！', type: 'error' })
        }
    })
}

onMounted(() => {
    const blogData = localStorage.getItem('blog');
    if (!blogData) return;

    const articleLocalStorage = JSON.parse(blogData);
    const { title, imgSrc, prev, next } = articleLocalStorage;

    // 更新文章基本信息
    Object.assign(article, { title, imgSrc, prev, next });

    // 路径处理函数
    const processNavPath = (path, type) => {
        const cleanPath = path.replace(/\.md$/, '').replace('/zh/', '');
        const parts = cleanPath.split('/').filter(Boolean);
        const firstPart = parts.shift() || '';
        
        if (type === 'nav') {
            return firstPart === '调试维修' ? '调试维修' : parts.length > 1 ? '产品列表' : '产品目录';
        }
        return firstPart === '产品' ? '产品列表' : '调试维修';
    };

    // 处理导航路径
    const handlePath = (path, type) => {
        const cleanPath = path.replace(/\.md$/, '').replace('/zh/', '')
        const parts = cleanPath.split('/').filter(Boolean);
        parts.shift(); // 移除第一个路径部分
        return parts;
    };

    // 处理上一页
    articlePrevText.value = processNavPath(prev.link, 'nav');
    prevLinkOptions.value = handlePath(prev.link);

    // 处理下一页
    articleNextText.value = processNavPath(next.link, 'nav');
    nextLinkOptions.value = handlePath(next.link);

    // 处理图片路径
    articlePictureText.value = processNavPath(imgSrc, 'img');
    articlePictureOptions.value = imgSrc.split('/').filter(Boolean).slice(1);
});
</script>

<template>
<el-form :model="article" labelPosition="top" ref="ruleFormRef" :rules="rules">
    <el-form-item label="标题" prop="title">
        <el-input v-model="article.title" placeholder="标题" />
    </el-form-item>
    <el-form-item label="图片目录" class="picture-item" prop="imgSrc">
        <el-row :gutter="4" style="width:100%">
            <el-col :span="5">
                <el-select @clear="handlePictureClear" @change="handlePictureSelect" clearable placeholder="分类" v-model="articlePictureText" popper-class="link-text-select" style="width: 115px;">
                    <el-option label="产品列表" value="产品" />
                    <el-option label="调试维修" value="调试维修" />
                </el-select>
            </el-col>
            <el-col :offset="0" :span="19">
                <el-cascader 
                    v-model="articlePictureOptions"
                    :options="products" 
                    :props="{ expandTrigger: 'hover' }"
                    popper-class="cascader-props picture-cascader"
                    placeholder="图片目录"
                    clearable 
                    @change="handlePictureChange"
                />
            </el-col>
        </el-row>
    </el-form-item>
    <el-form-item label="上一篇文章" class="prev-article" prop="prev.text">
        <el-row :gutter="5" style="width:100%">
            <el-col :span="8">
                <el-input placeholder="标题" v-model="article.prev.text" />
            </el-col>
            <el-col :span="4">
                <el-select @clear="handlePrevClear" @change="handlePrevSelect" clearable placeholder="分类" v-model="articlePrevText" popper-class="link-text-select">
                    <el-option label="产品目录" value="产品目录" />
                    <el-option label="产品列表" value="产品列表" />
                    <el-option label="调试维修" value="调试维修" />
                </el-select>
            </el-col>
            <el-col :span="12">
                <el-cascader
                    v-model="prevLinkOptions"
                    :options="articlePrevText === '产品目录'? productClassification: products" 
                    :props="{ expandTrigger: 'hover' }"
                    popper-class="cascader-props"
                    clearable
                    placeholder="链接"
                    @change="handlePrevChange"
                />
            </el-col>
        </el-row>
    </el-form-item>
    <el-form-item label="下一篇文章" class="next-article" prop="next.text">
        <el-row :gutter="5" style="width:100%">
            <el-col :span="8">
                <el-input placeholder="标题" v-model="article.next.text" />
            </el-col>
            <el-col :span="4">
                <el-select @clear="handleNextClear" @change="handleNextSelect" clearable placeholder="分类" v-model="articleNextText" popper-class="link-text-select">
                    <el-option label="产品目录" value="产品目录" />
                    <el-option label="产品列表" value="产品列表" />
                    <el-option label="调试维修" value="调试维修" />
                </el-select>
            </el-col>
            <el-col :span="12">
                <el-cascader
                    v-model="nextLinkOptions"
                    :options="articleNextText === '产品目录'? productClassification: products" 
                    :props="{ expandTrigger: 'hover' }"
                    popper-class="cascader-props"
                    clearable
                    placeholder="链接"
                    @change="handleNextChange"
                />
            </el-col>
        </el-row>
    </el-form-item>
    <el-form-item class="button-form-item">
        <el-button @click="handleSettingSave(ruleFormRef)" color="#5a72fe" type="primary" class="setting-button">
            确定
        </el-button>
    </el-form-item>
</el-form>
</template>

<style lang="scss">
.my-style-dialog{
    .el-dialog__headerbtn:hover .el-dialog__close {
        color: var(--vp-c-accent);
    }
    .el-dialog__body{
        padding: 0 20px;
    }
    .setting{
        .prev-article, .next-article{
            .el-cascader {
                width: 100%; 
                .el-input{
                    &.is-focus .el-input__wrapper {
                        box-shadow: 0 0 0 1px var(--vp-c-accent) inset;
                    }
                }  
            }
        }
        .picture-item{
            .el-cascader{
                width: 100%;
            }
            .el-cascader .el-input.is-focus .el-input__wrapper{
                box-shadow: 0 0 0 1px var(--vp-c-accent) inset;
            }
            .el-select{
                width: 100% !important;
            }
        }
    }

    .button-form-item{
        .el-form-item__content{
            justify-content: flex-end;
        }

    }

    .el-input-group__append, .el-input-group__prepend{
        background-color: transparent;
    }
    .el-select__wrapper.is-focused {
        box-shadow: 0 0 0 1px var(--vp-c-accent) inset;
    }
    .el-input-group--prepend .el-input-group__prepend .el-select .el-select__wrapper.is-focused {
        box-shadow: 0 0 0 1px var(--vp-c-accent) inset;
    }
}

.cascader-props{
    z-index: 10000 !important;
}

.link-text-select{
    z-index: 10000 !important;
}

[data-theme='dark'] {

.my-style-dialog{

    .el-cascader  .el-input__inner{
        --el-input-placeholder-color: var(--el-input-text-color, var(--el-text-color-regular));
    }
}

.cascader-props .el-cascader-node:hover {
    background: #1f2d3d;
}

}
</style>