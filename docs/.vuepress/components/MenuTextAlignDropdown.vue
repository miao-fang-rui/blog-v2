<script setup>

import { LeftTextAlign, CenterTextAlign, RightTextAlign, JustifyTextAlign } from '../icons/icons'
import { ref, watchEffect } from 'vue'

const { editor } = defineProps({
    editor: Object,
})

const isTextAlign = ref('left')

watchEffect(() => {
    if (editor.isActive({ textAlign: 'center' })) {
        isTextAlign.value = 'center'
    } else if (editor.isActive({ textAlign: 'right' })) {
        isTextAlign.value = 'right'
    } else if (editor.isActive({ textAlign: 'justify' })) {
        isTextAlign.value = 'justify'
    } else {
        isTextAlign.value = 'left'
    }
})

function handleTextAlignCommand(command) {
    isTextAlign.value = command
    editor.chain().focus().setTextAlign(command).run()
}

const textAlignAttr = [
    { command: 'left', title: '左对齐', icon: LeftTextAlign },
    { command: 'center', title: '居中对齐', icon: CenterTextAlign },
    { command: 'right', title: '右对齐', icon: RightTextAlign },
    { command: 'justify', title: '两端对齐', icon: JustifyTextAlign },
]

function getIconComponent(textAlign) {
    switch (textAlign) {
        case 'left':
            return LeftTextAlign;
        case 'center':
            return CenterTextAlign;
        case 'right':
            return RightTextAlign;
        case 'justify':
            return JustifyTextAlign;
        default:
            return LeftTextAlign;
    }
}
</script>

<template>
    <el-dropdown class="textalign-dropdown" @command="handleTextAlignCommand">
        <span class="textalign-dropdown-link">
            <el-icon size="18">
                <component :is="getIconComponent(isTextAlign)" />
            </el-icon>
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu class="textalign-dropdown-menu">
                <el-dropdown-item
                    v-for="item in textAlignAttr"
                    :key="item.command"
                    :command="item.command"
                    class="textalign-dropdown-item"
                >
                    <div class="textalign-dropdown-text" :style="isTextAlign === item.command? 'color: var(--vp-c-accent)': ''">
                        <el-icon>
                            <component :is="item.icon" />
                        </el-icon>
                        {{ item.title }}
                    </div>
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<style lang="scss">
.textalign-dropdown {
    vertical-align: middle;
    width: 46px;
    height: 34px;
    border-radius: 3px;
    align-items: center;
    justify-content: center;
    margin-left: 6px;

    &:hover {
        background-color: #e5e9ff;
        color: var(--vp-c-accent);
    }

    .textalign-dropdown-link {
        outline: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.textalign-dropdown-menu {

    .textalign-dropdown-item {
        align-items: center;
        padding: 5px 16px;

        &:not(.is-disabled):hover {
            background-color: #e5e9ff;
            color: var(--vp-c-accent);
        }

        .textalign-dropdown-text{
            display: flex;
            align-items: center;
        }
    }
}

[data-theme='dark'] {
    .textalign-dropdown {
        &:hover {
            background-color: #1f2d3d;
        }
    }

    .textalign-dropdown-menu {
        background-color: var(--vp-c-bg-dark);
        .textalign-dropdown-item {
            &:not(.is-disabled):hover {
                background-color: #1f2d3d;
            }
        }
    }
}

</style>