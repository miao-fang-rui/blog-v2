<script setup>
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { computed } from 'vue'

const themeLocale = useThemeLocaleData()

const props = defineProps({
    type: String,
    src: String,
    width: String,
    height: String,
    alt: String,
    title: String,
    previewTeleported: String
})

const loadingText = computed(() =>
    themeLocale.value.Loading ?? 'Loading'
)
const errorText = computed(() =>
    themeLocale.value.LoadFail ?? 'load Fail'
)

const getImgStyle = computed(() => {
    switch (props.type) {
        case 'list':
            return {
                width: props.width,
                height: props.height
            };
        case 'carousel':
            return {
                width: '100%',
                height: '100%'
            };
        default:
            return {
                maxWidth: props.width,
                height: props.height
            };
    }
})

const getErrorStyle = computed(() => {
    const baseStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'var(--el-fill-color-light)',
        color: 'var(--el-text-color-secondary)',
        fontSize: '14px'
    };

    switch (props.type) {
        case 'list':
            return {
                ...baseStyle,
                width: props.width,
                height: props.height
            };
        case 'carousel':
            return {
                ...baseStyle,
                width: '100%',
                height: '100%'
            };
        default:
            return {
                ...baseStyle,
                width: props.width,
                height: props.height
            };
    }
});
</script>

<template>

    <el-image 
        :src="props.src" 
        :alt="props.alt ?? props.title" 
        :title="props.title" 
        fit="contain" 
        :z-index="100000"
        :style="getImgStyle"
        :zoom-rate="1.2" 
        :max-scale="7" 
        :min-scale="0.2" 
        hide-on-click-modal 
        :preview-src-list="[props.src,]"
        :preview-teleported="props.previewTeleported"
    >
        <template #placeholder>
            <div
                style="display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;background: var(--el-fill-color-light);color: var(--el-text-color-secondary);font-size: 14px;">
                <el-icon class="is-loading">
                    <Loading />
                </el-icon>
                <span style="margin: 0 4px;color:var(--el-text-color-placeholder);">{{ loadingText }}</span>
                <span style="animation: dot 2s infinite steps(3, start); overflow: hidden;">...</span>
            </div>
        </template>
        <template #error>
            <div :style="getErrorStyle">
                <span>{{ errorText }}</span>
            </div>
        </template>
    </el-image>
</template>
