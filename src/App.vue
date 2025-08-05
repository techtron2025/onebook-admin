<template>
    <el-config-provider :locale="zhCn">
        <router-view
            v-loading="settingStore.loadingInfo.loading"
            :element-loading-text="settingStore.loadingInfo.text"
            :element-loading-spinner="svg"
            element-loading-svg-view-box="-10, -10, 50, 50"
            element-loading-background="rgba(122, 122, 122, 0.4)"
        />
    </el-config-provider>
</template>

<script setup>
import useSettingStore from '@/stores/modules/setting'
const settingStore = useSettingStore()

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
// import {RouterLink, RouterView} from 'vue-router'
// 解决默认英文
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<style scoped lang="scss"></style>
