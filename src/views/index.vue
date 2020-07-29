
<template lang="html">
  <div class="index">
    <ul>
      <li>
         <router-link to="/home">
           <img src="../assets/logo-ea5.png" alt="">
         </router-link>
      </li>
      <li>
        <router-link to="/singer">
          歌手
        </router-link>
      </li>
      <li>
        <router-link to="/rank">
          榜单
        </router-link>
      </li>
      <li>
        <router-link to="/mine">
          我的
        </router-link>
      </li>
      <li>
        <router-link to="/search">
          搜索
        </router-link>
      </li>
    </ul>

    <!-- 点击上面菜单的哪个按钮就在下面对应展现出路由对应的组件 -->
    <router-view />
  </div>
</template>
<script>
export default {
}
</script>

<style scoped>

.index img{
  width: 26px;
  height: 26px;
}

.index ul{
  display: flex;
  height: 50px;
  line-height: 50px;
  background: #f9f9f9;
}

.index ul li {
  flex: 1;
  text-align: center;
}

.index ul li a{
  font-size: 16px;
  color: #999;
}

</style>
