<script setup>
import { ref } from 'vue'
import { LinkIcon } from '../icons/icons'
import MenuButton from './MenuButton.vue'
import { ElMessage } from 'element-plus'
import { BubbleMenu } from '@tiptap/vue-3'

const dialogSetLinkVisible = ref(false)
const linkContent = ref()
const isEdit = ref(false)

const { editor } = defineProps({
    editor: Object
})

const handleClose = () => {
    dialogSetLinkVisible.value = false
    editor.commands.focus()
}

const setLink = () => {
    isEdit.value = false
    linkContent.value = ''
    if(!editor.state.selection.empty){
        dialogSetLinkVisible.value = true

    }else{
        ElMessage({
            message: '请选择要添加链接的文字！',
            type: 'warning',
        })
    }
}

const saveLink = () => {

    if(linkContent.value) {
        editor.chain().focus().extendMarkRange('link').setLink({ href: linkContent.value }).run()
        editor.commands.focus()
    }
    dialogSetLinkVisible.value = false
}

const editLink = () => {
    isEdit.value = true
    linkContent.value = editor.getAttributes('link').href
    dialogSetLinkVisible.value = true
}

const deleteLink = () => {
    editor.chain().focus().unsetLink().run()
}
</script>

<template>
    <div>
        <MenuButton 
            tipContent="链接" 
            :editor="editor"
            @handleClick="setLink"
            :isActiveClass="{ 'is-active': editor.isActive('link') }"
        >
            <template #icon>
                <LinkIcon />
            </template>
        </MenuButton>
        <bubble-menu class="link-bubble-menus" :shouldShow="() => editor.isActive('link')" :editor="editor" :tippy-options="{ duration: 100 }" v-if="editor">
            <div class="link-input-cotainer">
                <a class="link">{{ editor.getAttributes('link').href }}</a>
                <el-divider direction="vertical" />
                <el-button link type="primary" class="link-button" @click="editLink">编辑</el-button>
                <el-button link type="danger" class="link-button" @click="deleteLink">删除</el-button>
            </div>
        </bubble-menu>
        <el-dialog
            v-model="dialogSetLinkVisible"
            :title="isEdit? '编辑链接':'添加链接'"
            width="500"
            class="setlink-dialog"
            :before-close="handleClose"
            draggable
            append-to-body
        >
            <el-input v-model="linkContent" />
            <template #footer>
                <div class="dialog-footer">
                    <el-button color="#5a72fe" type="primary" @click="saveLink">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<style lang="scss">

.link-input-cotainer {
    display: flex;
    align-items: center;
    background-color: white;
    box-shadow: 0 0 6px 2px rgba($color: #000000, $alpha: .1);
    padding: 13px 10px;
    border: 1px solid #e4e4e4;
    overflow: hidden;

    .link {
        font-style: italic;
        max-width: 200px;
        &:hover{
            text-decoration: underline;
        }
    }

    .el-button--primary.is-link {
        color: var(--vp-c-accent);

        &:hover {
            color: var(--vp-c-accent-hover);
        }

        &:active{
            color: var(--vp-c-accent-bg);
        }
    }


}

.setlink-dialog{

    .el-dialog__headerbtn{

        &:hover .el-dialog__close{
            color: var(--vp-c-accent-bg);
        }

    }

    .el-dialog__body {
        padding: 0 20px;
    }
}

[data-theme='dark'] {
    .setlink-dialog { 
        background-color: var(--vp-c-bg);
        box-shadow: inset 0 0 0 1px var(--vp-c-border);

        .el-dialog__title{
            color: var(--vp-c-text);
        }
    }

    .link-input-cotainer{
        background-color: var(--vp-c-bg);
        border-color: #2d2d2d;
    }
}
</style>