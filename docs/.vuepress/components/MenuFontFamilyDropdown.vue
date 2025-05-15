<script setup>

import { computed } from 'vue'

const { editor } = defineProps({
    editor: Object,
})

function handleFontFamilyCommand(command) {
    if(command === 'reset'){
        editor.chain().focus().unsetFontFamily().run()
    }else{
        editor.chain().focus().setFontFamily(command).run()
    }
}

const fontFamilyAttr = [
    { command: 'reset', title: '默认字体' },
    { command: 'Inter', title: 'Inter' },
    { command: 'Comic Sans MS, Comic Sans', title: 'Comic Sans' },
    { command: 'serif', title: 'serif' },
    { command: 'monospace', title: 'monospace' },
    { command: 'cursive', title: 'cursive' },
]

const getFontFamily = computed(() => {
    const fontFamily = editor.getAttributes('textStyle').fontFamily

    if(!fontFamily) return '默认字体'

    if(editor.getAttributes('textStyle').fontFamily === 'Comic Sans MS, Comic Sans' || editor.getAttributes('textStyle').fontFamily === "\"Comic Sans MS\", \"Comic Sans\""){
        return 'Comic Sans'
    }

    return fontFamily
})

</script>

<template>
    <el-dropdown class="fontFamily-dropdown" @command="handleFontFamilyCommand">
        <span class="fontFamily-dropdown-link">
            <span>{{ getFontFamily }}</span>
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu class="fontFamily-dropdown-menu">
                <el-dropdown-item
                    v-for="item in fontFamilyAttr"
                    :key="item.command"
                    :command="item.command"
                    class="fontFamily-dropdown-item"
                >
                    <div class="fontFamily-dropdown-text" :style="(editor.getAttributes('textStyle').fontFamily === item.command || (item.command === 'reset' && !editor.getAttributes('textStyle').fontFamily)) ? 'color: var(--vp-c-accent)': ''">
                        <span :style="{fontFamily: item.command}">{{ item.title }}</span>
                    </div>
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<style lang="scss">
.fontFamily-dropdown {
    vertical-align: middle;
    width: 90px;
    height: 34px;
    border-radius: 3px;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #e5e9ff;
        color: var(--vp-c-accent);
    }

    .fontFamily-dropdown-link {
        outline: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.fontFamily-dropdown-menu {

    .fontFamily-dropdown-item {
        align-items: center;
        padding: 5px 16px;

        &:not(.is-disabled):hover {
            background-color: #e5e9ff;
            color: var(--vp-c-accent);
        }

        .fontFamily-dropdown-text{
            display: flex;
            align-items: center;
        }
    }
}

[data-theme='dark'] {

.fontFamily-dropdown{
    background-color: var(--vp-c-bg);

    &:hover {
        background-color: #1f2d3d;
    }
}

.fontFamily-dropdown-menu {
    background-color: var(--vp-c-bg);

    .fontFamily-dropdown-item {

        &:not(.is-disabled):hover {
            background-color: #1f2d3d;
        }
    }
}

}
</style>