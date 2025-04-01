<script>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'

export default {
    components: {
        NodeViewWrapper,
        NodeViewContent,
    },

    props: nodeViewProps,

    data() {
        return {
            languages: this.extension.options.lowlight.listLanguages(),
        }
    },

    computed: {
        selectedLanguage: {
            get() {
                return this.node.attrs.language
            },
            set(language) {
                this.updateAttributes({ language })
            },
        },
    },
}
</script>

<template>
    <node-view-wrapper class="code-block">
        <div class="code-top">
            <div class="code-title">
                <div class="red"></div>
                <div class="yellow"></div>
                <div class="green"></div>
            </div>
            <el-select class="code-select" 
                contenteditable="false" 
                v-model="selectedLanguage" 
                clearable 
                filterable 
                allow-create 
                placeholder="代码高亮或自定义文本"
            >
                <el-option popper-class="code-option" v-for="(language, index) in languages" :value="language" :key="index" :label="language" />
            </el-select>
        </div>
        <pre><code><node-view-content /></code></pre>
    </node-view-wrapper>
</template>

<style lang="scss">

.code-block {
    position: relative;

    .code-top {
        position: absolute;
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        box-sizing: border-box;

        .code-title {
            display: flex;
            .red {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #ff4646;
            }
            .yellow {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #e1b100;
                margin: 0 6px;
            }
            .green {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #00c538;
            }
        }

        .code-select {
            border-radius: 6px;
            width: 180px;
            background-color: rgba($color: #000000, $alpha: .1);

            .el-select__wrapper{
                background-color: rgba($color: #000000, $alpha: .1);
                box-shadow: 0 0 0 1px #2d2d2d inset;

                &.is-focused {
                    box-shadow: 0 0 0 1px var(--vp-c-accent) inset;
                    
                }

                .el-select__placeholder {
                    color: var(--el-text-color-regular);

                    &.is-transparent {
                        font-size: 12px;
                    }
                }
            }
        }
    }
}

.el-select-dropdown__item.is-selected{
    color: var(--vp-c-accent) !important;
}

</style>