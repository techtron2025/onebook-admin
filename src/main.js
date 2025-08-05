import './assets/css/base.scss'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import 'element-plus/dist/index.css'

// 暗黑模式css
import 'element-plus/theme-chalk/dark/css-vars.css'
import App from './App.vue'
import router from './router'

// markdown
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
// 表情
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index'
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css'
// 代码行标
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index'
// 代码高亮
import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index'
import '@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css'
// 复制代码块

import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index'
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css'

import Prism from 'prismjs'

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
})
    .use(createEmojiPlugin())
    .use(createLineNumbertPlugin())
    .use(createHighlightLinesPlugin())
    .use(createCopyCodePlugin())

//加载权限路由
import './permisstion.js'

// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import DataVVue3 from '@kjgl77/datav-vue3'

// 自定义指令
import myDirective from '@/directives/index'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(createPinia())
app.use(DataVVue3)
app.use(router)
app.use(myDirective)
app.use(VueMarkdownEditor)
app.mount('#app')
