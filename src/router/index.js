import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '@/Main.vue'
import UserData from '@/UserData.vue'
import AppData from '@/AppData.vue'
import Test from '@/Test.vue'

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
        {name:'AppData',path:'appdata',component:AppData},{
          name:'Test',path:'test',component:Test
        }
      ]
    }
  ]
})
