<script setup>
import NotfoundIcon from '../icons/NotFound.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import GoBack404 from '../icons/GoBack404.vue'

const themeLocale = useThemeLocaleData()

const messages = themeLocale.value.notFound ?? 'Not Found'
const notFoundTitle = themeLocale.value.notFoundTitle ?? 'Not Found'
const goBackText = themeLocale.value.goBackText ?? 'Go Back'

const randomItem = ref("");
const router = useRouter()

function selectRandomItem() {
    const randomIndex = Math.floor(Math.random() * messages.length);
    randomItem.value = messages[randomIndex];
}

function goBack(){
    router.go(-1);
}

onMounted(() => {
    selectRandomItem();
});
</script>

<template>
    <div class="contain">
        <div class="text-contain">
            <NotfoundIcon class="icon" />
            <div class="text">{{ notFoundTitle }}</div>
            <div class="tip">{{ randomItem }}</div>
            <div class="back">
                <el-link type="primary" @click="goBack">
                    <el-icon :size="18" style="margin-right: 4px;"><GoBack404 /></el-icon>
                    {{ goBackText }}
                </el-link>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.contain {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .text-contain {

        width: 80%;

        .text {
            font-size: 24px;
            margin-bottom: 20px;
        }

        .tip {
            position: relative;
            margin-left: 20px;

            &::before {
                content: '';
                position: absolute;
                left: -20px;
                top: 0;
                width: 3px;
                height: 100%;
                background-color: rgb(157, 157, 157);
            }
        }

        .back {
            margin-top: 50px;
        }
    }
}

.el-link.el-link--primary {
    --el-link-text-color: var(--vp-c-accent);
    --el-link-hover-text-color: var(--vp-c-accent-hover);
    font-size: 16px;
}
</style>