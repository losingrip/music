// home页面的今日推荐组件
<template lang="html">
  <div class="mod-albums">
    <!-- 推荐标题 -->
    <div class="hd log url">
        <h2>{{ title }}</h2>
        <!-- 点击路由跳转时,将该组件身上对应的type类型和titlt标题传递给点击的路由组件 -->
        <router-link tag='div' :to="{name: 'more',params:{musicType:type,musicTitle:title}}">
          更多
        </router-link>
    </div>

    <!-- 推荐信息 -->
    <div class="container">
        <div class="gallery">
            <div class="scroller">
              <!-- 使用路由 点击歌曲跳转到歌曲播放页面 -->
                <router-link :to="{name: 'musicplay',params: {songId:item.song_id}}" tag="div" class="card url" v-for="(item,index) in currentData" :key="index">
                    <div class="album">
                        <img :src="item.pic_big" :alt="item.title">
                        <div class="name">{{ item.title }}</div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      currentData: [],//保存当前请求回来的今日推荐数据
    };
  },

  // 接收组件传递的url
  props: {
    type: {
      type: String,
      default: '25'
    },
    title: {
      type: String,
      default: '今日推荐'
    }
  },

  mounted() {
    // 发送请求 根据传递的type获取今日推荐信息数据或者是热门歌单数据
    const httpUrl = this.HOST + '/v1/restserver/ting?method=baidu.ting.billboard.billList&type=' + this.type + '&size=6&offset=0'
    this.$Axios.get(httpUrl)
      .then(res => {
        this.currentData = res.data.song_list;//数组数据
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.mod-albums {
  background-color: #fff;
  padding: 10px 17px;
}

.hd {
  display: flex;
  margin: 14px 0 18px 0;
}

.hd h2 {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  margin: 0;
  padding: 0;
  font-size: 20px;
}

.hd div {
  width: 64px;
  font-size: 12px;
  text-align: right;
}

.mod-albums .gallery {
  overflow: hidden;
  margin: 0 -5px;
}

.mod-albums .gallery .card {
  width: 33.3%;
  float: left;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0 5px 10px;
}

.mod-albums .gallery .card .album {
  position: relative;
}

.mod-albums .gallery .card img {
  width: 100%;
  height: auto;
  border: 1px solid #eee;
}

.mod-albums .gallery .card .name {
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 4px;
  line-height: 14px;
  max-height: 28px;
  margin-bottom: 2px;
}
</style>