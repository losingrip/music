# 可以通过组件之间传递数据(使用组件时props获取属性值)  可以使用路由跳转时传值(在router-link上传递,跳转到的页面组件中this.$route.params获取到值)

## 使用swiper插件
```
npm install awesome vue-awesome-swiper --save
import { swiper, swiperSlide } from "vue-awesome-swiper"; // 局部引入组件
import "swiper/dist/css/swiper.css"; //引入样式

```

### 使用下拉刷新插件
```
npm install pull-to-refresh --save
import VuePullRefresh from 'vue-pull-refresh' //局部使用组件
components: {
    VuePullRefresh
},

将要刷新的内容使用组件包裹,通过:on-refresh="onRefresh"触发下拉刷新时的事件
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
