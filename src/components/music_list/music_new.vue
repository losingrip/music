<template lang="html">
  <div class="">
    <musicList :url="url" />
  </div>
</template>

<script>

import musicList from '../music_list/music_list'//引入显示的公共组件
export default {
  data(){
    return{
        // 当前热歌榜传递类型type=1
      url: "/v1/restserver/ting?method=baidu.ting.billboard.billList&type=1&size=5&offset=0"
    }
  },
  components:{
    musicList,
  }
}
</script>

<style lang="css">
</style>
