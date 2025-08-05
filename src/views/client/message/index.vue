<template>
    <div ref="content" class="box">
        <!-- 查询 -->
        <div class="list-title" ref="listTitle">
            <div style="width: 300px">
                <el-input style="width: 100%" v-model="form.keywords" placeholder="请输入IP关键字查询" clearable></el-input>
            </div>

            <div class="f-ml-10">
                <el-button type="primary" @click="getList">查 询</el-button>
            </div>
        </div>
        <div class="f-ptb-10">
            <el-button type="danger" @click="delBatchHandle" :disabled="!delIds.length">批量删除</el-button>
        </div>
        <!-- 表单table -->
        <div class="table-content" ref="container">
            <el-table
                :data="list"
                border
                stripe
                :height="tabHeight"
                :header-cell-style="headerCellStyle"
                :cell-style="{'text-align': 'center'}"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" />
                <el-table-column type="index" label="序号" align="center" width="70" :index="indexMethod" fixed />
                <el-table-column prop="username" label="访客名称"></el-table-column>
                <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
                <el-table-column prop="ip" label="IP地址"></el-table-column>
                <el-table-column prop="ipv6" label="ipv6"></el-table-column>
                <el-table-column prop="content" label="内容" min-width="300"></el-table-column>

                <el-table-column prop="createTime" label="留言时间" width="180"></el-table-column>
                <el-table-column label="操作" width="100" fixed="right">
                    <template #default="{row}">
                        <el-popconfirm title="确定要删除该访客记录吗?" @confirm="delHandle(row.id)">
                            <template #reference>
                                <el-button type="danger" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>
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
import {useTable} from '@/hooks/table'
import {usePagination} from '@/hooks/pagination'
import api from './api'

// table hooks
const {headerCellStyle, container, tabHeight} = useTable(0)

// 定义数据
const form = reactive({
    keywords: '',
})

onMounted(() => {
    getList()
})

// 分类列表
const list = ref([])
const getList = () => {
    const json = {
        pageSize: pageSize.value,
        pageNum: pageNum.value,
        keywords: form.keywords,
    }
    api.list(json).then((res) => {
        list.value = res.data.data
        total.value = res.data.total
    })
}

// 批量删除
const delIds = ref([])
const handleSelectionChange = (e) => {
    delIds.value = e.map((item) => item.id)
}

function delBatchHandle() {
    api.del({ids: delIds.value}).then((res) => {
        successDeal('删除成功')
        getList()
    })
}

// 单个删除
function delHandle(id) {
    api.del({ids: [id]}).then((res) => {
        successDeal('删除成功')
        getList()
    })
}

// 分页 hooks
const {pageSize, pageNum, total, handleSizeChange, handleCurrentChange} = usePagination(getList)

// 分页索引
const indexMethod = (index) => {
    return (pageNum.value - 1) * pageSize.value + index + 1
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
    height: calc(100% - 148px);
    width: 100%;
}
</style>
