<template lang="html">
  <div class="art-list">
    <ul class="list">
        <!-- 点击跳转后到歌曲播放页面,传递的是当前歌曲的歌曲id -->
      <router-link tag="li" :to="{name: 'musicplay',params:{'songId':item.song_id}}" class="song" v-for="(item,index) in listArr" :key="index">
        <div class="left">
          {{ item.title }} -- {{item.album_title}}
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listArr: [],//歌手歌曲列表
    };
  },
  props: {
    singerId: {
      type: [String,Number],
      default: ""
    }
  },
  mounted() {
    // 根据传递的singerId发送请求
    const singerURL = this.HOST + "/v1/restserver/ting?method=baidu.ting.artist.getSongList&tinguid=" + this.singerId + "&limits=10&use_cluster=1&order=2";
    this.$Axios
      .get(singerURL)
      .then(res => {
        this.listArr = res.data.songlist; //将请求回来的歌曲保存到data中
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.art-list {
  padding: 0 17px;
}

.song {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #999;
}
.left {
  font-size: 18;
}
</style>
