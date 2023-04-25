import { createApp } from 'vue'
import App from './App.vue'
// * UI
import ElementPlus, { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import naive from 'naive-ui/es/preset'
// * 路由
import router from './router/index'
// * 状态管理
import store from './store/index'
// * 全局样式
import './style/reset.css'
import './style/index.scss'
import './style/common/var.scss'
// * iconfont 字体图标
import './style/iconfont.css'
// * 全局挂载函数:
import request from './utils/request';
import storage from './utils/storage';
import api from './api'
// * 全局注册组件的样式：标尺
import 'vue3-sketch-ruler/lib/style.css'
// * 引入 plugins：
import { globalCustomComponents } from '@/plugins/globalCustomComponents.js'
import { globalCustomDirectives } from '@/plugins/globalCustomDirectives.js'

const app = createApp(App)

app.use(naive)

// * window 挂载
window['$vue'] = app
window['$message'] = ElMessage

// * 注册全局自定义组件
globalCustomComponents(app)
globalCustomDirectives(app)

// 全局挂载
app.config.globalProperties.$request = request
app.config.globalProperties.$storage = storage
app.config.globalProperties.$api = api

app.use(ElementPlus)
   .use(router)
   .use(store)
   .mount('#app')

// ElementPlus 全部 icon 注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}