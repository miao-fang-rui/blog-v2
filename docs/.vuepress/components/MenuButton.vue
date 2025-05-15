<script setup>
const { tipContent, tipdisabled, editor, disabled, isActiveClass, tipPlacement } = defineProps({
    tipContent: String,
    editor: Object,
    disabled: {
        type: Boolean,
        default: false,
    },
    isActiveClass: Object,
    tipPlacement: String,
    tipdisabled: Boolean
})

const emit = defineEmits(["handleClick"])
</script>

<template>
    <el-tooltip :content="tipContent" :show-after="200" :disabled="tipdisabled" :placement="tipPlacement">
        <el-button class="menu-button" :class="isActiveClass" :disabled="disabled" @click="emit('handleClick')">
            <el-icon size="18">
                <slot name="icon"></slot>
            </el-icon>
        </el-button>
    </el-tooltip>
</template>

<style lang="scss" scoped>
.menu-button {
    border: none;
    padding: 4px;
    background-color: var(--vp-c-bg);

    &:hover {
        // background-color: var(--vp-c-grey-hover);
        background-color: #e5e9ff;
        color: var(--vp-c-accent);
    }

    &:active {
        background-color: #cad2ff;
        color: var(--vp-c-accent);
    }

    &.is-disabled {
        color: #c0c4cc;
        background-color: transparent;
    }
}

.menu-button+.menu-button {
    margin-left: 4px;
}

.is-active {
    background-color: #e5e9ff !important;
    color: var(--vp-c-accent) !important;
}

[data-theme='dark'] {

.menu-button {
    background-color: var(--vp-c-bg-dark);

    &:hover {
        background-color: #1f2d3d;
        color: var(--vp-c-accent);
    }

    &:active {
        background-color: #2c4158;
        color: var(--vp-c-accent);
    }

    &.is-disabled {
        color: #c0c4cc;
        background-color: transparent;
    }
}

.is-active {
    background-color: #1f2d3d !important;
    color: var(--vp-c-accent) !important;
}
}
</style>