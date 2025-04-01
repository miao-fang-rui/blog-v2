<script setup>

import { ref } from 'vue';
const { editor } = defineProps({
    editor: Object,
})

const headings = ref()

editor.on('transaction', ({ editor, transaction }) => {
    headings.value = editor.$nodes('heading')
})
</script>

<template>
    <div class="navigat-container">
        <div class="title">目录导航</div>
        <el-scrollbar class="navigats">
            <div class="navigats-level" v-if="editor">
                <template  v-for="(head, index) in headings" :key="index" >
                    <div v-if="head.element.nodeName === 'H1'" class="level-1"><a href="#">{{ head.textContent }}</a></div>
                    <div v-if="head.element.nodeName === 'H2'" class="level-2"><a href="#">{{ head.textContent }}</a></div>
                    <div v-if="head.element.nodeName === 'H3'" class="level-3"><a href="#">{{ head.textContent }}</a></div>
                    <div v-if="head.element.nodeName === 'H4'" class="level-4"><a href="#">{{ head.textContent }}</a></div>
                    <div v-if="head.element.nodeName === 'H5'" class="level-5"><a href="#">{{ head.textContent }}</a></div>
                    <div v-if="head.element.nodeName === 'H6'" class="level-6"><a href="#">{{ head.textContent }}</a></div>
                </template>
            </div>
        </el-scrollbar>
        
        <div class="info">
            <span class="count">全文：{{ editor.storage.characterCount.characters() }} 字</span>
        </div>
        
    </div>
</template>

<style lang="scss" scoped>

.navigat-container {
    height: 100%;
    // position: relative;

    .title{
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
        // background-color: #eee;
        box-shadow: 0 0 2px 0 rgba($color: #000000, $alpha: .2);
        width: 100%;
        font-weight: bold;
        font-size: 18px;
        color: var(--vp-c-text);
        box-sizing: border-box;
    }

    .info {
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        box-sizing: border-box;
        width: 100%;
        overflow: hidden;
        // background-color: #eee;
        box-shadow: 0 0 2px 0 rgba($color: #000000, $alpha: .2);

        .count {
            font-size: 13px;
            font-weight: bold;
        }
    }

    .navigats{
        height: calc(100% - 90px);

        .navigats-level {
            margin: 20px 10px;
            height: calc(100% - 160px);
            box-sizing: border-box;

            .level-1, .level-2, .level-3, .level-4, .level-5, .level-6 {
                position: relative;
                margin: 10px 0;

                &::after {
                    position: absolute;
                    right: 0px;
                    color: #c4c4c4;
                    font-size: 12px;
                    display: none;
                }

                &:hover::after {
                    display: inline-block;
                }
            }

            .level-1 {
                padding-left: 0;
                position: relative;
                &::after {
                    content: '一级';
                }
            }

            .level-2 {
                padding-left: 20px;

                &::after {
                    content: '二级';
                }
            }

            .level-3 {
                padding-left: 40px;
                &::after {

                    content: '三级';
                }
            }

            .level-4 {
                padding-left: 60px;

                &::after {
                    content: '四级';
                }
            }

            .level-5 {
                padding-left: 80px;

                &::after {
                    content: '五级';
                }
            }

            .level-6 {
                padding-left: 100px;

                &::after {
                    content: '六级';
                }
            }

            a {
                color: var(--vp-c-text);
                font-size: 13px;

                &:hover {
                    color: #5e71ff;
                }
            }

        }
    }
}

</style>