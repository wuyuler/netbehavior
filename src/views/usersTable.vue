<template>
<div class="deit">
    <div class="crumbs">
      <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-date"></i> 数据管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb> -->
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true" :model="filters">
            <el-form-item>
              <el-input v-model="filters.name" placeholder="ID"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" v-on:click="getUsers">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <div class="cantainer">
                    <el-table style="width: 100%;" :data="onePageUsers" v-loading="listLoading">
                        <el-table-column type="index" width="100" align="center" label="序号">    
                        </el-table-column>
                        <el-table-column label="用户id" prop="id" width="200" align="center">    
                        </el-table-column>
                        <el-table-column label="性别" prop="gender" width="120" align="center">    
                        </el-table-column>
                        <el-table-column label="生日" prop="birthday" width="120" align="center">    
                        </el-table-column>
                        <el-table-column label="教育程度" prop="edu" width="120" align="center">    
                        </el-table-column>
                        <el-table-column label="工作" prop="job" width="120" align="center">    
                        </el-table-column>  
                        <el-table-column label="省份" prop="province" width="120" align="center">    
                        </el-table-column>  
                        <el-table-column label="城市" prop="city" width="120" align="center">    
                        </el-table-column> 
                        <el-table-column label="收入" prop="income" width="120" align="center">    
                        </el-table-column>  
                        <el-table-column label="查询详情" width="120" align="center" >
                          <template slot-scope="scope">
                          <el-button @click="toUserPage(scope.row.id)">详情</el-button>
                          </template>  
                        </el-table-column>
                    </el-table>
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[20, 50, 100]" 
                            :page-size="pagesize"       
                            layout="total,prev, pager, next, jumper"
                            :total="total==0?userList.length:total"
                            > 
                    </el-pagination>
        </div>
    </div>
  </div>
</template>

<script>
import { getUserInfoByPage } from "@/request/api";
export default {
  data() {
    return {
      listLoading:false,
      filters:{
        name:''
      },//用于检索用户
      currentPage:1,
      total:0,
      pagesize:20,
      userList:[],
      onePageUsers:[]
    }
  },
  created(){
     //this.handleUserList()
     this.getUsers();
  },
  methods: {
      handleUserList() {
        var self = this;
        this.$ajax({
          method:'get',
          url:'/users',
          responseType:'json',
        
        }
        ).then(
          function(res){
            console.log(res);
            self.userList=res.data
            }
        )
          .catch(function(err){
          console.log(err);
          })
        },
        //页面变换的回调函数,回调参数是当前页面
      handleCurrentChange(currentPage){
            this.currentPage=currentPage;
            this.getUsers();
            console.log(this.currentPage)
        },
        //根据当前页数,以及当前页的长度获取数据
        getUsers(){
          this.listLoading=true;
          var _this=this;
          let para={page:this.currentPage,
            pagesize:this.pagesize,
            name:this.filters.name
            };//封装好向远端申请需要的参数
          getUserInfoByPage(para).then((res)=>{
            _this.total=res.data.total;
            _this.onePageUsers=res.data.userlist;
            console.log(res);
            this.listLoading=false;
          })
          
    },
      handleSizeChange(size) {
                this.pagesize = size;
                //console.log(this.pagesize)  //每页下拉显示数据
        },
      toUserPage(userid){
            console.log(userid)
            this.$router.push({name:'FriendRecommand',params:{'info':userid}});
        }
    
  }
}
</script>
