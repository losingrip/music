<template lang="html">
  <div class="more-list">
      <div class="wrapper">
        <h3>{{ this.$route.params.musicTitle }}</h3>

          <!-- 下拉刷新插件 on-refresh绑定下拉刷新时触发的事件-->
          <VuePullRefresh :on-refresh="onRefresh" :config="config">
            <router-link :to="{name: 'musicplay',params: {songId:item.song_id}}" class="info url log" v-for="(item,index) in moreListData" :key="index">
                <div class="poster">
                    <img :src="item.pic_big" :alt="item.title">
                </div>
                <div class="text-wrap">
                    <div class="title">{{ item.title }}</div>
                    <div class="author">{{ item.artist_name }}</div>
                </div>
            </router-link>
          </VuePullRefresh>
      </div>
    </div>
</template>

<script>
import VuePullRefresh from 'vue-pull-refresh'
// https://github.com/lakb248/vue-pull-refresh 这才是文档！！！刚刚睡过头了！！！
// import VuePullRefresh from "vue-pull-refresh";

export default {
  name: "moreMusic",
  data() {
    return {
      moreListData: [],//第一次无偏移offset请求的12条数据
      offset: 12,//下次请求时的偏移数,默认为12
      config: 	{
        errorLabel: '错误信息',//label shows when error
        startLabel: '放开我就可以加载数据', //label shows when pull down start
        readyLabel: '放开我就可以加载数据',//label shows when ready to refresh
        loadingLabel: '还在加载中哟',//label shows when loading
        // pullDownHeight: '600px'//the height toggle pull down refresh action
}
    };
  },

  components: {
      VuePullRefresh
  },

  mounted() {
    //   接收路由跳转过来的参数type和tittle
    const moreListUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.billboard.billList&type=" + this.$route.params.musicType + "&size=12&offset=0";
    this.$Axios
      .get(moreListUrl)
      .then(res => {
        this.moreListData = res.data.song_list;
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    //   下拉触发事件 固定返回是一个promise对象
      onRefresh() {
          let that = this
          const httpUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.billboard.billList&type=" + this.$route.params.musicType + "&size=12&offset=" + this.offset;
          return new Promise((resolve,reject) => {
              setTimeout(() => {
                  that.$Axios.get(httpUrl)
                    .then(res => {
                        console.log(res,'刷新',that.offset)
                        // 偏移量大于剩下歌曲的数量时 改变下拉刷新的提示 否则偏移量每次增加12
                        that.offset >= res.data.billboard.billboard_songnum - 12 ? that.config.loadingLabel = '已经没有更多数据了.亲' : that.offset += 12
                        // 重新赋值当前页面要渲染的数据
                        that.moreListData = res.data.song_list
                        resolve()
                    })
                    .catch(err => {
                        console.log(err)
                    })
              });
          })
      }
  }
};
</script>

<style scoped>
.wrapper {
  padding-top: 13px;
  text-align: center;
  margin-bottom: 10px;
  background: #fff;
  clear: both;
  overflow: hidden;
}

h3 {
  font-size: 22px;
  text-align: left;
  margin-left: 17px;
  margin-bottom: 5px;
}

.wrapper .info {
  width: 42%;
  float: left;
  text-align: center;
  padding-left: 17px;
  display: block;
  text-align: left;
  margin-bottom: 10px;
  position: relative;
}
</style>
