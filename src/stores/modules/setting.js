import {defineStore} from 'pinia'

import {setStore, getStore} from '@/utils/utils'

const useSettingStore = defineStore('setting', {
    state: () => {
        return {
            fold: false, //控制折叠面板
            refresh: false, //页面刷新
            isDark: false, //是否暗黑模式
            loadingInfo: {
                loading: false,
                text: '加载中...',
            },
            tabs: getStore('admin_tabs') || [{title: '首页', path: '/home', fullPath: '/home'}], //tab栏的书库
            activeTabPath: getStore('admin_activeTabPath') || '/home', //激活的tab栏
        }
    },
    actions: {
        // 新增
        addTabs(data) {
            this.saveActiveTabPath(data.path)
            let flag = this.tabs.find((item) => item.path == data.path)
            !flag && this.tabs.push(data)
            setStore('admin_tabs', this.tabs)
        },
        // 一个一个删除
        delTab(path) {},
        // 保存激活tab
        saveActiveTabPath(path) {
            this.activeTabPath = path
            setStore('admin_activeTabPath', path)
        },
        // 删除其他的
        removeOtherTab(path) {
            this.saveActiveTabPath(path)
            this.tabs = this.tabs.filter((item) => item.path == path || item.path == '/home')
            setStore('admin_tabs', this.tabs)
        },
        // 全部删除
        removeAll() {
            this.tabs = [this.tabs[0]]
            this.saveActiveTabPath(this.tabs[0].path)
            setStore('admin_tabs', this.tabs)
        },
        // 控制折叠面板
        changefold() {
            this.fold = !this.fold
        },

        //   设置loading
        setLoading(loading, text='加载中...') {
            this.loadingInfo.loading = loading
            this.loadingInfo.text = text 
        },
    },
})

export default useSettingStore
