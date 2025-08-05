<template>
    <div ref="content" class="box" v-if="!off.isUpload && !off.pic">
        <!-- 查询 -->
        <div class="list-title" ref="listTitle">
            <div style="width: 300px">
                <el-input style="width: 100%" v-model="form.keywords" placeholder="请输入相册名称查询" clearable></el-input>
            </div>
            <div class="f-ml-10">
                <el-button type="primary" @click="getList">查 询</el-button>
            </div>
        </div>
        <!-- 操作按钮 -->
        <div class="f-ptb-10">
            <el-button type="primary" @click="logHandle()">新增</el-button>
        </div>
        <!-- 表单table -->
        <div class="table-content" ref="container">
            <el-table :data="list" border stripe :height="tabHeight" :header-cell-style="headerCellStyle" :cell-style="cellStyle">
                <el-table-column type="index" label="序号" align="center" width="70" :index="indexMethod" fixed />
                <el-table-column prop="name" label="相册名称" width="200"></el-table-column>
                <el-table-column prop="directoryName" label="文件夹名称" width="100"></el-table-column>
                <el-table-column prop="name" label="相册封面" width="130">
                    <template #default="{row}">
                        <el-image style="width: 100%; height: 30px" :src="row.fullUrl" :preview-src-list="[row.fullUrl]" fit="cover" />
                    </template>
                </el-table-column>
                <el-table-column prop="nums" label="照片数量" width="100">
                    <template #default="{row}">
                        {{ row.nums || 0 }}
                    </template>
                </el-table-column>
                <el-table-column label="是否需要密码" width="130">
                    <template #default="{row}">
                        <span :class="row.isPwd == 1 ? 'green' : 'red'">{{ row.isPwd == 1 ? '是' : '否' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" min-width="160"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
                <el-table-column prop="updateTime" label="更新时间" width="180"></el-table-column>
                <el-table-column label="操作" width="300" fixed="right">
                    <template #default="{row}">
                        <el-button type="warning" size="small" @click="uploadHandle(row)">上传</el-button>
                        <el-button type="success" size="small" @click="lookHandle(row)">查看</el-button>
                        <el-button type="primary" size="small" @click="logHandle(row.id)">编辑</el-button>
                        <el-popconfirm title="确定要删除该相册吗?" @confirm="delHandle(row.id)">
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
    <!-- 相册弹框 -->
    <base-dialog ref="logDialog" :title="logTitle" @submit="logSubmit" @cancle="logCancle">
        <log ref="logBox" :data="musciDetail" :title="logTitle" />
    </base-dialog>

    <!-- 上传图片 -->
    <upload-pic v-if="off.isUpload" :albumInfo="albumInfo" @back="closedUpload" @updateList="getList" />

    <!-- 展示图片 -->
    <pic v-if="off.pic" :id="currentId" :name="name" @back="closedUpload" @updateList="getList" />
</template>

<script setup>
import {reactive, ref, onMounted, onBeforeUnmount, nextTick} from 'vue'
import {successDeal, errorDeal, setStore, getStore, removeStore, phoneFormat} from '@/utils/utils'
import {useTable} from '@/hooks/table'
import {usePagination} from '@/hooks/pagination'
import api from './api'
import BaseDialog from '@/components/BaseDialog.vue'
import log from './log.vue'
import pic from './pic.vue'
import uploadPic from './uploadPic.vue'

import useSettingStore from '@/stores/modules/setting'
const settingStore = useSettingStore()

// table hooks
const {headerCellStyle, container, tabHeight} = useTable(0)

// 定义数据
const form = reactive({
    keywords: '',
})

const off = reactive({
    isUpload: false,
    pic: false,
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

// 分页 hooks
const {pageSize, pageNum, total, handleSizeChange, handleCurrentChange} = usePagination(getList)

// 弹框
let logTitle = ref('新增相册')
const logDialog = ref()
const logBox = ref()
const currentId = ref()
let musciDetail = ref()
function logHandle(id) {
    if (id) {
        currentId.value = id
        logTitle.value = '编辑相册'
        api.detail({id}).then((res) => {
            musciDetail.value = res.data
            logDialog.value.openDialog()
        })
    } else {
        logTitle.value = '新增相册'
        musciDetail.value = ''
        logDialog.value.openDialog()
    }
}

async function logSubmit() {
    let json = await logBox.value.validate()
    settingStore.setLoading(true, '上传oss,请耐心等待...')
    if (logTitle.value == '新增相册') {
        api.add(json)
            .then((res) => {
                successDeal('新增成功')
                logCancle()
                getList()
                logBox.value.resetFields()
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
                logBox.value.resetFields()
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

// 上传
const albumInfo = ref()
function uploadHandle(val) {
    albumInfo.value = val
    off.isUpload = true
}
function closedUpload() {
    off.isUpload = false
    off.pic = false
}
const name = ref('')
const lookHandle = (val) => {
    name.value = val.name
    currentId.value = val.id
    off.pic = true
}

// 分页索引
const indexMethod = (index) => {
    return (pageNum.value - 1) * pageSize.value + index + 1
}

const cellStyle = ({row, column, rowIndex, columnIndex}) => {
    if (columnIndex == 3) {
        return {textAlign: 'center', padding: 0}
    } else {
        return {textAlign: 'center'}
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
    height: calc(100% - 128px);
    width: 100%;
}
</style>
