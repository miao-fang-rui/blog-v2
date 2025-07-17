<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import { ref } from 'vue'
import SettingIcon from '../icons/SettingIcon.vue'
import Topbar from '../icons/Topbar.vue'
import Sidebar from '../icons/Sidebar.vue'
import DownloadIcon from '../icons/DownloadIcon.vue'
import GoBack404 from '../icons/GoBack404.vue'

// import { ElMessageBox, ElMessage } from 'element-plus'
// import { usePageData } from 'vuepress/client'
import { useRouter } from 'vue-router'
// import { useDarkMode } from '@theme/useDarkMode'

// let html2canvas, jsPDF;

// if (typeof window !== 'undefined') {
//   import('html2canvas').then(module => {
//     html2canvas = module.default;
//   });
//   import('jspdf').then(module => {
//     jsPDF = module.jsPDF;
//   });
// }

// const isDarkMode = useDarkMode()
const router = useRouter()
// const page = usePageData()
const sideIsShow = ref(true)
const topIsShow = ref(true)

// const html2pdf = () => {
//   if (typeof window !== 'undefined' && html2canvas && jsPDF) {
//     html2canvas(document.querySelector('.vp-page [vp-content]'), {
//       backgroundColor: isDarkMode.value ? 'black' : 'white',
//       dpi: 500, // 设置图片的 dpi（每英寸像素数）
//       scale: 2
//     }).then(function (canvas) {
//       let pdf = new jsPDF('p', 'mm', 'a4'); // 创建A4大小的PDF
//       let ctx = canvas.getContext('2d', { willReadFrequently: true });
//       let a4w = 190;
//       let a4h = 270; // A4 大小，210mm x 297mm，四边各保留 10mm 的边距，显示区域 190x277，
//       let imgHeight = Math.floor((a4h * canvas.width) / a4w);  // 按 A4显示比例换算一页图像的像素高度
//       let renderedHeight = 0;

//       // 按照A4大小进行分页渲染
//       while (renderedHeight < canvas.height) {
//         let page = document.createElement('canvas');
//         page.width = canvas.width;
//         page.height = Math.min(imgHeight, canvas.height - renderedHeight); // 可能内容不足一页
//         // 用 getImageData 剪裁指定区域，并画到前面创建的 canvas 对象中
//         page.getContext('2d', { willReadFrequently: true }).putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0);
//         pdf.addImage(page.toDataURL('image/jpeg', 0.2), 'JPEG', 10, 10, a4w, Math.min(a4h, (a4w * page.height) / page.width)); // 添加图像到页面，保留 10mm 边距
//         renderedHeight += imgHeight;
//         if (renderedHeight < canvas.height) pdf.addPage(); // 如果后面还有内容，添加一个空页
//       }

//       pdf.save(page.value.title + '.pdf');
//     }).catch(function (error) {
//       console.error('html2canvas error:', error);
//     });
//   }
// }

const handleSide = () => {
  sideIsShow.value = !sideIsShow.value
  const vpThemeContainer = document.querySelector('.vp-theme-container')
  if (vpThemeContainer) {
    vpThemeContainer.classList.toggle('no-sidebar')
  }
}

const handleTop = () => {
  topIsShow.value = !topIsShow.value
  const navbarContainer = document.querySelector('.theme-container')
  const vpNavbarContainer = document.querySelector('.vp-theme-container')
  if (navbarContainer) {
    navbarContainer.classList.toggle('no-navbar');
    const navbar = document.querySelector('.navbar')
    navbar.style.display = navbar.style.display === 'none' ? '' : 'none'
  }

  if (vpNavbarContainer) {
    vpNavbarContainer.classList.toggle('no-navbar');
    const vpNavbar = document.querySelector('.vp-navbar')
    vpNavbar.style.display = vpNavbar.style.display === 'none' ? '' : 'none'
  }
}

// const handleDownload = () => {
//   if (typeof window !== 'undefined') {
//     ElMessageBox.confirm('确认下载本页面文档 - [ ' + page.value.title + '.pdf' + ' ], 是否继续?', '提示', {
//       confirmButtonText: '确定',
//       cancelButtonText: '取消',
//       type: 'warning',
//     }).then(() => {
//       const sidebar = document.querySelector('.vp-sidebar')
//       if (sidebar) {
//         const isNoSidebar = sidebar.classList.contains('no-sidebar')
//         if (!isNoSidebar) {
//           sidebar.classList.add('no-sidebar')
//           // html2pdf()
//           console.log('下载文档')
//           sidebar.classList.remove('no-sidebar')
//         } else {
//           // html2pdf()
//           console.log('下载文档')
//         }

//         ElMessage.success({
//           message: '导出成功，请等待浏览器下载！',
//           type: 'success',
//         })
//       }

//     }).catch(() => {
//       ElMessage('取消下载！')
//     })
//   }
// }

const toggleTopBar = () => {
  handleTop()
}

function goBack() {
  router.go(-1);
}
</script>

<template>
  <ParentLayout>
    <template #page-top>
      <div class="sidebar-btn">
        <el-icon class="btn" @click='handleSide'>
          <arrow-left-bold v-show="sideIsShow" />
          <arrow-right-bold v-show="!sideIsShow" />
        </el-icon>
      </div>
    </template>
    <template #page-bottom>
      <div class="right-btn">
        <el-popover placement="top" popper-style="min-width:20px; width:auto; border-radius: 8px; padding: 10px;">
          <template #reference>
            <el-button class="more-btn" text bg circle><el-icon :size="20">
                <SettingIcon />
              </el-icon></el-button>
          </template>
          <template #default>
            <div class="tip">
              <el-button class="tip-btn" text @click="toggleTopBar">
                <el-icon :size="20">
                  <Topbar />
                </el-icon>
                <span>{{ topIsShow ? '隐藏顶部菜单' : '显示顶部菜单' }}</span>
              </el-button>
            </div>
            <div class="tip">
              <el-button class="tip-btn hidden-xs-only" text @click="handleSide">
                <el-icon :size="20">
                  <Sidebar />
                </el-icon>
                <span>{{ sideIsShow ? '隐藏侧边栏' : '显示侧边栏' }}</span>
              </el-button>
            </div>
            <div class="right-popo-divider">
              <div class="line"></div>
            </div>
            <div class="tip">
              <el-button class="tip-btn" text v-print="'.vp-page [vp-content]'" >
                <el-icon :size="20">
                  <DownloadIcon />
                </el-icon>
                <span>下载本页文档</span>
              </el-button>
              <!-- <el-button class="tip-btn" text @click="handleDownload()">
                <el-icon :size="20">
                  <DownloadIcon />
                </el-icon>
                <span>下载本页文档</span>
              </el-button> -->
            </div>
          </template>
        </el-popover>
        <div class="go-back">
          <el-tooltip content="返回上一页" placement="left" :show-after="200">
            <el-button class="more-btn" text bg circle @click="goBack"><el-icon :size="20">
                <GoBack404 />
              </el-icon></el-button>
          </el-tooltip>
        </div>
      </div>
    </template>
  </ParentLayout>
</template>

<style lang="scss" scoped>
.sidebar-btn {
  position: fixed;
  display: flex;
  align-items: center;
  height: 100vh;

  .btn {
    padding: 5px;
    margin-left: 2px;
    color: var(--vp-c-border);
    border: 1px solid var(--vp-c-bg-alt);
    border-radius: 50%;

    &:hover {
      color: #5468ff;
      border-color: #5468ff;
      cursor: pointer;
    }
  }
}

.right-btn {
  position: fixed;
  bottom: 130px;
  right: 16px;
  z-index: 99999;

  .go-back {
    margin-top: 16px;
  }

  .more-btn {
    padding: 24px;
    background-color: var(--vp-c-bg) !important;
    border: 1px solid var(--vp-c-grey-bg);

    &:hover {
      background-color: var(--vp-c-grey-bg) !important;
      cursor: pointer;
    }

    &:active {
      background-color: var(--vp-c-bg-alt) !important;
    }
  }
}

[data-theme='dark'] {

  .tip-btn.is-text:not(.is-disabled):hover {
    background-color: rgb(36, 36, 36);
    color: #5468ff;
  }
}

@media screen and (max-width: 720px) {
  .sidebar-btn {
    display: none;
  }

  .right-btn {
    bottom: 120px;

    .more-btn {
      padding: 18px;
    }
  }
}

@media screen and (min-width: 720px) and (max-width: 960px) {
  .right-btn {
    bottom: 120px;

    .more-btn {
      padding: 20px;
    }
  }
}
</style>


<style lang="scss">

    .el-popper.is-light, .el-popper.is-light>.el-popper__arrow:before{
      background-color: var(--vp-c-bg);
      border-color: var(--vp-c-grey-bg);
    }

    .right-popo-divider{
        display: flex;
        justify-content: center;

        .line {
            width: 80%;
            border-bottom: 1px solid var(--vp-c-border);
            margin: 2px 0;
        }
    }

</style>