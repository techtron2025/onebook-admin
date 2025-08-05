<template>
    <router-view v-slot="{Component}" v-if="refresh">
        <component :is="Component" />
    </router-view>
</template>

<script setup>
import {watch, ref, nextTick} from 'vue'
import useSettingStore from '@/stores/modules/setting'
const useSetting = useSettingStore()
// 监听仓库值的变化，然后摧毁路由，再新建
let refresh = ref(true)
watch(
    () => useSetting.refresh,
    () => {
        refresh.value = false
        nextTick(() => {
            refresh.value = true
        })
    },
)
</script>

<style lang="scss" scoped>
.main-enter,
.main-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
.main-enter-active {
    transition: all 0.2s;
}
.main-leave-active {
    position: absolute;
    transition: all 0.3s;
}
</style>
