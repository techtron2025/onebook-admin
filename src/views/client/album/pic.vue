<template>
    <div class="upload-box">
        <p class="black f-wb title">当前相册：{{ name }}</p>
        <div class="upload-content">
            <div class="upload-item">
                <div v-for="(p, i) in list" :key="i" class="img-box pointer" :style="{backgroundImage: `url(${p.fullUrl})`}">
                    <div class="img-mask">
                        <div class="dy dy-c dy-jc-c dy-ai-c" style="height: 100%">
                            <p class="f-center white f-ptb-10">{{ p.filename }}</p>
                            <div>
                                <el-icon color="#fff" size="25" @click="openImageViewer(i)"><View /></el-icon>
                                <el-popconfirm title="确定要删除该照片吗?" @confirm="delHandle(p)">
                                    <template #reference>
                                        <el-icon color="#fff" size="25" class="f-ml-20"><DeleteFilled /></el-icon>
                                    </template>
                                </el-popconfirm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!list.length" class="f-center">暂无照片，快去上传。。</div>
        </div>
        <div class="upload-footer f-center">
            <el-button type="danger" @click="closedUpload">返回</el-button>
        </div>
        <!-- 预览组件 -->
        <el-image-viewer v-if="showViewer" :url-list="srcList" :initial-index="initialIndex" @close="closeImageViewer" />
    </div>
</template>

<script setup>
import {watch, ref, onMounted} from 'vue'
import api from './api'
import {successDeal, errorDeal, setStore, getStore, removeStore, phoneFormat} from '@/utils/utils'

const $emits = defineEmits(['back', 'updateList'])
const props = defineProps(['id', 'name'])

onMounted(() => {
    getList()
})
const list = ref([])
const srcList = ref([])
function getList() {
    api.pic({id: props.id}).then((res) => {
        list.value = res.data

        srcList.value = res.data.map((item) => item.fullUrl)
    })
}

// 图片预览
const showViewer = ref(false)
const initialIndex = ref(0)
function openImageViewer(i) {
    initialIndex.value = i
    showViewer.value = true
}

function closeImageViewer() {
    showViewer.value = false
}

const closedUpload = () => {
    $emits('back')
    isDel.value && $emits('updateList')
}
// 删除照片
const isDel = ref(false)
const delHandle = (p) => {
    api.delPic({id: p.id}).then((res) => {
        isDel.value = true
        successDeal('删除成功')
        getList()
    })
}
</script>

<style lang="scss" scoped>
.upload-box {
    position: relative;
    width: 100%;
    height: 100%;
}
.title {
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    border: 1px solid #eee;
    border-bottom: none;
}
.upload-content {
    border: 1px solid #eee;
    height: calc(100% - 90px);
    overflow-y: auto;
    padding: 20px;
}
.upload-item {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    margin-top: 20px;
}
.img-box {
    height: 200px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;

    &:hover {
        .img-mask {
            display: block;
        }
    }
}
.img-mask {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
}
.upload-footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    border: 1px solid #eee;
    border-top: none;
}
</style>
