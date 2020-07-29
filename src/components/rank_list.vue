<template lang="html">
  <div class="listcate">
    <div  tag="div" class="cate-item">
        <!-- 点击跳转到榜单详情列表 通过路由传递参数是榜单的类型type -->
      <router-link tag="div" :to="{name: 'rankDetail',params:{musicType: musicType}}" class="item-content">
        <div class="cate-post">
            <!-- 绑定该榜单的图片和title信息 -->
          <img :src="rankData.billboard.pic_s192" :alt="rankData.billboard.name">
        </div>
        <ul class="cate-hot">
          <li v-for="(item,index) in rankData.song_list" :key="index">
              <!-- 排名 -->
            <span class="col-rank" :title="item.rank">{{ item.rank }}</span>
            <!-- 歌曲名 -->
            <span class="col-title">{{ item.title }} - {{ item.author }}</span>
          </li>
        </ul>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rankData: {
        song_list: [],//歌曲的列表
        billboard: {}//歌曲其余的信息
      }
    };
  },
  props: {
    musicType: {
      type: [String, Number],
      default: 1
    }
  },
  mounted() {
    //   通过组件传递的歌曲类型 请求数据
    const ListCateUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.billboard.billList&type=" + this.musicType + "&size=3&offset=0";
    this.$Axios
      .get(ListCateUrl)
      .then(res => {
        this.rankData = res.data;//将获取回来的data数据对象保存到本地的data对象rankData中
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style lang="css">
.listcate {
  padding: 0 17px 20px;
  font-size: 16px;
  background: #fff;
}

.cate-item {
  border-bottom: 1px solid #eee;
  padding: 20px 0;
}

.item-content {
  display: flex;
}

.cate-post {
  position: relative;
  color: #fff;
  font-size: 18px;
  height: 96px;
  width: 96px;
}

.cate-post img {
  width: 100%;
  height: 100%;
}

.cate-item .cate-hot {
  flex: 1;
  margin-left: 14px;
  padding: 6px 0;
}

.cate-item .cate-hot li {
  padding: 6px 0;
  height: 17px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #666;
  font: 15px 700;
}

.cate-item .cate-hot li .col-rank {
  color: #fa6644;
  font-family: Arial;
  font-weight: 700;
  font-style: italic;
}
.cate-item .cate-hot li .col-title {
  line-height: 17px;
  color: #343434;
  text-indent: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  width: 140px;
}
</style>
