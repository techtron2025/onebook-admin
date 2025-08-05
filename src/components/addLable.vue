<template>
    <el-dialog v-model="show" title="新增标签" width="500" :before-close="cancle">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
            <el-form-item prop="name" label="标签名称">
                <el-input v-model="form.name" placeholder="标签名称" />
            </el-form-item>
            <el-form-item prop="remark" label="标签描述">
                <el-input v-model="form.remark" placeholder="描述" :rows="5" type="textarea" />
            </el-form-item>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="cancle">取消</el-button>
                <el-button type="primary" @click="submit">确认</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue'
import api from './api'
import { successDeal } from '@/utils/utils'

const $emits = defineEmits(['lableBack'])

const form = reactive({
    name: '',
    remark: '',
})

const show = ref(false)

const cancle = () => {
    show.value = false
}
const open = () => {
    show.value = true
}
const formRef = ref(null)
const submit = () => {
    formRef.value.validate((valid) => {
        if (valid) {
            api.labelAdd(form)
                .then(() => {
                    successDeal('新增成功')
                    resetFields()
                    $emits('lableBack')
                })
                .catch((err) => {
                    resetFields()
                    cancle()
                })
        } else {
            return false
        }
    })
}

const resetFields = () => {
    formRef.value.resetFields()
    cancle()
}

const rules = reactive({
    name: [{ required: true, message: '请输入类型姓名', trigger: 'blur' }],
})

// 暴露出去，父组件调用
defineExpose({
    open,
    cancle,
})
</script>

<style lang="scss" scoped></style>
