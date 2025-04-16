<script setup>
import ElImageI18n from './ElImageI18n.vue'
const props = defineProps(['height','pictures', 'motionBlur'])

</script>

<template>
    <el-carousel :motion-blur="props.motionBlur"  :height="props.height" indicator-position="outside" style="margin: 20px 0;">
        <el-carousel-item v-for="item in props.pictures" :key="item" :label="item.label">
            <ElImageI18n 
                :src="item.src" 
                :alt="item.name"
                :title="item.name"
                width="100%"
                height="100%"
                previewTeleported
                type="carousel"
            />
        </el-carousel-item>
    </el-carousel>
</template>

