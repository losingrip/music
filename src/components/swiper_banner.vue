<template>
  <div class="banner">
    <swiper :options="swiperOption">
      <!-- slides -->
      <swiper-slide>
        <img src="../assets/img/b1.jpg" alt />
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/img/b2.jpg" alt />
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/img/b3.jpg" alt />
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper"; // 局部引入组件
import "swiper/dist/css/swiper.css"; //样式

export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"//设置分页器
        },
        autoplay:true,//自动轮播
        effect : 'flip',//切换效果
      }
    };
  },

  components: {
    swiper,
    swiperSlide
  },

};
</script>

<style scoped>
.banner {
  padding: 10px;
}
</style>