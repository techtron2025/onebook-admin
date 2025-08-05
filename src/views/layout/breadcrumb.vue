<template>
    <div>
        <el-breadcrumb separator-icon="ArrowRight">
            <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index">{{ item.meta.title }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script setup>
import {useRoute, useRouter} from 'vue-router'
const $route = useRoute()
</script>

<style lang="scss" scoped></style>
