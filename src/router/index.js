import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/Main.vue'
import UserData from '@/UserData.vue'
import AppData from '@/AppData.vue'
import Test from '@/Test.vue'
import TimeData from '@/TimeData'
import usersTable from '@/usersTable'
import TopApp from '@/TopApp'
import FriendRecommand from '@/FriendRecommand'
Vue.use(Router)

export default new Router({
  mode:'history',
  base:__dirname,
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      redirect:'userdata',
      children:[
        {name:'UserData',path:'userdata',component:UserData},
        {name:'AppData',path:'appdata',component:AppData},
        { name:'Test',path:'test',component:Test},
        {name:'TimeData',path:'timedata',component:TimeData},
        {name:'usersTable',path:'userstable',component:usersTable},
        {name:'TopApp',path:'topapp',component:TopApp},
        {name:'FriendRecommand',path:'friendrecommand',component:FriendRecommand},

      ]
    }
  ]
})
