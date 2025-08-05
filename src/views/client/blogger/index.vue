<template>
    <div style="height: 100%">
        <v-md-editor v-model="content" :disabled-menus="[]" @upload-image="handleUploadImage" :left-toolbar="leftToolbar" height="90%" />
        <el-button type="primary" @click="save" class="f-mt-20">保存</el-button>
    </div>
</template>

<script setup>
import {successDeal, errorDeal, setStore, getStore, removeStore, phoneFormat} from '@/utils/utils'
import {ref, reactive, onMounted} from 'vue'
import api from './api'
const leftToolbar = ref('undo redo clear| tip | h bold italic strikethrough quote | ul ol table hr | link image code | save| emoji')

function handleUploadImage(event, insertImage, files) {
    const formData = new FormData()
    formData.append('file', files[0]) // 通过append向form对象添加数据
    api.upload(formData, true, {'Content-Type': 'multipart/form-data'}).then((res) => {
        insertImage({
            url: res.data.fullUrl,
        })
    })
}

const content = ref('我是博主')

onMounted(() => {
    getInfo()
})

function getInfo() {
    api.getBloger().then((res) => {
      content.value = res.data.content
    })
}

function save() {
    api.setBloger({content: content.value}).then((res) => {
        successDeal('保存成功')
        getInfo()
    })
}
</script>

<style lang="scss" scoped></style>
