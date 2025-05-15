<script setup>

import { ref, computed } from 'vue';
import { Pencil } from '../icons/icons'
import MenuButton from './MenuButton.vue';
const { editor } = defineProps({
    editor: Object
})

const color = ref('')

const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

const getColor = computed(() => {
    const colorVal = editor.getAttributes('textStyle').color
    if(colorVal === undefined){
        color.value = ''
        return ''
    }
    color.value = colorVal
    return colorVal
})

const handleColorChange = (value) => {

    if (editor.state.selection.empty) {
        return 
    }
    
    if(color.value === value){
        return
    }
    color.value = value
    editor.chain().setColor(value).run()
}
    

</script>

<template>
<div class="color-picker">
    <MenuButton 
        class="color-button"
        tipContent="文本颜色" 
        :editor="editor"
        @handleClick="$refs.colorInput.show()"
        :isActiveClass="{ 'is-active': getColor }"
    >
        <template #icon>
            <Pencil />
            <el-color-picker @active-change="handleColorChange" ref="colorInput" class="color-input" v-model="color" show-alpha :predefine="predefineColors" />
        </template>
    </MenuButton>
</div>
</template>

<style lang="scss">
.color-picker {
    position: relative;

    .color-input {
        position: absolute;
        bottom: -6px;
        left: 10%;
        
        .el-color-picker__trigger {
            height: 5px;
            border: none;
            padding: 0;
            width: 16px;

            .el-color-picker__icon {
                display: none;
            }
        }
    }
}

.el-color-dropdown__link-btn{
    display: none;
}

.el-color-dropdown__btn {
    &:hover {
        color: var(--vp-c-accent);
        border-color: var(--vp-c-accent);
    }
}

.el-input__wrapper.is-focus{
    box-shadow: 0 0 0 1px var(--vp-c-accent) inset;
}

.el-color-picker .el-color-picker__empty{
    display: none;
}
</style>