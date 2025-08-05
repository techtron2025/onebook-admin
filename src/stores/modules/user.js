//创建用户相关的小仓库
import {defineStore} from 'pinia'
import {getStore, setStore, removeStore} from '@/utils/utils.js'
import api from '../api'
import config from '@/config.js'

// 导入路由列表
import {staticRouter, asyncRouter, anyRouter} from '@/router/routes.js'

import router from '@/router'
import cloneDeep from 'lodash/cloneDeep'

// 用户是否需要动态路由
let filterPath = []
// 如果用户不需要动态路由，我们组装他的异步路由
function getUserAsyncRouter(asyncRouter) {
    asyncRouter.forEach((item) => {
        if (item.path) {
            filterPath.push(item.path)
            if (item.children && item.children.length) {
                getUserAsyncRouter(item.children)
            }
        }
    })
    return filterPath
}

//用于过滤当前用户需要展示的异步路由1
function filterAsyncRouter(asyncRouter, routes) {
    return asyncRouter.filter((item) => {
        if (routes.includes(item.path)) {
            if (item.children && item.children.length) {
                item.children = filterAsyncRouter(item.children, routes)
            }
            return true
        }
    })
}

//创建用户小仓库
const useUserStore = defineStore('user', {
    state: () => {
        return {
            token: getStore('admin_token'),
            menuRoutes: [...staticRouter, ...anyRouter],
            userInfo: {
                username: '',
                moblie: '',
                avatar: '',
                routes: ['/', '/home'],
            },
        }
    },
    actions: {
        //登录
        async login(json) {
            let res = await api.login(json)
            this.userInfo = Object.assign(this.userInfo, res.data)
            this.token = res.data.token
            setStore('admin_token', res.data.token)
        },

        updateToken(token) {
            this.token = token
            setStore('admin_token', token)
        },

        //获取用户信息
        async getUserInfo() {
            // let res = await api.userInfo()
            // this.userInfo = Object.assign(this.userInfo, res.data)

            // //计算当前用户需要展示的异步路由
            // let userRoutes = config.isPermisstion ? this.userInfo.routes : getUserAsyncRouter(asyncRouter)
            // const userAsyncRouter = filterAsyncRouter(cloneDeep(asyncRouter), userRoutes)
            this.menuRoutes = [...staticRouter, ...asyncRouter, ...anyRouter]

            //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
            // userAsyncRouter.forEach((route) => router.addRoute(route))
        },
        //退出登录
        async logout() {
            removeStore('admin_token')
            removeStore('admin_tabs')
            removeStore('admin_activeTabPath')
            window.location.reload()
        },
    },
    getters: {
        // 项目 中间 的导航栏 左侧
        topMenuLeftList(state) {
            let obj = state.menuRoutes.find((item) => item.name === 'layout')
            let arr = obj.children
            return arr.filter((p) => !p.meta.isShowRight)
        },
    },
})

//对外暴露获取小仓库方法
export default useUserStore
