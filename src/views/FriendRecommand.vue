<template>
    
    <div>
        <h1>{{userid}}</h1>
        <el-row>
            <el-col :span="6" v-for="(userinfo,index) in userlist" :key="index">
                <usercard :info=userinfo></usercard>
            </el-col>
        </el-row>
    
    </div>
</template>

<script>
export default {
    data(){
        return{
            userid:"",
            userlist:[]
        }
    },
    created(){
        let info = this.$router.history.current.params.info;
    //防止F5刷新丢失信息
      if (info) {
        sessionStorage.setItem("detailItem12", info);
      }
      let userid = sessionStorage.getItem("detailItem12") + '';
      //if(this.userid!=null)
      this.userid = userid;
    },
    mounted(){
        if(this.userlist)
        this.getFriend(this.userid)
    },
    methods:{
        getFriend(userid){
            var self = this;
            this.$ajax({
                method:'get',
                url:'kmeans/getfri',
                responseType:'json',
                params:{
                userid:userid,
                }
            }
            ).then(
        function(res){
          console.log(res);
            self.userlist=res.data;
          }
      )
        .catch(function(err){
        console.log(err);
        
        })
        }
    }
}
</script>

<style>

</style>
