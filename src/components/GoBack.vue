<template>
    <el-button type="primary" size="small" :icon="Back" @click="goBack">返回</el-button>
</template>

<script setup>
import {Back} from '@element-plus/icons-vue'

import {useRouter} from 'vue-router'
const $router = useRouter()
function goBack() {
    $router.go(-1)
}
</script>

<style lang="scss" scoped></style>
