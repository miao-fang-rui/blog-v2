<script setup>
import { computed, reactive, ref } from 'vue'
import MenuButton from './MenuButton.vue';
import MenuHeadingDropdown from './MenuHeadingDropdown.vue';
import MenuTextAlignDropdown from './MenuTextAlignDropdown.vue';
import ColorPick from './ColorPick.vue';
import BackColorPick from './BackColorPick.vue';
import MenuFontSizeDropdown from './MenuFontSizeDropdown.vue';
import MenuFontFamilyDropdown from './MenuFontFamilyDropdown.vue';
import MenuLink from './MenuLink.vue';
import MenuTable from './MenuTable.vue';
import MenuImage from './MenuImage.vue';
import ElDialog from './ElDialog.vue';


import {
    Bold,
    Italic,
    Blockquote,
    BulletList,
    HardBreak,
    HorizontalRule,
    OrderedList,
    TaskItem,
    ImageIcon,
    StrikeIcon,
    Underline,
    Subscript,
    Superscript,
    CodeIcon,
    CodeBlockIcon,
    UndoIcon,
    RedoIcon,
    SourceCodeIcon,
    PrintIcon,
    SettingIcon,
    DownloadIcon,
    EraserIcon,
    MarkdownIcon,
    PdfIcon,
    TipIcon
} from '../icons/icons'

const { editor } = defineProps({
    editor: Object
})



const menuButtons = [
    { 
        type: 'button', 
        tipContent: '撤销', 
        disabled: () => !editor.can().undo(), 
        handleClick: () => editor.chain().focus().undo().run(), icon: UndoIcon 
    },
    { 
        type: 'button', 
        tipContent: '恢复', 
        disabled: () => !editor.can().redo(), 
        handleClick: () => editor.chain().focus().redo().run(), 
        icon: RedoIcon 
    },
    { 
        type: 'button', 
        tipContent: '清除格式', 
        handleClick: () => editor.chain().focus().unsetAllMarks().run(), 
        icon: EraserIcon 
    },
    { type: 'divider', direction: 'vertical' },
    { type: 'fontFamily' },
    { type: 'heading' },
    { type: 'fontSize' },
    { type: 'textAlign' },
    { type: 'divider', direction: 'vertical' },
    { type: 'color' },
    { type: 'backColor' },
    { 
        type: 'button', 
        tipContent: '粗体', 
        isActiveClass: () => editor.isActive('bold'), 
        handleClick: () => editor.chain().focus().toggleBold().run(), 
        icon: Bold 
    },
    { 
        type: 'button', 
        tipContent: '斜体', 
        isActiveClass: () => editor.isActive('italic'), 
        handleClick: () => editor.chain().focus().toggleItalic().run(), 
        icon: Italic 
    },
    { 
        type: 'button', 
        tipContent: '下划线', 
        isActiveClass: () => editor.isActive('underline'), 
        handleClick: () => editor.chain().focus().toggleUnderline().run(), 
        icon: Underline 
    },
    { 
        type: 'button', 
        tipContent: '删除线', 
        isActiveClass: () => editor.isActive('strike'), 
        handleClick: () => editor.chain().focus().toggleStrike().run(), 
        icon: StrikeIcon 
    },
    { type: 'divider', direction: 'vertical' },
    { 
        type: 'button', 
        tipContent: '上标', 
        isActiveClass: () => editor.isActive('superscript'), 
        handleClick: () => editor.chain().focus().toggleSuperscript().run(), 
        icon: Superscript 
    },
    { 
        type: 'button', 
        tipContent: '下标', 
        isActiveClass: () => editor.isActive('subscript'), 
        handleClick: () => editor.chain().focus().toggleSubscript().run(), 
        icon: Subscript 
    },
    { 
        type: 'button', 
        tipContent: '行内代码', 
        isActiveClass: () => editor.isActive('code'), 
        handleClick: () => editor.chain().focus().toggleCode().run(), 
        icon: CodeIcon 
    },
    { 
        type: 'button', 
        tipContent: '代码块', 
        isActiveClass: () => editor.isActive('codeBlock'), 
        handleClick: () => editor.chain().focus().toggleCodeBlock().run(), 
        icon: CodeBlockIcon 
    },
    { 
        type: 'button', 
        tipContent: '提示信息', 
        isActiveClass: () => editor.isActive('tip'), 
        handleClick: () => editor.chain().focus().toggleTipText().run(), 
        icon: TipIcon 
    },
    { type: 'divider', direction: 'vertical' },
    { 
        type: 'button', 
        tipContent: '分割线', 
        handleClick: () => editor.chain().focus().setHorizontalRule().run(), 
        icon: HorizontalRule 
    },
    { 
        type: 'button', 
        tipContent: '换行', 
        handleClick: () => editor.chain().focus().setHardBreak().run(), 
        icon: HardBreak 
    },
    { 
        type: 'button', 
        tipContent: '引用', 
        isActiveClass: () => editor.isActive('blockquote'), 
        handleClick: () => editor.chain().focus().toggleBlockquote().run(), 
        icon: Blockquote 
    },
    { 
        type: 'button', 
        tipContent: '无序列表', 
        isActiveClass: () => editor.isActive('bulletList'), 
        handleClick: () => editor.chain().focus().toggleBulletList().run(), 
        icon: BulletList 
    },
    { 
        type: 'button', 
        tipContent: '有序列表', 
        isActiveClass: () => editor.isActive('orderedList'), 
        handleClick: () => editor.chain().focus().toggleOrderedList().run(), 
        icon: OrderedList 
    },
    { 
        type: 'button', 
        tipContent: '任务列表', 
        isActiveClass: () => editor.isActive('taskList'), 
        handleClick: () => editor.chain().focus().toggleTaskList().run(), 
        icon: TaskItem 
    },
    { type: 'divider', direction: 'vertical' },
    { type: 'link' },
    { type: 'image' },
    { type: 'table' },
    { type: 'divider', direction: 'vertical' },
    { 
        type: 'button', 
        tipContent: '源代码', 
        handleClick: () => handleSourceCode(), 
        icon: SourceCodeIcon 
    },
    { 
        type: 'button', 
        tipContent: '打印', 
        tipdisabled: true,
        handleClick: () => window.print(), 
        icon: PrintIcon 
    },
    { type: 'divider', direction: 'vertical' },
    { 
        type: 'button', 
        tipContent: '设置', 
        handleClick: () => handleSetting(), 
        icon: SettingIcon 
    },
    { 
        type: 'button', 
        tipContent: '下载', 
        handleClick: () => download(), 
        icon: DownloadIcon 
    },
]

const dialogConfig = reactive({
    name: '',
    draggable: true,
    width: '',
    title: ''
})

const dialogVisible = ref(false)

const handleSourceCode = () => {
    dialogConfig.name = 'sourceCode'
    dialogConfig.title = '源代码'
    dialogConfig.width = '700'
    dialogVisible.value = true
}

const handleSetting = () => {
    dialogConfig.name = 'setting'
    dialogConfig.title = '文章设置'
    dialogConfig.width = '720'
    dialogVisible.value = true
}

const download = () => {

    dialogConfig.name = 'download'
    dialogConfig.title = '下载'
    dialogConfig.width = '720'
    dialogVisible.value = true

    // const content = htmlDocx.asBlob(editor.getHTML())
    // saveAs(content, 'document.docx')
}

</script>

<template>
    <div class="menu-buttons">
        <template v-for="(button, index) in menuButtons" :key="index">
            <MenuButton 
                v-if="button.type === 'button'" 
                :tipContent="button.tipContent" 
                :editor="editor"
                :disabled="button.disabled ? button.disabled() : false" 
                :tipdisabled="button.tipdisabled"
                @handleClick="button.handleClick"
                :isActiveClass="{ 'is-active': button.isActiveClass ? button.isActiveClass() : false }"
            >
                <template #icon>
                    <component :is="button.icon"></component>
                </template>
            </MenuButton>
            <MenuHeadingDropdown v-if="button.type === 'heading'" :editor="editor" />
            <MenuTextAlignDropdown v-if="button.type === 'textAlign'" :editor="editor" />
            <el-divider class="divider" v-if="button.type === 'divider'" :direction="button.direction" />
            <ColorPick v-if="button.type === 'color'" :editor="editor" />
            <BackColorPick v-if="button.type === 'backColor'" :editor="editor" />
            <MenuFontSizeDropdown v-if="button.type === 'fontSize'" :editor="editor" />
            <MenuFontFamilyDropdown v-if="button.type === 'fontFamily'" :editor="editor" />
            <MenuLink v-if="button.type === 'link'" :editor="editor" />
            <MenuTable v-if="button.type === 'table'" :editor="editor" />
            <MenuImage v-if="button.type === 'image'" :editor="editor" />
        </template>
        <ElDialog v-bind="dialogConfig" v-model:dialogVisible="dialogVisible" :editor="editor" />
    </div>
</template>

<style lang="scss" scoped>
.menu-buttons {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

[data-theme='dark'] {
    .divider {
        border-color: #333;
    }
}
</style>