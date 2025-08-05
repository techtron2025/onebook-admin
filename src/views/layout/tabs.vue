<template>
    <div class="tabs_sub">
        <el-tabs
            :style="{backgroundColor: useSetting.isDark ? '#000' : '#fff'}"
            v-model="useSetting.activeTabPath"
            type="card"
            class="el-tabs-card"
            @tab-click="handleClick"
            @tab-remove="tabRemove"
            @contextmenu.prevent.native="openMenu($event)"
        >
            <el-tab-pane :label="item.title" :closable="index != 0" :name="item.path" v-for="(item, index) in useSetting.tabs" :key="index"></el-tab-pane>
        </el-tabs>

        <ul v-show="rightMenuShow" :style="{left: left + 'px', top: top + 'px'}" class="menuBox">
            <li @click="tabRemove(currentRoute.path)">
                <i class="el-icon-error"></i>
                关闭
            </li>
            <li @click="removeOtherTab">关闭其他</li>
            <li @click="removeAllTab">全部关闭</li>
        </ul>
    </div>
</template>

<script setup>
import {ref, watch, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import useSettingStore from '@/stores/modules/setting'
import useUserStore from '@/stores/modules/user'
import {setStore, getStore} from '@/utils/utils'

const useSetting = useSettingStore()
const useUser = useUserStore()

const $route = useRoute()
const $router = useRouter()
// 控制tab操作

watch(
    () => $route.path,
    () => {
        useSetting.addTabs({title: $route.meta.title, path: $route.path, fullPath: $route.fullPath})
    },
)

// 此时跳转需要fullPath，可能会携带参数(需要优化)
const handleClick = (pane) => {
    let jumpRoute = useSetting.tabs.filter((item) => item.path == pane.props.name)
    $router.push(jumpRoute[0].fullPath)
    useSetting.saveActiveTabPath(pane.props.name)
}
// 单个删除
const tabRemove = (path) => {
    let index = useSetting.tabs.findIndex((item) => item.path == path)
    useSetting.tabs.splice(index, 1)
    rightMenuShow.value = false
    $router.push(useSetting.tabs[index - 1].path)

    setStore('admin_tabs', useSetting.tabs)
}

// 快捷键删除

let rightMenuShow = ref(false)
let top = ref(0)
let left = ref(0)
let currentRoute = ref()

const openMenu = (e) => {
    if (e.target.innerText === '首页' || !e.target.id) {
        return false
    }

    currentRoute.value = useSetting.tabs.find((item) => item.path === e.target.id.substring(4))
    rightMenuShow.value = true

    let X = useSetting.fold ? 60 : 200
    left.value = e.clientX - X
    top.value = e.clientY + 20
    // this.$store.dispatch('openMenu', item)
}

//关闭其他
const removeOtherTab = () => {
    $router.push(currentRoute.value.path)
    useSetting.removeOtherTab(currentRoute.value.path)
    rightMenuShow.value = false
}

// 删除全部
const removeAllTab = () => {
    useSetting.removeAll()
    $router.push('/home')
    rightMenuShow.value = false
}
</script>

<style lang="scss" scoped>
.menuBox {
    margin: 0;
    background: #fff;
    z-index: 999;
    position: absolute;
    padding: 5px 0;
    border: 1px solid #cccccc;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 1px 6px 0 rgba(0, 0, 0, 0.3);

    li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;

        &:hover {
            background: #e1e6ea;
        }
    }
}

.tabs_sub {
    width: 100%;
    height: 100%;

    :deep(.el-tabs__header) {
        margin: 0 !important;
    }

    :deep(.el-tabs__item.is-active) {
        color: $menu-active-color;
    }

    :deep(.el-tabs__item:hover) {
        color: $menu-active-color;
    }

    :deep(.el-tabs) {
        --el-tabs-header-height: 35px !important;
    }
}
</style>
