<template lang="html">
  <div class="lrcContainer">
    <div class="lrc" ref="lrc">
        {{ getAllKey }}
      <!-- 动态绑定class是当前时间 大于了当前keyArr数组歌词出现的时间  小于了下一句keyArr数组歌词出现的时间就绑定样式 标红-->
      <p
        class="lrc-p"
        v-for="(item,key,index) in lrcData"
        :key="index"
        :class="{active:parseInt(currentTime) >= keyArr[index] && parseInt(currentTime) < keyArr[index+1]}" 
      >
        <!-- 遍历整理过后的对象 value是歌词 传递索引下标 和键名(每句歌词出现的数字时间) -->
        <!-- {{key == keyArr[index]}}  就是歌词对象中的key是当前应该出现的时间  等于keyArr[当前歌词对象的索引] 也是当前歌词应该出现的时间 等价 -->
        {{ item }}{{ srcollLrc(key,index) }}
      </p>
    </div>
  </div>
        
</template>

<script>
export default {
    data() {
        return {
            lrc:{},//保存根据songid请求回来的数据
            lrcData:{},//经过处理之后的歌词对象
            keyArr:[],//将处理的歌词对象遍历,存储每句歌词对应出现的时间
        }
    },

    props: {
        songId: {
            type: [String,Number],//不确定类型时,数组包裹
            default: ''
        },
        currentTime:{
            type:[String,Number],
            default:0
        },
        durationTime:{
            type:[String,Number],
            default:0
        }
    },

    mounted() {
        let lrcUrl = this.HOST + '/v1/restserver/ting?method=baidu.ting.song.lry&songid=' + this.songId//lrc组件通过接收的songid发送请求
        this.$Axios.get(lrcUrl)
            .then(res => {
                this.lrc = res.data//赋值给渲染的数据
                this.dealLrc()
            })
            .catch(err => {
                console.log(err)
            })
    },

    methods: {
        // 处理歌词格式
        dealLrc() {
            let that = this
            // 数据格式处理
            var lyrics = this.lrc.lrcContent.split("\n");
            var lrcObj = {};
            for(var i = 0 ;i<lyrics.length;i++){
            var lyric = decodeURIComponent(lyrics[i]);
            var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
            var timeRegExpArr = lyric.match(timeReg);
            if(!timeRegExpArr)continue;
            var clause = lyric.replace(timeReg,'');
                for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
                    var t = timeRegExpArr[k];
                    var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                        sec = Number(String(t.match(/\:\d*/i)).slice(1));
                    var time = min * 60 + sec;
                    lrcObj[time] = clause;
                }
            }
            that.lrcData = lrcObj//将处理完的对象保存到data数据中
        },

        // 监听歌词播放滑动
        srcollLrc(key,index){
            const lrcDiv = this.$refs.lrc
            // 如果歌词出现的时间key小于当前时间 且 歌词出现时间key大于了 当前时间减去下一句歌词出现时间和当前歌词出现的差值
            if(key < this.currentTime && key > this.currentTime - (this.keyArr[index+1] - this.keyArr[index])){
                lrcDiv.style.top = -((index-2)*30)+"px"
            }
        }
},

    computed:{
        getAllKey(){
        for(var i in this.lrcData){
            this.keyArr.push(i);
        }
    }
  },
}
</script>

<style scoped>

.lrcContainer{
  width: 100%;
  height: 150px;
  overflow: hidden;
  position: relative;
}

.lrc{
	width: 100%;
  position: absolute;
  top: 0;
}
.active{
  color: red !important;
}
.lrc-p{
  height: 30px;
	line-height: 30px;
}

.up30{
	margin-top: -30px;
}

</style>