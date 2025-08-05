<template>
    <div class="layout">
        <!-- 侧边栏 -->
        <div class="layout_left" :class="useSetting.fold ? 'fold' : ''">
            <Logo></Logo>
            <el-menu
                :class="useSetting.fold ? 'fold' : ''"
                class="el-menu"
                router
                unique-opened
                :default-active="$route.meta.path"
                :collapse="useSetting.fold"
                :active-text-color="variables.menuActiveColor"
                :background-color="variables.menuBgColor"
                :text-color="variables.menuTextColor"
                :collapse-transition="false"
            >
                <Menu :list="useUserStore.menuRoutes"></Menu>
            </el-menu>
        </div>
        <!-- 右侧 -->
        <div class="layout_right">
            <!-- 头部 -->
            <div class="header" :style="{backgroundColor: useSetting.isDark ? '#000' : '#fff'}">
                <div class="header_left">
                    <el-icon class="f-mr-10 pointer" @click="changeFold">
                        <component :is="useSetting.fold ? 'Expand' : 'Fold'"></component>
                    </el-icon>
                    <Breadcrumb />
                </div>
                <div class="header_right">
                    <Setting />
                </div>
            </div>
            <!-- tabs -->
            <div class="tabs">
                <Tabs />
            </div>
            <!-- 主页 -->
            <div class="main">
                <Main />
            </div>
        </div>
    </div>
</template>

<script setup>
import Menu from './menu.vue'
import Logo from './logo.vue'
import Breadcrumb from './breadcrumb.vue'
import Setting from './setting.vue'
import Tabs from './tabs.vue'
import Main from './main.vue'
import variables from '@/assets/css/variable.module.scss'

// 导入用户仓库
import useAccountStore from '@/stores/modules/user.js'
const useUserStore = useAccountStore()

// 路由
import {useRoute, useRouter} from 'vue-router'
const $route = useRoute()

// 折叠
import useSettingStore from '@/stores/modules/setting'
const useSetting = useSettingStore()

const changeFold = () => {
    // useSetting.fold = !useSetting.fold
    useSetting.changefold()
}
</script>

<style lang="scss" scoped>
.layout {
    width: 100%;
    height: 100vh;
    display: flex;
    background-color: #fff;
}

.layout .layout_left {
    width: auto;
    height: 100vh;
}

.layout .layout_right {
    position: relative;
    flex: 1;
    background-color: #f5f6f9;
    overflow: hidden;
}

.layout .layout_right .header {
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
}

.layout .layout_right .tabs {
    height: 40px;
    width: 100%;
    margin-top: 5px;
    min-width: 500px;
}

.layout .layout_right .main {
    position: absolute;
    width: 100%;
    padding: 20px;
    border-top: 1px solid #eee;
}

.header_left {
    display: flex;
    align-items: center;
    margin-left: 10px;
}

.layout .main {
    background-color: #fff;
    height: calc(100vh - 85px);
    overflow-y: auto;
}

.layout .el-menu {
    height: calc(100vh - 50px);
    overflow: auto;
    width: 200px;
    border-right: none;
}
</style>
