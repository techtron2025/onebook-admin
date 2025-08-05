<template>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
        <el-form-item prop="title" label="歌曲名称">
            <el-input v-model="form.title" placeholder="歌曲名称" />
        </el-form-item>
        <el-form-item prop="author" label="作者">
            <el-input v-model="form.author" placeholder="作者" />
        </el-form-item>
        <el-form-item prop="url" label="地址">
            <el-input v-model="form.url" placeholder="地址" />
        </el-form-item>
        <el-form-item prop="lrc" label="歌词">
            <el-input v-model="form.lrc" placeholder="歌词" />
        </el-form-item>
        <el-form-item prop="pic" label="封面">
            <el-input v-model="form.pic" placeholder="封面" />
        </el-form-item>
    </el-form>
</template>

<script setup>
import {reactive, ref, onMounted, watch} from 'vue'

const props = defineProps(['data'])

const form = reactive({
    id: '',
    title: '',
    author: '',
    url: '',
    pic: '',
    lrc: '',
})

watch(
    () => props.data,
    () => {
        if (props.data) {
            Object.assign(form, props.data)
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
    title: [{required: true, message: '请输入歌曲名称', trigger: 'blur'}],
    author: [{required: true, message: '请输入作者', trigger: 'blur'}],
    url: [{required: true, message: '请输入歌曲路径', trigger: 'blur'}],
    pic: [{required: true, message: '请输出图片路径', trigger: 'blur'}],
    //     lrc: [{required: true, message: '请输入歌词', trigger: 'blur'}],
})
// 暴露出去，父组件调用
defineExpose({
    validate,
    resetFields,
})
</script>

<style lang="scss" scoped></style>
