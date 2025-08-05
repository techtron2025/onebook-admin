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
                <el-input v-model="form.password" maxlength="12" type="password" show-password placeholder="用户登录密码,不修改就是默认密码" />
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
import {successDeal, setStore, removeStore, errorDeal} from '@/utils/utils'
const $router = useRouter()
const $route = useRoute()
import hexMD5 from '@/utils/md5.min.js'

// 角色列表
const roleList = ref([])
api.roleList().then((res) => {
    roleList.value = res.data
})

const form = reactive({
    id: '',
    username: '',
    mobile: '',
    roleId: '',
    password: '',
})

onMounted(() => {
    form.id = $route.query.id
    getInfo()
})

// 用户详情
const getInfo = () => {
    api.userDetail({id: form.id}).then((res) => {
        Object.assign(form, res.data)
        form.password = ''
    })
}

const ruleFormRef = ref()
const ok = (formEl) => {
    formEl.validate((valid, fields) => {
        if (valid) {
            let data = JSON.parse(JSON.stringify(form))

            if (form.password) {
                if (form.password.length < 6 || form.password.length > 12) {
                    return errorDeal('密码长度6-12位')
                }
                data.password = hexMD5(form.password)
            }

            api.userEdit(data).then((res) => {
                successDeal('修改用户成功！')
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

    roleId: [{required: true, message: '请选择角色', trigger: 'change'}],
})

const cancle = () => {
    $router.push('/user')
}
</script>

<style lang="scss" scoped>
.form-box {
    width: 50%;
}
</style>
