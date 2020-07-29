<template lang="html">
  <div class="artists">
      <ul class="list">
          <!-- 点击跳转到歌手详情页面 并将当前点击歌手对应的id传递 -->
        <router-link tag="li" :to="{name:'singerList',params:{singerId:item.ting_uid}}" :key="index" class="artist" v-for="(item,index) in singerData">
          <div class="pic">
            <img :alt="item.name" :src="item.avatar_s500">
          </div>
          <div class="info">
            <div>{{ item.name }}</div>
          </div>
        </router-link>
      </ul>
    </div>
</template>

<script>
export default {
  name: "singer",
  data() {
    return {
      singerArr: ["2517","7994","1091","45561","2507","245815","1077","1204","1117","82366"],//默认存储的10个歌手id
      singerData: [],//保存根据歌手id请求回来的歌曲,数组分别保存每一位歌手的歌曲
    };
  },
  mounted() {
    for (var i = 0; i < this.singerArr.length; i++) {
        const singerURL = this.HOST + "/v1/restserver/ting?method=baidu.ting.artist.getInfo&tinguid=" + this.singerArr[i]//根据歌手id发送请求
        this.$Axios
            .get(singerURL)
            .then(res => {
            this.singerData.push({
                avatar_s500: res.data.avatar_s500,//头像
                name: res.data.name,//名字
                ting_uid: res.data.ting_uid//歌手id
            })
        })
        .catch(error => {
            console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.artists {
  padding: 0 17px;
  background: #fff;
}

.list li {
  padding-left: 0;
  min-height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f2f2f2;
}

.pic {
  width: 54px;
  height: 54px;
  margin-right: 15px;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 16px;
}

.pic img {
  border-radius: 27px;
  overflow: hidden;
}
</style>
