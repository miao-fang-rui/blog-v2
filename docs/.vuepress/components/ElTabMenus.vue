<script setup>

const { articles } = defineProps(['articles'])
const activeName = defineModel('activeName')

</script>

<template>
    <el-tabs tab-position="top" v-model="activeName" class="tabs">
        <el-tab-pane v-for="item in articles" :key="item.title" :label="item.title" :name="item.name">
            <div class="article-container">
                <a v-for="(article, index) in item.article" :key="index" :href="article.link" class="link">
                    <span class="node">{{ index + 1 }}</span>
                    <span class="article-name">{{ `${article.name}` }}</span>
                </a>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<style lang="scss" scoped>

.tabs {
    margin-top: 20px;
    padding: 20px;
    // background-color: color-mix(in srgb, var(--vp-c-accent) 4%, transparent);
    border-radius: 5px;
    border: 1px solid var(--vp-c-gutter);
    box-shadow: transparent;
    transition: all 0.3s ease;

    &:hover {
        box-shadow: var(--el-box-shadow-light);
    }
}

.article-container {
    padding: 10px 0;

    .node {
        background-color: var(--vp-c-accent);
        color: white;
        padding: 0px 7px;
        border-radius: 2px;
        margin-right: 10px;
    }

    .link {
        text-decoration: none;
        color: var(--vp-c-text);
        padding: 10px;
        display: block;
        margin: 0px 16px;
        font-size: 14px;

        &:hover {
            color: var(--vp-c-accent);
            cursor: pointer;
        }

    }
}
</style>
