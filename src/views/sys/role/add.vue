<template>
    <div>
        <el-form ref="ruleFormRef" :model="form" :rules="rules" class="form-box" label-width="120px">
            <el-form-item prop="name" label="角色姓名">
                <el-input v-model="form.name" placeholder="角色姓名" />
            </el-form-item>

            <el-form-item prop="routes" label="菜单权限">
                <div class="el-tree-box">
                    <el-tree
                        ref="tree"
                        :props="props"
                        default-expand-all
                        :default-checked-keys="defaultCheckedKeys"
                        node-key="path"
                        :data="list"
                        show-checkbox
                        @check-change="handleCheckChange"
                    />
                </div>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="cancle(ruleFormRef)">取 消</el-button>
                <el-button type="primary" @click="ok(ruleFormRef)">确 认</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import api from './api'
import {useRouter} from 'vue-router'
import {reactive, ref} from 'vue'
import {successDeal, setStore, removeStore} from '@/utils/utils'
import {asyncRouter} from '@/router/routes'
const $router = useRouter()

// 过滤路由，转换成tree类型
let hideMenuList = [] //未展示的菜单
function filterTree(arr) {
    let menuList = []
    arr.forEach((p) => {
        // 这里首页特殊处理，保持和左边菜单栏一致
        if (p.name == 'layout') {
            menuList.push({
                label: p.children[0].meta.title,
                path: p.children[0].meta.path,
                disabled: true,
            })
        } else {
            if (!p.meta.hidden) {
                menuList.push({
                    label: p.meta.title,
                    path: p.meta.path,
                    children: p.children && p.children.length && filterTree(p.children),
                })
            } else {
                hideMenuList.push(p.path)
            }
        }
    })
    return menuList
}

const list = [
    {
        path: '/',
        label: '全部',
        children: filterTree(asyncRouter),
    },
]
const defaultCheckedKeys = ref(['/home'])

// 菜单树
const props = {
    children: 'children',
    label: 'label',
    path: 'path',
    disabled: 'disabled',
}

function handleCheckChange() {}

// 新增
const form = reactive({
    name: '',
    routes: [],
    halfCheckedKeys: [],
    checkedKeys: [],
})

const tree = ref(null)

const ruleFormRef = ref()
const ok = (formEl) => {
    form.halfCheckedKeys = [...tree.value.getHalfCheckedKeys(), ...hideMenuList]
    form.checkedKeys = tree.value.getCheckedKeys()
    form.routes = [...form.halfCheckedKeys, ...form.checkedKeys]


    formEl.validate((valid, fields) => {
        if (valid) {
            api.roleAdd(form).then((res) => {
                successDeal('新增成功！')
                $router.push('/role')
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}

const cancle = () => {
    $router.go(-1)
}

const rules = reactive({
    name: [{required: true, message: '请输入角色姓名', trigger: 'blur'}],
})
</script>

<style lang="scss" scoped>
.form-box {
    width: 50%;
}

.el-tree-box {
    width: 100%;
    height: 500px;
    border: 1px solid #eee;
    overflow-y: auto;
    padding: 10px 0;
}
</style>
