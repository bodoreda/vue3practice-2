import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import BoardList from '@/views/BoardList.vue'
import BoardDetail from '../views/BoardDetail.vue'
import BoardWrite from '../views/BoardWrite.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //목록
  //글쓰기
  //상세글
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },    
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ '../views/PageAbout.vue')

    },
    {
      path: '/board/list',
      name: 'list',
      component: BoardList
    },
    {
      path: '/board/write',
      name: 'write',
      component: BoardWrite
    },
    {
      path: '/board/detail',
      name: 'detail',
      component: BoardDetail
    }
  ]
})

export default router
