<template lang="html">
  <div class="play">
    <div class="header">
     <div class="title">
        <!-- 首页图标 跳转到首页 -->
       <router-link to="/">
         <i class="iconfont icon-shouye left"></i>
       </router-link>

        <!-- 歌曲名和作者 -->
       <div class="music-info">
         <p>{{ currentData.songinfo.title }}</p>
         <p class="author">{{ currentData.songinfo.author }}</p>
       </div>

        <!-- 搜索图标 跳转到搜索页面 -->
       <router-link to="/search"><i class="iconfont icon-sousuo right"></i></router-link>
     </div>
   </div>

    <div class="song-info">
        <div class="song-info-img">
            <img :src="currentData.songinfo.pic_big">
            <!-- 歌词组件 传递一个参数,是点击的哪首歌的songid -->
            <musicLrc :songId="this.$route.params.songId" :currentTime="currentTime"  :durationTime="durationTime" />
        </div>
        <div class="iconbox">
            <i class="iconfont icon-shoucang2 left"></i>
            <i class="box"></i>
            <i class="iconfont icon-xiazai right"></i>
        </div>
    </div>

    <div class="song">
      <audio ref="player" :src="currentData.bitrate.show_link" controls autoplay></audio>
    </div>

  </div>
</template>

<script>
import "../assets/font/iconfont.css"; //引入字体图标样式

// 异步操作,引入歌词组件,避免歌词加载后歌曲还未出现等情况
import Vue from 'vue'
const musicLrc = Vue.component("lrc",(resolve)=>require(["../components/music_lrc"],resolve))

export default {
  name: "musicplay",
  data() {
    return {
        currentData: {//默认保存当前对应歌曲id传入请求回来的数据
            songinfo: {
                author: '',//歌曲作者,默认为空
                title: '',//歌曲名,默认为空
                pic_big: '',//歌曲图片,默认为空
            },
            bitrate: {
                show_link: '',//歌曲播放地址,默认为空
            }
        },
        currentTime: 0,//当前播放的时间,默认时0
        durationTime: 0,//当前播放的总时间,默认为0
    }
  },

   mounted(){
    const playUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.song.play&songid=" + this.$route.params.songId;
    this.$Axios.get(playUrl)
      .then(res => {
          this.currentData = res.data
      })
      .catch(error => {
        console.log(error);
      })

    //   挂载完成时执行bindEvent函数 给audio对象传递参数
      this.bindEvent()
  },

  beforeDestroy() {
    //   销毁之前清除这些方法
      this.removeEvent()
  },

  components: {
      musicLrc,
  },

  methods: {
      // 添加绑定事件 timeupdate是audio对象时间发生变化时执行的函数,执行getCurrentTime获取当前时间
      // canplay 浏览器开始播放时执行的函数,执行getDurationTime获取总时间
      bindEvent() {
          this.$refs.player.addEventListener('timeupdate',this.getCurrentTime)
          this.$refs.player.addEventListener('canplay',this.getDurationTime)
      },
      removeEvent() {
          this.$refs.player.removeEventListener('timeupdate',this.getCurrentTime)
          this.$refs.player.removeEventListener('canplay',this.getDurationTime)
      },
      //获取播放器当前的时间   
      getCurrentTime() {
          this.currentTime = this.$refs.player.currentTime
        //   console.log(this.currentTime)
      },
      //获取播放器总时间   
      getDurationTime() {
          this.durationTime = this.$refs.player.duration
      },
  }
};
</script>

<style scoped>
.header {
  padding: 15px;
}

.music-info {
  flex: 1;
  font-size: 20px;
}

.title {
  display: flex;
  text-align: center;
}

.left {
  font-size: 30px;
}

.ca {
  color: red;
}

.right {
  font-size: 30px;
}

.song-info {
  padding: 15px;
}

.song-info-img {
  text-align: center;
}

.song-info-img img {
  width: 50%;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(50, 50, 50, 0.31);
}

.song-lrc {
  margin-top: 10px;
  min-height: 50px;
}

.iconbox {
  display: flex;
  margin-top: 30px;
}

.iconbox .box {
  flex: 1;
}

.song {
  width: 100%;
  text-align: center;
}

.song audio {
  width: 80%;
}

.active {
  color: #222;
}

.author {
  font-size: 12px;
  color: #999;
}
</style>
