<template>
    <!-- 用户列表 -->
    <div ref="content" class="box">
        <!-- 查询 -->
        <div class="list-title" ref="listTitle">
            <div style="width: 300px">
                <el-input style="width: 100%" v-model="form.keywords" placeholder="请输入关键字查询" clearable></el-input>
            </div>

            <div class="f-ml-10">
                <el-button type="primary" @click="getList(1)">查 询</el-button>
            </div>
        </div>
        <!-- 操作按钮 -->
        <div class="f-ptb-10">
            <el-button type="primary" @click="opration('add')">新增</el-button>
        </div>
        <!-- 表单table -->
        <div class="table-content" ref="container">
            <el-table :data="list" border stripe :height="tabHeight" :header-cell-style="headerCellStyle" :cell-style="{'text-align': 'center'}">
                <el-table-column type="index" label="序号" align="center" width="70" :index="indexMethod" fixed />
                <el-table-column prop="name" label="角色姓名"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column label="操作" width="200" fixed="right">
                    <template #default="{row}">
                        <el-button type="primary" size="small" @click="opration('edit', row)">编辑</el-button>
                        <el-popconfirm title="确定要删除该管理员吗?" @confirm="opration('del', row)">
                            <template #reference>
                                <el-button type="danger" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup>
import {reactive, ref, onMounted, onBeforeUnmount, nextTick} from 'vue'
import {successDeal, errorDeal, setStore, getStore, removeStore, phoneFormat} from '@/utils/utils'
import {usePagination} from '@/hooks/pagination'
import {useTable} from '@/hooks/table'
import {useRouter, useRoute} from 'vue-router'
import api from './api'

const $router = useRouter()
// table hooks
const {headerCellStyle, container, tabHeight} = useTable(0)

// 定义数据
const form = reactive({
    keywords: '',
})

onMounted(() => {
    getList()
})

// 领劵列表
const list = ref([])
const getList = (num) => {
    const json = {
        keywords: form.keywords,
    }
    api.roleListAll(json).then((res) => {
        list.value = res.data
    })
}

// 分页索引
const indexMethod = (index) => {
    return index + 1
}

// 操作
const opration = (name, row) => {
    switch (name) {
        case 'edit':
            $router.push({
                path: '/role/edit',
                query: {
                    id: row.id,
                },
            })
            break
        case 'add':
            $router.push('/role/add')
            break
        case 'del':
            api.roleDel({id: row.id}).then((res) => {
                successDeal(res.msg)
                getList()
            })
            break

        default:
            break
    }
}
</script>

<style lang="scss" scoped>
.box {
    width: 100%;
    height: 100%;
}
.list-title {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 5px;
    border-bottom: 1px solid #eee;
}

.list-title > div {
    display: flex;
    align-items: center;
}
.list-title > div > span:nth-child(1) {
    white-space: nowrap;
    width: 70px;
    text-align: center;
}
.table-content {
    height: calc(100% - 92px);
    width: 100%;
}
</style>
