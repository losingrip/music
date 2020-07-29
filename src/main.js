import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from "axios"
import { Button, Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Button)

Vue.prototype.$message = Message

// 挂载axios和跨域的网址到全局Vue上
Vue.prototype.$Axios = Axios;
Vue.prototype.HOST = "/Api"

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
