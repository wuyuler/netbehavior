<template>
  <el-container style="  border: 1px solid #eee">
  <el-header class="el-header">
    
      <el-menu mode="horizontal" 
      :default-active="activeIndex"
       calss="el-menu" 
       background-color=#545c64
        text-color=#fff 
        active-text-color=#ffd04b
       :router=true
        >
      <el-menu-item index="userdata"> 
       
      <div>采样用户数据分析展示</div>
        
        </el-menu-item> 
    
     <el-menu-item index="appdata">
      
      <div>设计软件数据分析展示</div>
    </el-menu-item>
     <el-menu-item index="timedata">
      
      <div>时间分析展示</div>
    </el-menu-item>
   
  

  </el-menu>

      

  
  
  </el-header>
<el-main class="el-main">
  
            <transition name="el-fade-in-linear">
         <router-view></router-view>
          </transition>
         
    

</el-main>

</el-container>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeIndex: "userdata"
    };
  },
 
}
</script>

<style>
a {
  text-decoration: none;
}
.el-header {
  background-color: #545c64;
}
.el-main {
  /* background-color: #E9EEF3; */
  color: #333;
  text-align: center;
  
}
.el-menu {
  width: 100%;
  height: 100%;
  display: inline-table;
}
</style>