<template>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
        <el-form-item prop="name" label="标签名称">
            <el-input v-model="form.name" placeholder="标签名称" />
        </el-form-item>
        <el-form-item prop="remark" label="描述">
            <el-input v-model="form.remark" placeholder="描述" :rows="5" type="textarea" />
        </el-form-item>
    </el-form>
</template>

<script setup>
import {reactive, ref, onMounted, watch} from 'vue'

const props = defineProps(['data'])

const form = reactive({
    id: '',
    name: '',
    remark: '',
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
    name: [{required: true, message: '请输入类型姓名', trigger: 'blur'}],
})
// 暴露出去，父组件调用
defineExpose({
    validate,
    resetFields,
})
</script>

<style lang="scss" scoped></style>
