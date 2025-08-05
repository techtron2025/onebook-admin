<template>
    <div class="dy dy-ai-c setting">
        <el-button icon="Refresh" size="small" circle @click="opration('refresh')"></el-button>
        <el-button icon="FullScreen" size="small" circle @click="opration('fullScreen')"></el-button>

        <el-button icon="Setting" size="small" circle @click="opration('setting')"></el-button>


        <img class="avthor" src="../../assets/imgs/avatar.png" alt="" />
        <el-dropdown @command="command">
            <span class="el-dropdown-link">
                {{ useUser.userInfo.username }}
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="quit">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>


        <el-drawer v-model="drawer" title="主题设置">
            <el-form label-width="80px">
                <el-form-item label="主题颜色">
                    <el-color-picker v-model="color" show-alpha :predefine="predefineColors" @change="colorPicker" />
                </el-form-item>
                <el-form-item label="暗黑模式">
                    <el-switch v-model="blackType" @change="blackTypeChange" inline-prompt active-icon="Moon"
                        inactive-icon="Sunny" />
                </el-form-item>
            </el-form>
        </el-drawer>
    </div>
</template>

<script setup>
import api from './api'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import useSettingStore from '@/stores/modules/setting'
import useUserStore from '@/stores/modules/user'
const useSetting = useSettingStore()
const useUser = useUserStore()
const $router = useRouter()

const drawer = ref(false)
//主体颜色
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
])

const colorPicker = (color) => {
    const el = document.documentElement
    // 设置 css 变量
    el.style.setProperty('--el-color-primary', color)
    el.style.setProperty('--el-color-success', color)
    el.style.setProperty('--el-color-info', color)
    el.style.setProperty('--el-color-warning', color)
    el.style.setProperty('--el-color-danger', color)
}



// 暗黑模式
let blackType = ref(false)
const blackTypeChange = (type) => {
    let html = document.documentElement
    useSetting.isDark = type
    type ? html.className = 'dark' : html.className = ''

}
const opration = (name) => {
    switch (name) {
        case 'refresh':
            useSetting.refresh = !useSetting.refresh
            console.log('useSetting.refresh', useSetting.refresh);

            break
        case 'fullScreen':
            let fullScreen = document.fullscreenElement
            if (!fullScreen) {
                document.documentElement.requestFullscreen()
            } else {
                document.exitFullscreen()
            }

            break
        case 'setting':
            drawer.value = true
            break

        default:
            break
    }
}

//下拉
const command = async (command) => {
    switch (command) {
        case 'quit':
            await useUser.logout()
            $router.push('/login')
            break

        default:
            break
    }
}
</script>

<style lang="scss" scoped>
.setting {
    height: 100%;
    padding-right: 10px;
}

.avthor {
    width: 24px;
    height: 24px;
    margin: 0 10px;
}
</style>

<style>
.setting .el-drawer__title {
    font-size: 16px !important;
}
</style>
