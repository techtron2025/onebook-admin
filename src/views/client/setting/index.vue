<template>
    <!-- 用户列表 -->
    <div ref="content" class="box">
        <!-- 操作按钮 -->
        <div class="f-ptb-10">
            <el-button type="primary" @click="logHandle()">新增</el-button>
        </div>
        <!-- 表单table -->
        <div class="table-content" ref="container">
            <el-table :data="list" border stripe :height="tabHeight" :header-cell-style="headerCellStyle" :cell-style="{'text-align': 'center'}">
                <el-table-column prop="id" label="id"></el-table-column>
                <el-table-column prop="id" label="路由名称">
                    <template #default="{row}">{{ filterName(row.id) }}</template>
                </el-table-column>
                <el-table-column prop="fullUrl" label="图片">
                    <template #default="{row}">
                        <el-image style="width: 50px; height: 30px" :src="row.fullUrl" :preview-src-list="[row.fullUrl]" fit="cover" />
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column prop="updateTime" label="修改时间"></el-table-column>
                <el-table-column label="操作" width="200" fixed="right">
                    <template #default="{row}">
                        <el-button type="primary" size="small" @click="logHandle(row.id)">编辑</el-button>
                        <el-popconfirm title="确定要删除该路由图片吗?" @confirm="delHandle(row.id)">
                            <template #reference>
                                <el-button type="danger" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 弹框 -->
        <base-dialog ref="logDialog" :title="logTitle" @submit="logSubmit" @cancle="logCancle">
            <log ref="logBox" :data="routerDetail" :title="logTitle" />
        </base-dialog>
    </div>
</template>

<script setup>
import {reactive, ref, onMounted, onBeforeUnmount, nextTick} from 'vue'
import {successDeal, errorDeal, setStore, getStore, removeStore, phoneFormat} from '@/utils/utils'
import {useTable} from '@/hooks/table'
import BaseDialog from '@/components/BaseDialog.vue'
import log from './log.vue'
import api from './api'
import useSettingStore from '@/stores/modules/setting'
const settingStore = useSettingStore()

// table hooks
const {headerCellStyle, container, tabHeight} = useTable(0)

const routerList = [
    {
        id: 1,
        name: '首页',
    },
    {
        id: 2,
        name: '生活',
    },
    {
        id: 3,
        name: '相册',
    },
    {
        id: 4,
        name: '学习',
    },
    {
        id: 5,
        name: '树洞',
    },
    {
        id: 6,
        name: '博主',
    },
    {
        id: 7,
        name: '个人中心',
    },
]

const filterName = (id) => {
    return routerList.find((p) => p.id == id).name
}

onMounted(() => {
    getList()
})

// 分类列表
const list = ref([])
const getList = () => {
    api.list().then((res) => {
        list.value = res.data
    })
}

// 弹框
let logTitle = ref('新增banner')
const logDialog = ref()
const logBox = ref()
const currentId = ref()
let routerDetail = ref()
function logHandle(id) {
    if (id) {
        currentId.value = id
        logTitle.value = '编辑banner'
        api.detail({id}).then((res) => {
            routerDetail.value = res.data
            logDialog.value.openDialog()
        })
    } else {
        logTitle.value = '新增banner'
        routerDetail.value = ''
        logDialog.value.openDialog()
    }
}

async function logSubmit() {
    let json = await logBox.value.validate()

    settingStore.setLoading(true, '上传OSS中...')
    if (logTitle.value == '新增banner') {
        api.add(json)
            .then((res) => {
                successDeal('新增成功')
                logCancle()
                getList()
                settingStore.setLoading(false)
            })
            .catch((err) => {
                settingStore.setLoading(false)
            })
    } else {
        api.edit(json)
            .then((res) => {
                successDeal('修改成功')
                logCancle()
                getList()
                settingStore.setLoading(false)
            })
            .catch((err) => {
                settingStore.setLoading(false)
            })
    }
}

function logCancle() {
    logBox.value.resetFields()
    logDialog.value.closeDialog()
}
// 删除
function delHandle(id) {
    api.del({id}).then((res) => {
        successDeal('删除成功')
        getList()
    })
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
    height: calc(100% - 42px);
    width: 100%;
}
</style>
