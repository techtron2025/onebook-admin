<template>
    <div>
        <el-form ref="ruleFormRef" :model="form" :rules="rules" class="form-box" label-width="120px">
            <el-form-item prop="username" label="用户姓名">
                <el-input v-model="form.username" placeholder="用户姓名" />
            </el-form-item>
            <el-form-item prop="mobile" label="用户电话">
                <el-input v-model="form.mobile" placeholder="用户电话" maxlength="11" />
            </el-form-item>
            <el-form-item prop="roleId" label="角色">
                <el-select v-model="form.roleId" placeholder="请选择角色" style="width: 100%">
                    <el-option v-for="item in roleList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item prop="password" label="登录密码">
                <el-input v-model="form.password" type="password" maxlength="12" show-password placeholder="管理员登录密码" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="cancle(ruleFormRef)">取 消</el-button>
                <el-button type="primary" @click="ok(ruleFormRef)">确 认</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import {reactive, ref, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import api from './api/index'
import {successDeal, setStore, removeStore} from '@/utils/utils'
import hexMD5 from '@/utils/md5.min.js'
const $router = useRouter()

// 角色列表
const roleList = ref([])
api.roleList().then((res) => {
    roleList.value = res.data
})

// 新增
const form = reactive({
    username: '',
    mobile: '',
    password: '',
    roleId: '',
})

const ruleFormRef = ref()
const ok = (formEl) => {
    formEl.validate((valid, fields) => {
        if (valid) {
            let json = JSON.parse(JSON.stringify(form))
            json.password = hexMD5(json.password)

            api.userAdd(json).then((res) => {
                successDeal('新增成功！')
                $router.push('/user')
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}

const rules = reactive({
    username: [{required: true, message: '请输入用户姓名', trigger: 'blur'}],
    mobile: [
        {required: true, message: '请输入用户手机号码', trigger: 'blur'},
        {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式错误',
            trigger: 'change',
        },
    ],
    password: [
        {required: true, message: '请输入登录密码', trigger: 'blur'},
        {min: 6, max: 12, message: '请输入6-12位密码', trigger: 'blur'},
    ],
    roleId: [{required: true, message: '请选择角色', trigger: 'change'}],
})

const cancle = () => {
    $router.go(-1)
}
</script>

<style lang="scss" scoped>
.form-box {
    width: 50%;
}
</style>
