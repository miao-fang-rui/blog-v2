<script setup>
import { ref, computed, watchEffect } from 'vue'

const { editor } = defineProps({
    editor: Object,
})

const fontSizeAttr = [
    { value: 12, label: '12px' },
    { value: 14, label: '14px' },
    { value: 16, label: '16px' },
    { value: 18, label: '18px' },
    { value: 20, label: '20px' },
    { value: 22, label: '22px' },
    { value: 24, label: '24px' },
    { value: 26, label: '26px' },
    { value: 28, label: '28px' },
    { value: 30, label: '30px' },
    { value: 32, label: '32px' },
    { value: 34, label: '34px' },
    { value: 36, label: '36px' },
    { value: 48, label: '48px' },
    { value: 56, label: '56px' },
    { value: 72, label: '72px' },
]

const fontSizeValue = ref(16)

const handleFontSizeChange = (size) => {
    editor.chain().focus().setFontSize(size).run()
}

const currentFontSize = computed(() => {
    const size = editor?.getAttributes('textStyle')?.fontSize
    return size ? parseInt(size) : editor?.getAttributes('heading').level? `H${editor?.getAttributes('heading').level}`: 16
})

watchEffect(()=> {
    fontSizeValue.value = currentFontSize.value
})
</script>

<template>

    <el-select 
        v-model="fontSizeValue" 
        filterable 
        allow-create 
        placeholder="16px" 
        class="fontsize-select" 
        @change="handleFontSizeChange"
    >
        <template #label="{ label, value }">
            <span>{{ String(value).match(/^\d+$/) ? `${value}px` : value  }}</span>
        </template>
        <el-option
            v-for="item in fontSizeAttr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
    </el-select>
</template>

<style lang="scss">

.fontsize-select {
    width: 76px;
    margin-left: 4px;
    .el-select__wrapper{
        box-shadow: none;

        &.is-hovering {
            box-shadow: none;
            background-color: #e5e9ff;
            

            .el-select__placeholder {
                color: var(--vp-c-accent);
            }
        }
    }
}


[data-theme='dark'] {
    .fontsize-select {

        .el-select__wrapper {
            background-color: var(--vp-c-bg);

            &.is-hovering {
                background-color: #1f2d3d;
                box-shadow: none;

                .el-select__placeholder {
                    color: var(--vp-c-accent);
                }
            }
        }

        
    }

    .el-select-dropdown__item.is-hovering {
        background-color: #1f2d3d;
    }
}

</style>