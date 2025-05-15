<script setup>
import { ref, watchEffect } from 'vue'
const { editor } = defineProps({
    editor: Object,
})

const activeHeading = ref('正文')

watchEffect(() => {
    if (editor.isActive('heading', { level: 1 })) {
        activeHeading.value = '标题1'
    } else if (editor.isActive('heading', { level: 2 })) {
        activeHeading.value = '标题2'
    } else if (editor.isActive('heading', { level: 3 })) {
        activeHeading.value = '标题3'
    } else if (editor.isActive('heading', { level: 4 })) {
        activeHeading.value = '标题4'
    } else if (editor.isActive('heading', { level: 5 })) {
        activeHeading.value = '标题5'
    } else if (editor.isActive('heading', { level: 6 })) {
        activeHeading.value = '标题6'
    } else {
        activeHeading.value = '正文'
    }
})

const headingAttr = [
    { command: 'heading1', title: '标题1' },
    { command: 'heading2', title: '标题2' },
    { command: 'heading3', title: '标题3' },
    { command: 'heading4', title: '标题4' },
    { command: 'heading5', title: '标题5' },
    { command: 'heading6', title: '标题6' },
    { command: 'text', title: '正文' },
]

const handleCommand = (command) => {
    const headingMap = {
        text: '正文',
        heading1: '标题1',
        heading2: '标题2',
        heading3: '标题3',
        heading4: '标题4',
        heading5: '标题5',
        heading6: '标题6',
    }

    activeHeading.value = headingMap[command]

    if (command === 'text') {
        editor.chain().focus().setParagraph().run()
    } else {
        const level = parseInt(command.replace('heading', ''), 10)
        editor.chain().focus().toggleHeading({ level }).run()
    }
}

</script>

<template>
    <el-dropdown class="heading-drop-down" @command="handleCommand">
        <span class="heading-dropdown-link">
            {{ activeHeading }}
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu class="heading-el-dropdown-menu">
                <el-dropdown-item class="heading-dropdown-item" v-for="item in headingAttr" :command="item.command" :key="item.command">
                    <h1 v-if="item.title === '标题1'" :style="activeHeading === item.title? 'color: var(--vp-c-accent)': ''">标题1</h1>
                    <h2 v-if="item.title === '标题2'" :style="activeHeading === item.title? 'color: var(--vp-c-accent)': ''">标题2</h2>
                    <h3 v-if="item.title === '标题3'" :style="activeHeading === item.title? 'color: var(--vp-c-accent)': ''">标题3</h3>
                    <h4 v-if="item.title === '标题4'" :style="activeHeading === item.title? 'color: var(--vp-c-accent)': ''">标题4</h4>
                    <h5 v-if="item.title === '标题5'" :style="activeHeading === item.title? 'color: var(--vp-c-accent)': ''">标题5</h5>
                    <h6 v-if="item.title === '标题6'" :style="activeHeading === item.title? 'color: var(--vp-c-accent)': ''">标题6</h6>
                    <span v-if="item.title === '正文'" :style="activeHeading === item.title? 'color: var(--vp-c-accent)': ''">正文</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<style lang="scss">
.heading-drop-down {
    vertical-align: middle;
    width: 70px;
    height: 32px;
    border-radius: 3px;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #e5e9ff;
        color: var(--vp-c-accent);
    }

    .heading-dropdown-link:focus-visible {
        outline: none;
    }
    
}

.heading-el-dropdown-menu{

    .heading-dropdown-item{
        padding: 5px 16px;
        &:hover {
            background-color: #e5e9ff;
            color: var(--vp-c-accent);
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            margin: 0 !important;
        }
    }
}

[data-theme='dark'] {

    .heading-drop-down {
        background-color: var(--vp-c-bg);

        &:hover {
            background-color: #1f2d3d;
        }
    }

    .heading-el-dropdown-menu {
        background-color: var(--vp-c-bg);

        .heading-dropdown-item {
            &:hover {
                background-color: #1f2d3d;
            }
        }
    }
}

</style>