<script setup>
import { ref, watch, onUnmounted, onMounted, toRaw } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { useEditor, EditorContent, VueNodeViewRenderer } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import Placeholder from '@tiptap/extension-placeholder'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import FontSize from '../extension/fontSize'
import TabExtension from '../extension/tab'
import FontFamily from '@tiptap/extension-font-family'
import Link from '@tiptap/extension-link'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import CodeBlockComponent from './CodeBlockComponent.vue'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { all, createLowlight } from 'lowlight'
import Tip from '../extension/tip'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import ResizableImage from '../extension/image'
import MarkdownOutputExtension from '../extension/makedown'
import CharacterCount from '@tiptap/extension-character-count'
import GoBack404 from '../icons/GoBack404.vue'
import { useRouter } from 'vue-router'
import Sidebar from '../icons/Sidebar.vue'

import Menubar from './Menubar.vue'
import Navigat from './Navigat.vue'

const router = useRouter()
const lowlight = createLowlight(all)
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

const header = ref(null)
const aside = ref(null)
const headerHeight = ref(0)
const content = ref("")
const isShowNavigit = ref(true)

useResizeObserver(header, (entries) => {
    const entry = entries[0]
    headerHeight.value = entry.target.offsetHeight
})

watch(headerHeight, (newVal) => {
    if (aside.value) {
        aside.value.$el.style.height = `calc(100vh - ${newVal}px)`
        aside.value.$el.style.top = `${newVal}px`
    }
})

const editor = useEditor({
    content: "",
    autofocus: true,
    extensions: [
        StarterKit.configure({ codeBlock: false, }),
        Underline,
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
        Highlight.configure({ multicolor: true }),
        TaskList,
        TaskItem.configure({ nested: true, }),
        Superscript,
        Subscript,
        Placeholder.configure({ placeholder: '文章内容. . .', }),
        TextStyle,
        Color,
        FontSize,
        TabExtension,
        FontFamily,
        CodeBlockLowlight.extend({
            TabExtension,
            addNodeView() {
                return VueNodeViewRenderer(CodeBlockComponent)
            },
        }).configure({ lowlight }),
        Link.configure({
            openOnClick: false,
            defaultProtocol: 'https',
        }),
        Tip,
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
        ResizableImage.configure({ inline: true, allowBase64: true, HTMLAttributes: { class: 'custom-image' } }),
        MarkdownOutputExtension,
        CharacterCount
    ],
    onUpdate: () => {
        content.value = editor.value.getJSON()
        console.log(content.value)

        // 打开数据库
        var request = indexedDB.open('DocsDB', 1);

        request.onupgradeneeded = function(event) {
            var db = event.target.result;
            // 创建仅首次或版本更新时执行
            if (!db.objectStoreNames.contains('docs')) {
                db.createObjectStore('docs', { 
                    // keyPath: 'docsId',
                    autoIncrement: false // 使用自动生成的ID
                });
            }
        };

        request.onsuccess = function(event) {
            var db = event.target.result;
            
            // 开启事务存储数据
            var transaction = db.transaction(['docs'], 'readwrite');
            var objectStore = transaction.objectStore('docs');
            
            // 添加数据
            const key = 'docsId'
            const checkKey = objectStore.getKey(key)

            checkKey.onsuccess = () => {
                if(checkKey.result === undefined){
                    objectStore.add(toRaw(content.value), key)
                }else{
                    objectStore.put(toRaw(content.value), key)
                }
            }

            transaction.oncomplete = () => {
                console.log('Docs stored successfully');
            };

            transaction.onerror = (event) => {
                console.error('Transaction error:', event.target.error);
            };
        };

        request.onerror = function(event) {
            console.error('Database open error:', event.target.error);
        };

        // localStorage.setItem('blog-content', JSON.stringify(content.value))
    },
    onTransaction({ editor, transaction }) {
    },
    onPaste(event, slice) {
    },
    editorProps: {
        transformPastedHTML(html) {
            // 去除内联样式（如 style="color: red;"）
            const cleanedHTML = html.replace(/style="[^"]*"/g, '');
            // 可选：过滤特定标签（如 font、span 等）
            return cleanedHTML.replace(/<\/?(font|span)[^>]*>/g, '');
        }
    }
})


function goBack() {
    router.go(-1);
}

const handleSide = () => {
    isShowNavigit.value = !isShowNavigit.value
}

onMounted(() => {
    if (editor.value) {

        var request = indexedDB.open('DocsDB', 1);

        request.onupgradeneeded = function(event) {
            var db = event.target.result;
            // 创建仅首次或版本更新时执行
            if (!db.objectStoreNames.contains('docs')) {
                db.createObjectStore('docs', { 
                    // keyPath: 'docsId',
                    autoIncrement: false // 使用自动生成的ID
                });
            }
        };

        request.onsuccess = function(event) {
            var db = event.target.result;
            
            // 开启事务存储数据
            var transaction = db.transaction(['docs'], 'readonly');
            var objectStore = transaction.objectStore('docs');
            
            // 添加数据
            // objectStore.add(toRaw(content.value));
            const key = 'docsId'
            const checkKey = objectStore.getKey(key)

            checkKey.onsuccess = () => {
                if(checkKey.result !== undefined){ 
                    const request = objectStore.get(key)

                    request.onsuccess = (e) => {
                        const data = e.target.result; // 获取到匹配键名的数据
                        if (data) {
                            console.log('数据:', data);
                            editor.value.commands.setContent(data)
                        } else {
                            console.warn('键名不存在');
                        }
                    };
                    request.onerror = (e) => {
                        console.error('查询失败:', e.target.error);
                    };
                    
                }
            }

            transaction.oncomplete = () => {
                console.log('Docs stored successfully');
            };

            transaction.onerror = (event) => {
                console.error('Transaction error:', event.target.error);
            };
        };

        request.onerror = function(event) {
            console.error('Database open error:', event.target.error);
        };

    }
})

onUnmounted(() => {
    editor.value.destroy()
})
</script>

<template>
    <ClientOnly>
        <el-container class="common-layout">
            <el-header ref="header" class="header no-print"><Menubar :editor="editor" /></el-header>
            <el-container class="editor-container">
                <el-aside v-show="isShowNavigit" width="260px" class="aside hidden-sm-and-down no-print" ref="aside">
                    <Navigat :editor="editor" />
                </el-aside>
                <el-main class="main">
                    <editor-content :editor="editor" class="editor"/>
                </el-main>
            </el-container>
            <div class="right-btn no-print">
                <div class="go-back">
                    <el-tooltip :content="isShowNavigit? '隐藏导航栏': '显示导航栏'" placement="left" :show-after="200">
                        <el-button class="more-btn" text bg circle @click="handleSide"><el-icon :size="20">
                            <Sidebar />
                        </el-icon></el-button>
                    </el-tooltip>
                </div>
                <div class="hide-side">
                    <el-tooltip content="返回上一页" placement="left" :show-after="200">
                        <el-button class="more-btn" text bg circle @click="goBack"><el-icon :size="20">
                            <GoBack404 />
                        </el-icon></el-button>
                    </el-tooltip>
                </div>
            </div>
        </el-container>
       
    </ClientOnly>
</template>

<style lang="scss" scoped>

@media print {

    body * {
        visibility: hidden;
    }

    .no-print {
        visibility: hidden;
        display: none !important;
        border: none !important;
        margin: 0 !important;
        padding: 0 !important;
    }

    :deep(.tiptap) * {
        visibility: visible;
    }

    :deep(.tiptap) {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        border: none !important;
        margin: 0 !important;
        padding: 0 !important;

        h1::before, 
        h2::before,
        h3::before,
        h4::before, 
        h5::before,
        h6::before {
            display: none;
        }
    }
}

.common-layout {
    position: relative;

    .header {
        background-color: var(--vp-c-bg);
        border-bottom: 1px solid var(--vp-c-border);
        box-sizing: border-box;
        position: sticky;
        top: 0;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: center;
        height: auto;
        min-height: 50px;
        padding: 10px;
        box-shadow: 0 0 10px 3px rgba(0, 0, 0, .1);
    }

    .editor-container{
        background-color: var(--vp-c-gutter);

        .aside {
            border-right: 1px solid var(--vp-c-border);
            box-sizing: border-box;
            height: calc(100vh - 50px);
            position: sticky;
            top: 50px;
        }

        .main {
            padding: 60px;
            .editor {
                margin: auto;
            }
        }
    }

    .right-btn {
        position: fixed;
        bottom: 124px;
        right: 16px;
        display: flex;
        flex-direction: column;

        .hide-side {
            margin-top: 10px;
        }

        .more-btn {
            padding: 24px;
            background-color: var(--vp-c-bg-alt) !important;
            border: 1px solid var(--vp-c-border);

            &:hover {
                background-color: var(--vp-c-gutter) !important;
                cursor: pointer;
            }

            &:active {
                background-color: var(--vp-c-bg-alt) !important;
            }
        }
    }
}

:deep(.tiptap){
    background-color: var(--vp-c-bg);
    box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--vp-c-border);
    min-height: 1024px;
    outline: none;
    padding: 80px;
    box-sizing: border-box;

    :first-child {
        margin-top: 0;
    }

    img {
        display: block;
        // height: auto;
        max-width: 100%;
        padding: 4px;

        &.ProseMirror-selectednode {
            outline: 1px solid var(--vp-c-accent);
        }
    }

    table {
        display: table;
        border-collapse: collapse;
        margin: 0;
        overflow: hidden;
        table-layout: fixed;
        width: 100%;
        border-radius: 3px;

        td,
        th {
            border: 1px solid var(--vp-c-grey-hover);
            box-sizing: border-box;
            min-width: 1em;
            padding: 6px 8px;
            position: relative;
            vertical-align: top;

            > * {
                margin-bottom: 0;
            }
        }

        th {
            background-color: rgba(61, 37, 20, .05);
            font-weight: bold;
            text-align: left;
        }

        .selectedCell:after {
            background: rgba(105, 105, 105, 0.3);
            content: "";
            left: 0; right: 0; top: 0; bottom: 0;
            pointer-events: none;
            position: absolute;
            z-index: 2;
        }

        .column-resize-handle {
            background-color: var(--vp-c-accent);
            bottom: -2px;
            pointer-events: none;
            position: absolute;
            right: -2px;
            top: 0;
            width: 2px;
        }
    }

    .tableWrapper {
        margin: 1.5rem 0;
        overflow-x: auto;
        width: 100%;
    }

    &.resize-cursor {
        cursor: ew-resize;
        cursor: col-resize;
    }

    a {
        color: var(--vp-c-accent);
        border-bottom: 1px solid var(--vp-c-accent);
        font-style: italic;
        cursor: pointer;

        &:hover {
            color: var(--vp-c-accent-hover);
        }
    }


    /* Placeholder (at the top) */
    p.is-editor-empty:first-child::before {
        color: #d7d7d7;
        content: attr(data-placeholder);
        float: left;
        height: 0;
        pointer-events: none;
    }

    h1::before, h2::before, h3::before, h4::before, h5::before, h6::before {
        position: absolute;
        left: 58px;
        color: var(--vp-c-border);
        font-size: 14px;
    }
    h1:hover::before {
        content: 'H1';
    }

    h2:hover::before {
        content: 'H2';
    }

    h3:hover::before {
        content: 'H3';
    }

    h4:hover::before {
        content: 'H4';
    }

    h5:hover::before {
        content: 'H5';
    }

    h6:hover::before {
        content: 'H6';
    }

    /* Task list specific styles */
    ul[data-type="taskList"] {
        list-style: none;
        margin-left: 0;
        padding: 0;

        li {
            align-items: flex-start;
            display: flex;

            >label {
                flex: 0 0 auto;
                margin-right: 0.5rem;
                user-select: none;
            }

            >div {
                flex: 1 1 auto;

                >p {
                    margin: 0;
                }
            }
        }

        input[type="checkbox"] {
            cursor: pointer;
        }

        ul[data-type="taskList"] {
            margin: 0;
        }
    }

    code {
        background-color: #cad2ff;
        border-radius: 0.2rem;
        color: var(--vp-c-accent);
        padding: 0.25em 0.3em;
        margin: 0 3px;
    }

    pre {
        background: #292f40;
        border-radius: 6px;
        color: #FFF;
        font-family: 'JetBrainsMono', monospace;
        padding: 20px 20px 0 20px;
        overflow: auto !important;
        box-shadow: 4px 4px 20px 0px rgba(0, 0, 0, 0.5);

        code {
            background: none;
            color: inherit;
            font-size: 14px;
            line-height: 30px;
            overflow-x: auto;
            width: 100%;
            word-wrap: none;
            word-break: break-all;
        }

        /* Code styling */
        .hljs-comment,
        .hljs-quote {
            color: #939393;
        }

        .hljs-variable,
        .hljs-template-variable,
        .hljs-attribute,
        .hljs-tag,
        .hljs-name,
        .hljs-regexp,
        .hljs-link,
        .hljs-name,
        .hljs-selector-id,
        .hljs-selector-class {
            color: #f98181;
        }

        .hljs-number,
        .hljs-meta,
        .hljs-built_in,
        .hljs-builtin-name,
        .hljs-literal,
        .hljs-type,
        .hljs-params {
            color: #fbbc88;
        }

        .hljs-string,
        .hljs-symbol,
        .hljs-bullet {
            color: #b9f18d;
        }

        .hljs-title,
        .hljs-section {
            color: #faf594;
        }

        .hljs-keyword,
        .hljs-selector-tag {
            color: #70cff8;
        }

        .hljs-emphasis {
            font-style: italic;
        }

        .hljs-strong {
            font-weight: 700;
        }
    }
}

@media screen and (max-width: 576px) {
    .main {
        padding: 10px !important;

        :deep(.tiptap ){
            padding: 60px 40px !important;

            h1::before, h2::before, h3::before, h4::before, h5::before, h6::before {
                left: 20px;
            }
        }
    }
    .common-layout {
        .right-btn {
            bottom: 116px;
            .more-btn {
                padding: 20px !important;
            }
        }
    }
}

@media screen and (min-width: 576px) and (max-width: 768px) {
    .main {
        padding: 40px !important;
    }
    .common-layout {
        .right-btn {
            bottom: 116px;
            .more-btn {
                padding: 20px !important;
            }
        }
    }
}

@media screen and (min-width: 768px) and (max-width: 960px) {
    .main {
        padding: 40px !important;
    }
    .common-layout {
        .right-btn {
            bottom: 116px;
            .more-btn {
                padding: 20px !important;
            }
        }
    }
}

@media screen and (min-width: 960px) and (max-width: 1200px) {
    .main {
        padding: 60px !important;
        .editor {
            width: 800px !important;
        }
    }
}

@media screen and (min-width: 1200px) {
    .main {
        padding: 60px !important;
        .editor {
            width: 800px !important;
        }
    }
}

</style>

<style lang="scss">
[data-theme='dark'] {
    .tiptap {
        p.is-editor-empty:first-child::before {
            color: #343434;
        }
    }
}
</style>