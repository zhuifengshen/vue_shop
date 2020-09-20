import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './plugins/element.js'  // 通过 externals 实现 CDN 加载
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入第三方库树形表格
import TreeTable from 'vue-table-with-tree-grid'
// 导入 NProgress 包对应的JS和CSS
import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'  // 通过 externals 实现 CDN 加载
// 导入第三方网络库
import axios from 'axios'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// 配置请求的根路径
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  // 开始发起网络请求
  NProgress.start()
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
axios.interceptors.response.use(config => {
  // 完成网络请求
  NProgress.done()
  return config
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)
// 将富文本编辑器注册为全局可用的组件
Vue.use(VueQuillEditor)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
