<template lang="html">
  <div>
    <rankList v-for="(item,index) in musicTypeJSON" :key="index" :musicType="item" />
  </div>
</template>

<script>

import MusicType from "../assets/data/musictype.json"//引入音乐类型的json文件,是一个数字构成的数组
import rankList from "../components/rank_list"

export default {
  data(){
   return{
     musicTypeJSON:[],//存储关于歌曲类型的数组
   }
  },
  components:{
    rankList
  },
  created(){
    this.musicTypeJSON = MusicType.currentType//是一个数组
  }
}
</script>

<style lang="css">
</style>
