<script setup>
import { ref } from 'vue'
import { MarkdownIcon, PdfIcon } from '../icons/icons'
import DialogSetting from './DialogSetting.vue'
import { ElMessageBox, ElMessage } from 'element-plus'

import JSZip from 'jszip';
import pkg from 'file-saver'
const { saveAs } = pkg

const zip = new JSZip();

const { draggable, width, title, name, editor } = defineProps({
    draggable: Boolean,
    width: String || Number,
    title: String,
    name: String,
    editor: Object,

})

const dialogSetting = ref(null)
const dialogVisible = defineModel('dialogVisible')
const activeTabName = ref('Html')
const sourceContent = ref('')
const tabPane = [
    {label: 'Html', name: 'Html'},
    {label: 'Markdown', name: 'Markdown'},
]

const converseImages = (markdownText, article) => {
    const regex = /!\[(.*?)\]\((data:.*?\")(.*?)"(.*?)\)/g;

    const replacedText = markdownText.replace(regex, (_, alt, blob, title, size) => {
        if(size && size.trim()){
            const newSize = size?.trim().replace('=', '').split('x')
            const value = newSize.map(s => s === '100%'? '': s);

            if(!value[0] && !value[1]){
                return `![${alt}](${article.imgSrc}${title})`
            }else{
                return `![${alt}](${article.imgSrc}${title} =${value[0]}x${value[1]})`
            }
        }else{
            return `![${alt}](${article.imgSrc}${title})`
        }
    })

    return replacedText
}

const handleTabsChange = (TabPaneName) => {
    if (TabPaneName === 'Html') {
        sourceContent.value = editor.getHTML()
    }

    if (TabPaneName === 'Markdown') {
        const blogData = localStorage.getItem('blog');
        const article = JSON.parse(blogData);

        const markdown =  editor.commands.outputMarkdown()
        const converseMarkdown = converseImages(markdown, article)
        sourceContent.value = converseMarkdown
        // console.log(markdown)
    }
}

const dialogBeforeClose = (done) => {
    if(name === 'setting'){
        dialogSetting.value?.ruleFormRef?.clearValidate()
    }
    done()
}


const getMarkdownFile = () => {

    const blogData = localStorage.getItem('blog');
    const articleLocalStorage = JSON.parse(localStorage.getItem('blog-content'))

    if (!blogData) return;

    const article = JSON.parse(blogData);
    
    if (article.title !== '') {
        ElMessageBox.confirm('确认下载本页面文档 - [ ' + article.title + '.zip' + ' ], 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            plain: true,
            draggable: true,
        })
        .then(() => {
            
            const content = converseImages(editor.commands.outputMarkdown(), article)
            const frontpage =
                                `---
sidebar: heading
prev:
  text: ${article.prev.text? article.prev.text: '无'}
  link: ${article.prev.link? article.prev.link: '无'}
next:
  text: ${article.next.text? article.next.text: '无'}
  link: ${article.next.link? article.next.link: '无'}
---

`
            // 创建一个 Blob 对象，它表示了一段不可变的原始数据
            const blob = new Blob([frontpage + content], { type: 'text/plain' });
            zip.file(`${article.title}.md`, blob);

            articleLocalStorage.content.forEach( (item, index) => {
                if(item.type === "ResizableImage"){
                    const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(item.attrs?.src) || [];
                    
                    if (!format) {
                        console.error('ERROR: Invalid base64 image format');
                        return;
                    }

                    // 将Base64编码的数据转换为二进制数据
                    const binaryData = atob(bodyData);

                    var arrayBuffer = new ArrayBuffer(binaryData.length);
                    var view = new Uint8Array(arrayBuffer);
                    for (var i = 0; i < binaryData.length; i++) {
                        view[i] = binaryData.charCodeAt(i) & 0xFF;
                    }

                    // 创建一个Blob对象，并将其添加到ZIP文件中
                    zip.file(`${item.attrs.title}`, arrayBuffer, {
                        type: `image/${format}`,
                    });

                }
            })

            zip.generateAsync({ type: 'blob' }).then(blob => {
                saveAs(blob, `${article.title}.zip`);
            }).catch(err => console.error(err));


            ElMessage.success({
                message: '导出成功，请等待浏览器下载！',
                type: 'success',
                plain: true,
            })
            dialogVisible.value = false

        }).catch((err) => {
            ElMessage({
                message: '取消下载!',
                type: 'error',
                plain: true,
            })

        })
    } else {
        ElMessage({
            message: '请先设置文章标题!',
            type: 'error',
            plain: true,
        })
    }

}

const getPdfFile = () => {
    console.log('getPdf')
    // const markdown = editor.commands.outputMarkdown()
    // const markdown = converseImages(editor.commands.outputMarkdown())
    // console.log(markdown)
}

</script>

<template>
    <el-dialog 
        v-model="dialogVisible" 
        :draggable="draggable" 
        :show-close="true"
        :width="width" 
        :title="title"
        append-to-body
        class="my-style-dialog"
        :before-close="dialogBeforeClose"
    >
        <div v-show="name === 'sourceCode'" class="sourceCode">
            <el-tabs v-model="activeTabName" class="sourceCodeTabs" @tab-change="handleTabsChange">
                <el-scrollbar height="400px">
                    <el-tab-pane v-for="tab in tabPane" :key="tab.name" :label="tab.label" :name="tab.name">{{ sourceContent }}</el-tab-pane>
                </el-scrollbar>
            </el-tabs>
        </div>
        <div v-if="name === 'setting'" class="setting">
            <DialogSetting  ref="dialogSetting" v-model:dialogVisible="dialogVisible"  />
        </div>
        <div v-if="name === 'download'" class="download">
            <div class="download-buttons">
                <el-button class="download-btn" color="#626aef" plain @click="getMarkdownFile">
                    <el-icon size="60" class="download-icon">
                        <MarkdownIcon />
                    </el-icon>
                    <span>MarkDown</span>
                </el-button>
                <el-button class="download-btn" color="#626aef" plain @click="getPdfFile">
                    <el-icon size="60" class="download-icon">
                        <PdfIcon />
                    </el-icon>
                    <span>PDF</span>
                </el-button>
            </div>
        </div>
    </el-dialog>
</template>

<style lang="scss">
.my-style-dialog{
    .el-dialog__headerbtn:hover .el-dialog__close {
        color: var(--vp-c-accent);
    }
    .el-dialog__body{
        padding: 0 20px;
    }
    .el-tabs__item.is-active, .el-tabs__item:hover {
        color: var(--vp-c-accent);
    }
    .el-tabs__active-bar {
        background-color: var(--vp-c-accent);
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

    .download-buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 100px;
        box-sizing: border-box;

        .download-btn {
            height: 200px;
            width: 50%;

            :deep(span) {
                display: flex;
                flex-direction: column;

                .download-icon {
                    margin-bottom: 10px;
                }
            }
        }
    }
}

[data-theme='dark'] {
    .my-style-dialog{
        background-color: var(--vp-c-bg);
        box-shadow: inset 0 0 0 1px var(--vp-c-border);

        .el-dialog__title {
            color: var(--vp-c-text);
        }

        .el-input__wrapper {
            background-color: var(--vp-c-bg);
            box-shadow: 0 0 0 1px var(--vp-c-border) inset;

            &:hover {
                box-shadow: 0 0 0 1px var(--vp-c-grey-hover) inset;
            }

            &:focus-within {
                box-shadow: 0 0 0 1px var(--vp-c-accent) inset;
            }
        }

        .el-select__wrapper{
            background-color: var(--vp-c-bg-dark);
            box-shadow: 0 0 0 1px var(--vp-c-border) inset;

            &:hover {
                box-shadow: 0 0 0 1px var(--vp-c-grey-hover) inset;
            }

            &:focus-within {
                box-shadow: 0 0 0 1px var(--vp-c-accent) inset;
            }
        }

        .el-cascader .el-input__inner {
            color: var(--el-input-text-color, var(--el-text-color-regular));
        }

        .el-tabs__nav-wrap:after {
            background-color: var(--vp-c-border);
        }

        .download-btn{
            background-color: var(--vp-c-bg);
            color: var(--vp-c-text);
            border: 1px solid var(--vp-c-border);
            box-shadow: 0 0 0 1px var(--vp-c-border) inset;

            &:hover {
                background-color: var(--vp-c-bg-hover);
                color: var(--vp-c-accent);
                border: 1px solid var(--vp-c-accent);
            }
        }

        
    }

    .el-message-box {
        background-color: var(--vp-c-bg);
        box-shadow: 0 0 0 1px var(--vp-c-border) inset;
        color: var(--vp-c-text);
    }
}
</style>