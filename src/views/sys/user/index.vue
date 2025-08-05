<template>
    <!-- 用户列表 -->
    <div ref="content" class="box">
        <!-- 查询 -->
        <div class="list-title" ref="listTitle">
            <div style="width: 300px">
                <el-input style="width: 100%" v-model="form.keywords" placeholder="请输入关键字查询" clearable></el-input>
            </div>
            <el-select v-model="form.type" placeholder="平台模式" style="width: 230px" class="f-ml-10">
                <el-option v-for="item in platformList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>

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
                <el-table-column prop="username" label="用户姓名"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="type" label="平台">
                    <template #default="{row}">
                        <span :class="row.type === 2 ? 'green' : 'yellow'">{{ row.type === 2 ? '后台系统' : '客户端' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="mobile" label="电话"></el-table-column>
                <el-table-column prop="roleName" label="角色">
                    <template #default="{row}">
                        <span>{{ row.roleName || '-' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column prop="loginTime" label="登录时间"></el-table-column>
                <el-table-column label="操作" width="160" fixed="right">
                    <template #default="{row}">
                        <div class="f-left">
                            <el-button type="primary" size="small" @click="opration('edit', row)" v-if="row.type === 2">编辑</el-button>
                            <el-popconfirm title="确定要删除该用户吗?" @confirm="opration('del', row)">
                                <template #reference>
                                    <el-button type="danger" size="small">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <div class="table-footer">
            <el-pagination
                v-model:current-page="pageNum"
                v-model:page-size="pageSize"
                :page-sizes="[10, 20, 30, 50]"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
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

const platformList = ref([
    {
        id: 1,
        name: '客户端',
    },
    {
        id: 2,
        name: '后台系统',
    },
])

// 定义数据
const form = reactive({
    keywords: '',
    type: 2,
})

onMounted(() => {
    getList()
})

// 用户列表
const list = ref([])
const getList = (num) => {
    if (num) pageNum.value = 1
    const json = {
        pageSize: pageSize.value,
        pageNum: pageNum.value,
        keywords: form.keywords,
        type: form.type,
    }
    api.userList(json).then((res) => {
        list.value = res.data.data
        total.value = res.data.total
    })
}

// 分页 hooks
const {pageSize, pageNum, total, handleSizeChange, handleCurrentChange} = usePagination(getList)

// 分页索引
const indexMethod = (index) => {
    return (pageNum.value - 1) * pageSize.value + index + 1
}

// 操作
const opration = (name, row) => {
    switch (name) {
        case 'edit':
            $router.push({
                path: '/user/edit',
                query: {
                    id: row.id,
                },
            })
            break
        case 'add':
            $router.push('/user/add')
            break
        case 'del':
            api.userDel({id: row.id}).then((res) => {
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
    height: calc(100% - 142px);
    width: 100%;
}
</style>
