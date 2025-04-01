<script setup>
import { reactive, ref, nextTick } from 'vue'
import MenuButton from './MenuButton.vue'
import { BubbleMenu } from '@tiptap/vue-3'
import { ElMessage } from 'element-plus'
import { 
    ImageIcon, 
    LeftTextAlign, 
    RightTextAlign, 
    CenterTextAlign, 
    JustifyTextAlign, 
    CustomWidthIcon, 
    BlockIcon, 
    inlineBlockIcon, 
    DeleteIcon 
} from '../icons/icons'


const { editor } = defineProps({
    editor: Object
})

const fileList = ref([])
const dialogSetImageVisible = ref(false)
const form = reactive({
    width: 0,
    height: 0,
})

// const uploadImg = async(uploadFile) => {
    
    // const reader = new FileReader();

    // reader.onload = (e) => {
        
    //     const base64String = e.target.result;

    //     editor.chain().focus().setImage({
    //         src: base64String,
    //         alt: uploadFile.name,
    //         title: uploadFile.name,
    //     }).run()
    // }
    // reader.readAsDataURL(uploadFile.raw);
// }

const uploadImg = async (uploadFile) => {
    // 读取文件为Base64
    const reader = new FileReader();
    
    reader.onload = (e) => {
        const base64String = e.target.result;

        // 打开数据库
        var request = indexedDB.open('BlobImageDB', 1);

        request.onupgradeneeded = function(event) {
            var db = event.target.result;
            // 创建图片存储表（仅首次或版本更新时执行）
            if (!db.objectStoreNames.contains('images')) {
                var objectStore = db.createObjectStore('images', { 
                    keyPath: 'id',
                    autoIncrement: true // 使用自动生成的ID
                });
                objectStore.createIndex('name', 'name', { unique: false });
            }
        };

        request.onsuccess = function(event) {
            var db = event.target.result;
            
            // 开启事务存储图片数据
            var transaction = db.transaction(['images'], 'readwrite');
            var objectStore = transaction.objectStore('images');
            
            // 构造要存储的数据对象
            const imageData = {
                name: uploadFile.name,
                src: base64String,
                uploadedAt: new Date()
            };

            // 添加数据
            objectStore.add(imageData);

            transaction.oncomplete = () => {
                console.log('Image stored successfully');
                // 插入编辑器（成功后执行）
                editor.chain().focus().setImage({
                src: base64String,
                alt: uploadFile.name,
                title: uploadFile.name,
                }).run();
            };

            transaction.onerror = (event) => {
                console.error('Transaction error:', event.target.error);
            };
        };

        request.onerror = function(event) {
            console.error('Database open error:', event.target.error);
        };
    };

    // 读取文件内容（原始文件在uploadFile.raw中）
    reader.readAsDataURL(uploadFile.raw);
};


const imageButtons = [
    {
        type: 'button', 
        tipContent: '居左', 
        isActiveClass: () => editor.isActive('ResizableImage', { justifyContent: 'left' }), 
        handleClick: () => editor.commands.updateAttributes('ResizableImage', { justifyContent: 'left' }),
        icon: LeftTextAlign 
    },
    {
        type: 'button', 
        tipContent: '居中', 
        isActiveClass: () => editor.isActive('ResizableImage', { justifyContent: 'center' }), 
        handleClick: () => editor.commands.updateAttributes('ResizableImage', { justifyContent: 'center' }),
        icon: CenterTextAlign 
    },
    {
        type: 'button', 
        tipContent: '居右', 
        isActiveClass: () => editor.isActive('ResizableImage', { justifyContent: 'right' }), 
        handleClick: () => editor.commands.updateAttributes('ResizableImage', { justifyContent: 'right' }),
        icon: RightTextAlign 
    },
    { type: 'divider', direction: 'vertical' },
    {
        type: 'button', 
        tipContent: '宽度100%',
        isActiveClass: () => editor.isActive('ResizableImage', { width: '100%' }),  
        handleClick: () => editor.commands.updateAttributes('ResizableImage', { width: '100%' }),
        icon: JustifyTextAlign 
    },
    {
        type: 'button', 
        tipContent: '自定义图片尺寸', 
        handleClick: () => handleCustomWith(),
        icon: CustomWidthIcon 
    },
    { type: 'divider', direction: 'vertical' },
    {
        type: 'button', 
        tipContent: '块-block', 
        isActiveClass: () => editor.isActive('ResizableImage', { display: 'flex' }), 
        handleClick: () => editor.commands.updateAttributes('ResizableImage', { display: 'flex' }),
        icon: BlockIcon 
    },
    {
        type: 'button', 
        tipContent: '内联-inline', 
        isActiveClass: () => editor.isActive('ResizableImage', { display: 'inline-block' }), 
        handleClick: () => editor.commands.updateAttributes('ResizableImage', { display: 'inline-block' }),
        icon: inlineBlockIcon 
    },
    { type: 'divider', direction: 'vertical' },
    {
        type: 'button', 
        tipContent: '删除', 
        handleClick: () => editor.chain().focus().deleteSelection().run(),
        icon: DeleteIcon 
    }
]



const handleCustomWith = () => {
    form.width = editor.getAttributes('ResizableImage').width || '100%'
    form.height = editor.getAttributes('ResizableImage').height || '100%'
    dialogSetImageVisible.value = true
}

// 统一校验函数
const validateDimension = (value) => {
  // 允许数字类型或'100%'字符串
  if (typeof Number(value) === 'number' && !isNaN(value)) return true;
  if (typeof value === 'string' && value === '100%') return true;
  return false;
};

const handleSetImageSize = () => {
    nextTick(() => {
    // 更安全的容器选择方式
    const container = editor.options.element.querySelector('.ProseMirror')
    
    if (!container) {
        console.error('容器元素未找到')
        return
    }
    
    if(!form.width || !form.height) return ElMessage({ message: '请输入正确的尺寸！', type: 'warning' })

    if (!validateDimension(form.width) || !validateDimension(form.height)) return ElMessage({ message: '请输入正确的尺寸！', type: 'warning' })

    // 获取完整的布局计算值
    const { 
        paddingLeft,
        paddingRight,
        marginLeft,
        marginRight,
        borderLeftWidth,
        borderRightWidth,
        boxSizing 
    } = window.getComputedStyle(container)

    // 单位转换方法
    const parseValue = value => parseFloat(value) || 0

    // 计算所有影响宽度的因素
    const containerInsets = {
        padding: parseValue(paddingLeft) + parseValue(paddingRight),
        margin: parseValue(marginLeft) + parseValue(marginRight),
        border: parseValue(borderLeftWidth) + parseValue(borderRightWidth)
    }

    // 获取三种宽度基准值
    const widthMetrics = {
        client: container.clientWidth,      // 可视区域宽度
        offset: container.offsetWidth,      // 包含边框的宽度
        scroll: container.scrollWidth       // 内容实际宽度
    }

    // 智能计算可用宽度
    let maxWidth
    if (boxSizing === 'border-box') {
        maxWidth = widthMetrics.client - containerInsets.padding
    } else {
         maxWidth = widthMetrics.client - containerInsets.padding
    }

    if(form.width > maxWidth){
        form.width = '100%'
    }

    if(form.width < 10 || form.height < 10) return ElMessage({ message: '尺寸太小，请重新输入！', type: 'warning' })

    if(form.width !== editor.getAttributes('ResizableImage').width) editor.commands.updateAttributes('ResizableImage', { width: form.width })
    if(form.height !== editor.getAttributes('ResizableImage').height) editor.commands.updateAttributes('ResizableImage', { height: form.height })
    dialogSetImageVisible.value = false

})

    
}
</script>

<template>
    <div>
        <el-upload 
            v-model:file-list="fileList" 
            ref="uploadRef" 
            action="#" 
            :auto-upload="false" 
            :on-change="uploadImg"
            class="image-upload"
        >
            <MenuButton 
                class="image-button"
                tipContent="插入图片" 
                :editor="editor"
            >
                <template #icon>
                    <ImageIcon />
                </template>
            </MenuButton>
        </el-upload>
        <bubble-menu :shouldShow="() => editor.isActive('ResizableImage')" :editor="editor" :tippy-options="{ duration: 100 }" v-if="editor">
            <div class="table-buttons-cotainer">
                <template v-for="(button, index) in imageButtons" :key="index">
                    <MenuButton 
                        v-if="button.type === 'button'"
                        tipPlacement="top"
                        :tipContent="button.tipContent" 
                        :editor="editor"
                        :disabled="button.disabled ? button.disabled() : false" 
                        :isActiveClass="{ 'is-active': button.isActiveClass ? button.isActiveClass() : false }"
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
        <el-dialog
            v-model="dialogSetImageVisible"
            title="自定义图片尺寸"
            width="500"
            class="set-image-dialog"
            draggable
            append-to-body
        >
                <el-row class="set-image-body" :gutter="40">
                    <el-col :span="12" class="body-item"><div class="body-text">宽</div><el-input v-model="form.width" /></el-col>
                    <el-col :span="12" class="body-item"><div class="body-text">高</div><el-input v-model="form.height" /></el-col>
                </el-row>
            <template #footer>
                <div class="dialog-footer">
                    <el-button color="#5a72fe" type="primary" @click="handleSetImageSize">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>

:deep(.image-upload) {

    .el-upload-list--text {
        display: none;
    }

}

.set-image-body{
    display: flex;
    justify-content: center;
    align-items: center;

    .body-item{
        display: flex;
        justify-content: center;
        align-items: center;

        .body-text{
            margin-right: 10px;
        }
    }
}
</style>

<style lang="scss">
.set-image-dialog {
    .el-dialog__body {
        padding: 20px 20px;
    }
}
</style>