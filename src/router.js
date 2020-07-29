import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index.vue'//views下面的主入口文件
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {//音乐播放展示页面 和Index组件同级,都显示在App.vue里面
        path: '/musicplay',
        name: 'musicplay',
        component: () => import('./views/musicPlay.vue')
      },
      { //主入口,在App.vue里面显示Index路由组件 默认跳转到home
        path: '/',
        name: 'Index',
        component: Index,
        redirect: '/home',
        children: [
          { //在Index组件中默认显示home组件
            path: 'home',
            name: 'home',
            redirect: '/home/hot',
            component: () => import('./views/home.vue'),
            children: [
              {
                path: 'hot',
                name: 'hot',
                component: () => import('./components/music_list/music_hot.vue')
              },
              {
                path: 'king',
                name: 'king',
                component: () => import('./components/music_list/music_king.vue')
              },
              {
                path: 'new',
                name: 'new',
                component: () => import('./components/music_list/music_new.vue')
              }
            ]
          },
          {
            path: 'singer',
            name: 'singer',
            component: () => import('./views/singer.vue')
          },
          {
            path: 'rank',
            name: 'rank',
            component: () => import('./views/rank.vue')
          },
          {
            path: 'mine',
            name: 'mine',
            component: () => import('./views/mine.vue')
          },
          {
            path: 'search',
            name: 'search',
            component: () => import('./views/search.vue')
          },
          {
            path: 'more',//今日榜单和热门歌单的更多详情页面,和home等组件是同级的,显示在Index组件内
            name: 'more',
            component: () => import('./views/moreMusic.vue')
          },
          {
            path: 'singerList',//点击歌手后进入歌手详情页,和home组件等是同级的,显示在Index组件内
            name: 'singerList',
            component: () => import('./components/singer_list/singer_list.vue')
          },
          {
            path: 'rankDetail',//点击榜单后进入每个榜单对应的歌曲页面,和home组件等是同级的,显示在Index组件内
            name: 'rankDetail',
            component: () => import('./components/rank_list_detail.vue')
          },
        ]
      }
  ]
})
