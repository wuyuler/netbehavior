import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main.vue'
import UserData from '@/views/UserData.vue'
import AppData from '@/views/AppData.vue'
import Test from '@/views/Test.vue'
import TimeData from '@/views/TimeData'
import usersTable from '@/views/usersTable'
import TopApp from '@/views/TopApp'
import FriendRecommand from '@/views/FriendRecommand'
import Login from '@/views/Login'
Vue.use(Router)

export default new Router({
  mode:'history',
  base:__dirname,
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login,
      hidden:true
    },
    {
      path: '/',
      name: '数据基本统计分析',
      component: Main,
      redirect:'login',
      iconCls: 'iconfont  icon-shujufenxixianxing',
      children:[
        {name:'UserData',path:'userdata',component:UserData},
        {name:'AppData',path:'appdata',component:AppData},
        { name:'Test',path:'test',component:Test, hidden:true},
        {name:'TimeData',path:'timedata',component:TimeData},
       
        
       

      ]
    },{
      name:'好友推荐',
      path:'/',
      component:Main,
      iconCls: 'iconfont icon-ren',
      children:[
        {name:'FriendRecommand',path:'friendrecommand',component:FriendRecommand,hidden:true},
        {name:'usersTable',path:'userstable',component:usersTable},
        {name:'TopApp',path:'topapp',component:TopApp,hidden:true},
    ]
    }
  ]
})
