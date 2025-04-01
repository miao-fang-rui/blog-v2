<script setup>
import { BubbleMenu } from '@tiptap/vue-3'
import MenuButton from './MenuButton.vue'
import {
    TableIcon,
    InsetTableLeft,
    InsetTableRight,
    DeleteColumn,
    AddRowBefore,
    AddRowAfter,
    DeleteRow,
    MergeCells,
    SplitCell,
    DeleteIcon
} from '../icons/icons'

import { ref, onMounted } from 'vue'

const { editor } = defineProps({
    editor: Object,
})

const tippyOptions = ref({ duration: 100 })

onMounted(() => {
    tippyOptions.value.appendTo = document.body // 仅在客户端设置
})

const maxRows = ref(8)
const maxCols = ref(8)
const selectedRows = ref(0)
const selectedCols = ref(0)

// 鼠标滑过处理
const handleHover = (row, col) => {
    selectedRows.value = row
    selectedCols.value = col
}

// 插入表格
const insertTable = () => {
    editor.chain().focus().insertTable({ rows: selectedRows.value, cols: selectedCols.value, withHeaderRow: true }).run()
    resetSelection()
}

// 重置选择状态
const resetSelection = () => {
    selectedRows.value = 0
    selectedCols.value = 0
}

const handleDropdownVisible = (visible) => {
    if (visible) {
        resetSelection() // 每次打开时重置选中状态
    }
}

const tableButtons = [
    {
        type: 'button', 
        tipContent: '向左插入一列', 
        handleClick: () => editor.chain().focus().addColumnBefore().run(),
        icon: InsetTableLeft 
    },
    {
        type: 'button', 
        tipContent: '向右插入一列', 
        handleClick: () => editor.chain().focus().addColumnAfter().run(),
        icon: InsetTableRight 
    },
    {
        type: 'button', 
        tipContent: '删除列', 
        handleClick: () => editor.chain().focus().deleteColumn().run(),
        icon: DeleteColumn 
    },
    { type: 'divider', direction: 'vertical' },
    {
        type: 'button', 
        tipContent: '向上面添加一行', 
        handleClick: () => editor.chain().focus().addRowBefore().run(),
        icon: AddRowBefore 
    },
    {
        type: 'button', 
        tipContent: '向下面添加一行', 
        handleClick: () => editor.chain().focus().addRowAfter().run(),
        icon: AddRowAfter 
    },
    {
        type: 'button', 
        tipContent: '删除行', 
        handleClick: () => editor.chain().focus().deleteRow().run(),
        icon: DeleteRow 
    },
    { type: 'divider', direction: 'vertical' },
    {
        type: 'button', 
        tipContent: '合并单元格', 
        handleClick: () => editor.chain().focus().mergeCells().run(),
        icon: MergeCells 
    },
    {
        type: 'button', 
        tipContent: '分割单元格', 
        handleClick: () => editor.chain().focus().splitCell().run(),
        icon: SplitCell 
    },
    { type: 'divider', direction: 'vertical' },
    {
        type: 'button', 
        tipContent: '删除表格', 
        handleClick: () => editor.chain().focus().deleteTable().run(),
        icon: DeleteIcon 
    },
]
const isMergeColspan = ref(false)
const isMergeRowspan = ref(false)

const shouldShow = () => {
    
    if (!editor.isActive('table')) return false
    if (editor.isActive('link')) return false
    if (editor.isActive('ResizableImage')) return false

    const { from, to } = editor.state.selection

    const cellAttr = editor.getAttributes('tableCell')
    const headerAttr = editor.getAttributes('tableHeader')

    isMergeColspan.value = cellAttr.colspan > 1 || headerAttr.colspan > 1
    isMergeRowspan.value = cellAttr.rowspan > 1 || headerAttr.rowspan > 1

    if(from === to) {
        return !(isMergeColspan.value === false && isMergeRowspan.value === false)
    }

    return true
}

</script>

<template>
    <div>
        <el-dropdown class="table-dropdown" @visible-change="handleDropdownVisible">
            <span class="table-dropdown-link">
                <el-icon size="18">
                    <TableIcon />
                </el-icon>
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu class="table-dropdown-menu">
                    <el-dropdown-item>
                        <div class="grid-size-tip">
                            插入表格：{{ selectedRows }} x {{ selectedCols }}
                        </div>
                    </el-dropdown-item>

                    <el-dropdown-item>
                        <div class="grid-container">
                            <div v-for="row in maxRows" :key="'row-' + row" class="grid-row">
                                <div 
                                    v-for="col in maxCols" 
                                    :key="'cell-'+ col" 
                                    class="grid-cell"
                                    :class="{ 
                                        'active': row <= selectedRows && col <= selectedCols,
                                        'pre-reset': selectedRows === 0 // 添加重置标记类
                                    }"
                                    @mouseover="handleHover(row, col)" @click="insertTable"
                                >
                                </div>
                            </div>
                        </div>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <bubble-menu :shouldShow="shouldShow" :editor="editor" :tippy-options="tippyOptions" v-if="editor">
            <div class="table-buttons-cotainer">
                <template v-for="(button, index) in tableButtons" :key="index">
                    <MenuButton 
                        v-if="button.type === 'button'"
                        tipPlacement="top"
                        :tipContent="button.tipContent" 
                        :editor="editor"
                        :disabled="button.disabled ? button.disabled() : false" 
                        @handleClick="button.handleClick"
                    >
                        <template #icon>
                            <component :is="button.icon"></component>
                        </template>
                    </MenuButton>
                    <el-divider v-if="button.type === 'divider'" :direction="button.direction" />
                </template>
            </div>
        </bubble-menu>
    </div>
</template>

<style lang="scss">
.table-buttons-cotainer{
    background-color: white;
    box-shadow: 0 0 6px 2px rgba($color: #000000, $alpha: .1);
    padding: 6px;
    justify-content: center;
    align-items: center;
    display: flex;
    border: 1px solid #eaeaea;
    width: 100%;
}


.table-dropdown {
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

    .table-dropdown-link {
        outline: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.table-dropdown-menu {
    padding: 10px;

    .el-dropdown-menu__item {
        padding: 0;

        &:hover {
            background-color: transparent;
        }
    }

    .grid-size-tip {
        margin: 10px;
        font-size: 14px;
        color: #666;
    }

    .grid-container {
        display: grid;
        grid-template-rows: repeat(8, 20px);
        grid-template-columns: repeat(8, 20px);
        gap: 3px;

        .grid-row {
            display: contents;

            .grid-cell {
                width: 20px;
                height: 20px;
                border: 1px solid #ddd;
                transition: background 0.2s;

                &.active {
                    background: var(--vp-c-accent); 
                    border-color: #1976D2;
                }
                
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
}

[data-theme='dark'] {
    .table-dropdown {
        &:hover {
            background-color: #1f2d3d;
        }
    }

    .table-dropdown-menu {
        background-color: var(--vp-c-bg-dark);

        .grid-cell {
            border-color: #333;
        }
    }

    .table-buttons-cotainer{
        background-color: var(--vp-c-bg);
        box-shadow: 0 0 6px 2px rgba($color: #000000, $alpha: .1);
        border: 1px solid #333;
    }

    .divider {
        border-color: #333;
    }
}

</style>