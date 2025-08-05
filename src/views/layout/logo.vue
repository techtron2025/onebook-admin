<template>
    <div class="logo" :class="useSetting.fold ? 'fold' : ''">
        <img :src="config.systemLogo" />
        <h3 v-if="!useSetting.fold">{{ config.systemSmallName }}</h3>
    </div>
</template>

<script setup>
import config from '@/config.js'
import useSettingStore from '@/stores/modules/setting'
const useSetting = useSettingStore()
</script>

<style lang="scss" scoped>
.logo {
    display: flex;
    align-items: center;
    height: 50px;
    padding-left: 5px;
    background-color: $menu-bg-color;
    color: #fff;

    img {
        width: 35px;
        height: 35px;
        margin: 0 10px;
    }
}
</style>
