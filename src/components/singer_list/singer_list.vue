<template lang="html">
  <div class="singer-list">
    <!-- 将router接收的singerId参数再传递给title和list组件,再他们之间通过请求获取头像和歌曲列表数据 -->
    <singerTitle :singerId='this.$route.params.singerId' />
    <singerList :singerId='this.$route.params.singerId' />
  </div>
</template>

<script>
import singerTitle from "./singer_list_title"
import singerList from "./singer_list_list"

export default {
  data() {
    return {};
  },
  components: {
    singerTitle,
    singerList
  }
};
</script>

<style lang="css">
</style>
