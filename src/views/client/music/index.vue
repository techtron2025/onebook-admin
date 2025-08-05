<template>
    <!-- 用户列表 -->
    <div ref="content" class="box">
        <!-- 查询 -->
        <div class="list-title" ref="listTitle">
            <div style="width: 300px">
                <el-input style="width: 100%" v-model="form.keywords" placeholder="请输入关键字查询" clearable></el-input>
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
            <el-table :data="list" border stripe :height="tabHeight" :header-cell-style="headerCellStyle" :cell-style="{'text-align': 'center'}">
                <el-table-column type="index" label="序号" align="center" width="70" :index="indexMethod" fixed />
                <el-table-column prop="title" label="音乐名称"></el-table-column>
                <el-table-column prop="author" label="作者"></el-table-column>
                <el-table-column prop="url" label="地址"></el-table-column>
                <el-table-column prop="pic" label="封面"></el-table-column>
                <el-table-column prop="lrc" label="歌词"></el-table-column>
                <el-table-column prop="updateTime" label="修改时间"></el-table-column>
                <el-table-column label="操作" width="200" fixed="right">
                    <template #default="{row}">
                        <el-button type="primary" size="small" @click="logHandle(row.id)">编辑</el-button>
                        <el-popconfirm title="确定要删除该歌曲吗?" @confirm="delHandle(row.id)">
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
            <log ref="logBox" :data="musciDetail" />
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
        keywords: form.keywords,
    }
    api.musicList(json).then((res) => {
        list.value = res.data
    })
}

// 弹框
let logTitle = ref('新增歌曲')
const logDialog = ref()
const logBox = ref()
const currentId = ref()
let musciDetail = ref()
function logHandle(id) {
    if (id) {
        currentId.value = id
        logTitle.value = '编辑歌曲'
        api.musicDetail({id}).then((res) => {
            musciDetail.value = res.data
            logDialog.value.openDialog()
        })
    } else {
        logTitle.value = '新增歌曲'
        musciDetail.value = ''
        logDialog.value.openDialog()
    }
}

async function logSubmit() {
    let json = await logBox.value.validate()
    if (logTitle.value == '新增歌曲') {
        api.musicAdd(json).then((res) => {
            successDeal('新增成功')
            logCancle()
            getList()
        })
    } else {
        api.musicEdit(json).then((res) => {
            successDeal('修改成功')
            logCancle()
            getList()
        })
    }
}

function logCancle() {
    logBox.value.resetFields()
    logDialog.value.closeDialog()
}

// 删除
function delHandle(id) {
    api.musicDel({id}).then((res) => {
        successDeal('删除成功')
        getList()
    })
}

// 分页索引
const indexMethod = (index) => {
    return index + 1
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
