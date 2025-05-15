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
            options: [
                {
                    value: 'tip',
                    label: '提示',
                },
                {
                    value: 'warning',
                    label: '警告',
                },
                {
                    value: 'danger',
                    label: '危险',
                },
                {
                    value: 'info',
                    label: '消息',
                },
                {
                    value: 'important',
                    label: '重要',
                },
                {
                    value: 'note',
                    label: '备注',
                },
            ],
        }
    },
    computed: {
        selectTipType: {
            get() {
                return this.node.attrs.tipType
            },
            set(tipType) {
                this.updateAttributes({ tipType })
            },
        },
        inputTipContent: {
            get() {
                return this.node.attrs.tipContent
            },
            set(tipContent) {
                this.updateAttributes( { tipContent })
            },
        },
    },
    methods:{
        getBackgroundColor() {
            switch(this.selectTipType) {
                case 'tip': return 'rgb(224.6, 242.8, 215.6)';
                case 'warning': return 'rgb(250, 236.4, 216)';
                case 'danger': return 'rgb(253, 225.6, 225.6)';
                case 'important': return '#d9dcff';
                case 'info': return 'rgb(216.8, 235.6, 255)';
                case 'note': return '#eaeaea';
                default: return '#dfdfdf';
            }
        }
    },
}
</script>

<template>
    <node-view-wrapper class="tip-component" :style="{backgroundColor: getBackgroundColor()}">
        <div class="tip-text">
            <div class="tip-select-container">
                <el-row :gutter="4">
                    <el-col :span="6">
                        <el-select v-model="selectTipType">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-col>
                    <el-col :span="18">
                        <el-input v-model="inputTipContent" placeholder="输入标题内容" clearable />
                    </el-col>
                </el-row>
            </div>
            <!-- <div class="tip-icon-contarner">
                <div class="red"></div>
                <div class="yellow"></div>
                <div class="green"></div>
            </div> -->
        </div>
        <node-view-content class="tip-content" />
    </node-view-wrapper>
</template>

<style lang="scss">

.tip-component {
    padding: 10px;
    margin: 10px 0;
    border-radius: 6px;
    box-shadow: 6px 6px 5px 1px #f5f5f5;
    color: rgb(88, 88, 88);
    border: 1px solid #989898;

    .tip-content {
        padding: 10px 10px 0 10px;
        font-size: 14px;
    }

    .tip-text {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;

        .tip-icon-contarner {
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

        .tip-select-container {
            width: 300px;

            .el-input__wrapper{
                background-color: transparent;
                box-shadow: none;
                
                .el-input__inner{
                    font-weight: 800;
                    color: black;
                }
            }

            .el-select__wrapper{
                background-color: transparent;
                box-shadow: none;
                

                .el-select__placeholder{
                    font-weight: 800;
                    color: black;
                }
            }
        }
    }
}

[data-theme='dark'] {

    .tip-component {
        box-shadow: none;
    }
}
</style>