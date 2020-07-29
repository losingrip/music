<template lang="html">
  <div class="listdetails">
    <div class="banner-img">
      <img :src="listCateData.billboard.pic_s444" :alt="listCateData.billboard.name">
    </div>
    <ul class="list">
        <!-- 传递歌曲id 跳转到歌曲播放页面 -->
      <router-link :key="index" tag="li" :to="{name:'musicplay',params:{songId:item.song_id}}" v-for="(item,index) in listCateData.song_list">
        <p class="title">{{ item.title }}</p>
        <p class="author">{{ item.author }}</p>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listCateData: {
        song_list: [],
        billboard: {}
      }
    };
  },
  mounted() {
    //   根据路由传递的音乐类型参数 发送网络请求
    const licateUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.billboard.billList&type=" + this.$route.params.musicType + "&size=10&offset=0";
    this.$Axios
      .get(licateUrl)
      .then(res => {
        this.listCateData = res.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.banner-img img {
  width: 100%;
}

.list {
  padding: 10px 17px;
  background: #fff;
}

.list li {
  margin: 10px 5px;
  padding-bottom: 10px;
  border-bottom: 1px solid #999;
}

.title {
  font-size: 18px;
}

.author {
  font-size: 14px;
  color: #999;
}
</style>
