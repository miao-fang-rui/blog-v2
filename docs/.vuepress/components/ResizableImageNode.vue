<script setup>

import { NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
    updateAttributes: {
        type: Function,
        required: true,
    },
})

const isDraggable = computed(() => {
    return this.node?.attrs?.isDraggable
})


// 状态管理
const initialSize = ref({ width: 0, height: 0 })
const startPos = ref({ x: 0, y: 0 })
const isResizing = ref(false)
const resizableImg = ref(null)
const cursorPosition = ref('')
const showMenu = ref(false)
const menuPosition = ref({ x: 0, y: 0 })
const MIN_SIZE = 50
// 新增鼠标跟踪状态
const hoverPosition = ref('')

// 仅响应四个角落
const DIRECTION_FACTORS = {
    'bottom-right': { x: 1, y: 1 },
    'top-left': { x: -1, y: -1 },
    'top-right': { x: 1, y: -1 },
    'bottom-left': { x: -1, y: 1 }
}

// 修改后的边缘检测（仅角落）
const getEdgePosition = (e) => {
    const CORNER_THRESHOLD = 0.85 // 角落检测阈值
    const rect = e.target.getBoundingClientRect()
    const xRatio = (e.clientX - rect.left) / rect.width
    const yRatio = (e.clientY - rect.top) / rect.height

    if (xRatio > CORNER_THRESHOLD && yRatio > CORNER_THRESHOLD) return 'bottom-right'
    if (xRatio < (1 - CORNER_THRESHOLD) && yRatio < (1 - CORNER_THRESHOLD)) return 'top-left'
    if (xRatio > CORNER_THRESHOLD && yRatio < (1 - CORNER_THRESHOLD)) return 'top-right'
    if (xRatio < (1 - CORNER_THRESHOLD) && yRatio > CORNER_THRESHOLD) return 'bottom-left'
    return ''
}

// 鼠标按下处理
const handleMouseDown = (event) => {
    const position = getEdgePosition(event)
    
    // 如果是角落则处理缩放
    if (position) {
            event.preventDefault()
            event.stopPropagation()
            
            cursorPosition.value = position
            startPos.value = { x: event.clientX, y: event.clientY }
            initialSize.value = {
            width: event.target.clientWidth,
            height: event.target.clientHeight
        }
        isResizing.value = true
    } else {
        // 非角落区域显示菜单
        showMenu.value = true
        menuPosition.value = {
            x: event.clientX,
            y: event.clientY
        }
    }
}

// 鼠标移动处理（仅缩放时生效）
const handleMouseMove = event => {
    if (!isResizing.value) return

    const container = resizableImg.value.closest('.ProseMirror');
    const style = window.getComputedStyle(container);
    const paddingLeft = parseFloat(style.paddingLeft) || 0;
    const paddingRight = parseFloat(style.paddingRight) || 0;
    const MAX_WIDTH = container.clientWidth - paddingLeft - paddingRight;

    const deltaX = event.clientX - startPos.value.x
    const factors = DIRECTION_FACTORS[cursorPosition.value]

    const newWidth = Math.max(
        Math.min(
            initialSize.value.width + deltaX * factors.x,
            MAX_WIDTH // 新增宽度上限
        ),
        MIN_SIZE
    )

    props.updateAttributes({
        width: newWidth === MAX_WIDTH? '100%': newWidth,
        height: '100%'
    })
}

// 鼠标释放处理
const handleMouseUp = () => {
    isResizing.value = false
    cursorPosition.value = ''
}

const CURSOR_MAP = {
    'bottom-right': 'se-resize',  // ↘
    'top-left': 'nw-resize',      // ↖
    'top-right': 'ne-resize',     // ↗
    'bottom-left': 'sw-resize',   // ↙
}

// 光标样式计算
const cursorStyle = computed(() => {
    // 优先显示拖拽中的光标
    if (cursorPosition.value) return getSystemCursor(cursorPosition.value)
    // 悬停状态光标
    if (hoverPosition.value) return getSystemCursor(hoverPosition.value)
    // 默认移动光标
    return 'move'
})

// 获取系统标准光标
const getSystemCursor = (position) => {
    return CURSOR_MAP[position] || 'auto'
}

// 新增悬停处理逻辑
const handleHoverMove = (e) => {
    if (isResizing.value) return // 调整时不更新悬停状态
    hoverPosition.value = getEdgePosition(e)
}

// 事件监听管理
onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mousemove', handleHoverMove)
})

onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
    window.removeEventListener('mousemove', handleHoverMove)
})
</script>

<template>
    <NodeViewWrapper
        @mousedown="handleMouseDown" 
        class="img-container" 
        :style="{ cursor: cursorStyle, 'display': node.attrs?.display, 'justifyContent': node.attrs?.justifyContent }"
    >
        <img ref="resizableImg" 
            :data-drag-handle="isDraggable"
            :draggable="isDraggable"
            v-bind="node.attrs"
        />
        <NodeViewContent />
    </NodeViewWrapper>
</template>

<style lang="scss" scoped>
.img-container {

    img {
        display: block;
        resize: both;
        outline: 3px solid transparent;
    }

    &.ProseMirror-selectednode img {
        border-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='%235468FF' d='M2.5 2.5h25v25h-25z'/%3E%3Cpath d='M0 0v12h2V2h10V0H0zM0 30V18h2v10h10v2H0zM30 0H18v2h10v10h2V0zM30 30H18v-2h10V18h2v12z' fill='%235468FF'/%3E%3C/svg%3E") 12 / 12px / 0;
    }
}

</style>