<template lang="html">
  <div class="home">
    <!-- 今日推荐  type=25--> 
    <todayRecommend title='今日推荐' type='25' />

    <!-- 新歌速递 -->
    <newMusic />

    <!-- swiper轮播图组件 -->
    <swiperBanner />

    <!-- 音乐榜单导航 -->
    <musicListNav />

    <!-- 音乐榜单路由出口 显示king榜 热歌榜 新歌榜等组件 -->
    <!-- 使用keep-alive可以在短时间内不会一致触发更新,节约了资源 -->
    <keep-alive>
      <router-view />
    </keep-alive>

     <!-- 热门歌单  type=24--> 
    <todayRecommend title='热门歌单' type='24' />
  </div>
</template>

<script>
import todayRecommend from "../components/today_recomend";
import newMusic from "../components/new_music";
import swiperBanner from "../components/swiper_banner";
import musicListNav from "../components/music_list/music_list_nav";

export default {
  components: {
    todayRecommend,
    newMusic,
    swiperBanner,
    musicListNav
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style lang="css">
</style>
