<template>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
        <el-form-item prop="name" label="相册名称">
            <el-input v-model="form.name" placeholder="相册名称" />
        </el-form-item>
        <el-form-item prop="directoryName" label="文件夹名称">
            <el-input v-model="form.directoryName" placeholder="文件夹名称,使用英文" :disabled="title == '编辑相册'" />
        </el-form-item>
        <el-form-item prop="isPwd" label="设置密码">
            <el-switch v-model="form.isPwd" :active-value="1" :inactive-value="2" />
        </el-form-item>
        <el-form-item prop="password" label="查看密码" v-if="form.isPwd == 1">
            <el-input v-model="form.password" placeholder="查看密码" show-password type="password" />
        </el-form-item>

        <el-form-item prop="url" label="相册封面" style="width: 100%">
            <el-upload class="img-uploader" :auto-upload="false" :on-change="uploadChange">
                <div v-if="form.preUrl" :style="{backgroundImage: `url(${form.preUrl})`}" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
        </el-form-item>
        <el-form-item prop="remark" label="备注">
            <el-input v-model="form.remark" placeholder="您的备注" :rows="2" type="textarea" />
        </el-form-item>
    </el-form>
</template>

<script setup>
import {reactive, ref, onMounted, watch} from 'vue'
import {successDeal, errorDeal, setStore, getStore, compress, base64ToFile} from '@/utils/utils'
import useSettingStore from '@/stores/modules/setting'
const settingStore = useSettingStore()
import api from './api'
const props = defineProps(['data', 'title'])

const form = reactive({
    id: '',
    name: '',
    directoryName: '',
    url: '',
    preUrl: '',
    filename: '',
    isPwd: '',
    password: '',
    remark: '',
})

// 文件上传

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
            form.preUrl = form.fullUrl
            
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
                if (!props.data) delete form.id

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
    name: [{required: true, message: '请输入相册名称', trigger: 'blur'}],
    directoryName: [
        {required: true, message: '请输入文件夹名称', trigger: 'blur'},
        {
            pattern: /^[a-zA-Z]+$/,
            message: '只能使用英文',
            trigger: 'change',
        },
    ],
    password: [{required: true, message: '请输入相册密码', trigger: 'blur'}],
    url: [{required: true, message: '请上传相册封面', trigger: 'change'}],
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
    height: 150px;
    overflow: hidden;
}

.img-uploader .avatar {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
</style>

<style>
.img-uploader .el-upload {
    width: 100% !important;
    height: 100% !important;
}
</style>
