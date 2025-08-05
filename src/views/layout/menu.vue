<template>
    <template v-for="(item, index) in list">
        <!-- 特殊处理 -->
        <!-- <template v-if="item.name == 'layout'" :key="index">
            <el-menu-item :index="item.children[0].path">
                <el-icon><component :is="item.children[0].meta.icon"></component></el-icon>
                <span>{{ item.children[0].meta.title }}</span>
            </el-menu-item>
        </template> -->

        <template v-if="!item.meta.hidden" :key="index">
            <el-menu-item :index="item.path" v-if="!item.children">
                <el-icon v-if="item.meta.path == '/screen'"><component :is="item.meta.icon"></component></el-icon>
                <span>{{ item.meta.title }}</span>
            </el-menu-item>
        </template>

        <el-sub-menu :index="item.path" v-if="item.children && item.children.length" :key="index">
            <template #title>
                <el-icon><component :is="item.meta.icon"></component></el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <!-- 组件递归，必须要个组件name -->
            <Menu :list="item.children" />
        </el-sub-menu>
    </template>
</template>

<script setup>
const props = defineProps(['list'])
</script>

<script>
export default {
    name: 'Menu',
}
</script>

<style lang="scss" scoped>
.el-sub-menu .el-menu-item {
    padding-left: 60px !important;
}
.el-menu-item.is-active {
    background-color: rgb(41, 41, 41);
}
</style>
