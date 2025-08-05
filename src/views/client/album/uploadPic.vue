<template>
    <div class="upload-box">
        <div class="upload-content">
            <p class="black f-wb">当前相册：{{ albumInfo.name }}</p>
            <el-upload
                class="f-mt-10"
                accept=".jpg,.png,.jpeg,.gif"
                drag
                :headers="upload.headers"
                :action="upload.action"
                :on-preview="handlePictureCardPreview"
                v-model:file-list="fileList"
                list-type="picture-card"
                multiple
                :auto-upload="false"
            >
                <el-icon><upload-filled /></el-icon>

                <div>拖拽/点击上传</div>
            </el-upload>
            <el-dialog v-model="dialogVisible">
                <img :style="{width: '100%', height: '100%'}" :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
        </div>
        <div class="upload-footer f-center">
            <el-button type="primary" @click="uploadHandle">上传</el-button>
            <el-button type="danger" @click="closedUpload">返回</el-button>
        </div>
    </div>
</template>

<script setup>
import {reactive, ref, watch} from 'vue'
import {successDeal, errorDeal, getStore, compress, base64ToFile} from '@/utils/utils'
import api from './api'
import useSettingStore from '@/stores/modules/setting'
const settingStore = useSettingStore()

const props = defineProps(['albumInfo'])

const $emits = defineEmits(['back', 'updateList'])

const fileList = ref([])

// 文件上传

const upload = reactive({
    action: '/api/admin/upload/batch',
    headers: {token: getStore('admin_token')},
})

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
function handlePictureCardPreview(uploadFile) {
    dialogImageUrl.value = uploadFile.url
    dialogVisible.value = true
}

// 手动上传
const uploadHandle = async () => {
    if (fileList.value.length > 20) {
        return errorDeal('一次最多上传20张图片')
    }
    settingStore.setLoading(true, '上传OSS中...')
    let formData = new FormData()

    // 批量压缩
    let mapList = fileList.value.map(({raw}) => {
        return new Promise((resolve) => {
            const readFile = new FileReader()
            readFile.readAsDataURL(raw)
            readFile.onload = async function (e) {
                let base64 = e.target.result
                //   压缩图片
                let _base64 = await compress(base64, 2500, 2500)

                //   转换为file
                let _file = base64ToFile(_base64, raw.name)
                formData.append('file', _file)

                resolve(true)
            }
        })
    })
    try {
        await Promise.all(mapList)
    } catch (error) {
        settingStore.setLoading(false)
    }

    formData.append('directoryName', props.albumInfo.directoryName)
    formData.append('id', props.albumInfo.id)

    api.batchUpload(formData, true, {'Content-Type': 'multipart/form-data'})
        .then((res) => {
            successDeal('上传成功')
            settingStore.setLoading(false)
            $emits('back')
            $emits('updateList')
        })
        .catch((err) => {
            settingStore.setLoading(false)
        })
}

const closedUpload = () => {
    $emits('back')
}
</script>

<style lang="scss" scoped>
.upload-box {
    position: relative;
    width: 100%;
    height: 100%;
}
.upload-content {
    border: 1px solid #eee;
    height: calc(100% - 50px);
    overflow-y: auto;
    padding: 20px;
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

<style>
.upload-box .el-upload-dragger {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>
