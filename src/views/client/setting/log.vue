<template>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto" label-position="top">
        <el-form-item prop="id" label="banner名称">
            <el-select v-model="form.id" clearable placeholder="选择banner名称" style="width: 100%" :disabled="title == '编辑banner'">
                <el-option v-for="item in routerList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
        </el-form-item>
        <el-form-item prop="title" label="banner标题">
            <el-input :rows="2" type="textarea" v-model="form.title" placeholder="banner标题" />
        </el-form-item>
        <el-form-item prop="url" label="图片地址" style="width: 100%">
            <el-upload class="img-uploader" :auto-upload="false" :on-change="uploadChange">
                <img v-if="form.preUrl" :src="form.preUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
        </el-form-item>
    </el-form>
</template>

<script setup>
import {reactive, ref, onMounted, watch} from 'vue'
import {compress, base64ToFile} from '@/utils/utils'
import useSettingStore from '@/stores/modules/setting'
const settingStore = useSettingStore()
import api from './api'
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

const props = defineProps(['data', 'title'])

const form = reactive({
    id: '',
    url: '',
    preUrl: '',
    title: '',
    filename: '',
})

function uploadChange({raw: file}) {
    const readFile = new FileReader()
    readFile.readAsDataURL(file)
    readFile.onload = async function (e) {
        let base64 = e.target.result
        //   压缩图片
        let _base64 = await compress(base64, 2500, 2500)

        //   转换为file
        let _file = base64ToFile(_base64, file.name)

        //   Object url
        form.preUrl = URL.createObjectURL(_file)

        let formData = new FormData()

        formData.append('file', _file)
        settingStore.setLoading(true, '上传图片中...')
        api.upload(formData, true, {'Content-Type': 'multipart/form-data'})
            .then((res) => {
                let {url, filename} = res.data
                form.filename = filename
                form.url = url
                settingStore.setLoading(false)
            })
            .catch(() => {
                settingStore.setLoading(false)
            })
    }
}

watch(
    () => props.data,
    () => {
        if (props.data) {
            Object.assign(form, props.data)
            form.preUrl = props.data.fullUrl
        } else {
            for (let key in form) {
                form[key] = ''
            }
        }
    },
    {
        immediate: true,
    },
)

const formRef = ref()
const validate = () => {
    return new Promise((reslove, reject) => {
        formRef.value.validate((valid, fields) => {
            if (valid) {
                reslove(form)
            } else {
                reject(false)
            }
        })
    })
}

const resetFields = () => {
    formRef.value.resetFields()
}

const rules = reactive({
    id: [{required: true, message: '请选择banner名称', trigger: 'change'}],
    url: [{required: true, message: '请上传图片地址', trigger: 'change'}],
    title: [{required: true, message: '请填写banner标题', trigger: 'blur'}],
})
// 暴露出去，父组件调用
defineExpose({
    validate,
    resetFields,
})
</script>

<style lang="scss" scoped>
.img-uploader {
    border: 1px solid #eee;
    width: 100%;
    height: 200px;
    overflow: hidden;
}

.img-uploader img {
    width: 100%;
}
</style>

<style>
.img-uploader .el-upload {
    width: 100% !important;
    height: 100% !important;
}
</style>
