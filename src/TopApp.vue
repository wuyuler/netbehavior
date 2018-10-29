<template>
<div>
  <h1>{{title}}</h1>
  <!-- 最喜欢的app排名前5 -->
  <div id="fav_app" :style="{width: '1500px', height: '600px'}"></div>
  <!-- 使用该app的人群性别分布 -->
  <div id='userApp' :style="{width: '1000px', height: '600px'}" ></div>
</div>
</template>

<script>
export default {
  data() {
    return {
      userid:'',
      fav_app_data:[12,56,77],
      userApp1:[1,2,3],
      userApp2:[2,3,5],
      //userapp_title:'username',
      // area_perosn1:[{name:'老师',value:3},{name:'学生',value:3},{name:'白领',value:5}],
      // area_perosn2:[{name:'老师',value:4},{name:'学生',value:11},{name:'白领',value:33}]

    }
  },
  created(){
     let info = this.$router.history.current.params.info;
	  //  let info = this.$route.params.info;
      if (info) {
        sessionStorage.setItem("detailItem12", info);
      }
      let userid = sessionStorage.getItem("detailItem12") + '';
      this.userid = userid;
  },
  mounted() {
    this.getTopApp("/appcount/getTopApp",this.userid,5)
    //this.drawUserApp(this.title,this.area_perosn1);
  },
  methods: {

    getTopApp(url,userid,num){
      var self = this;
      this.$ajax({
        method:'post',
        url:url,
        responseType:'json',
        params:{
          userid:userid,
          num:num
        }
      }
      ).then(
        function(res){
          console.log(res);
          self.drawFavApp(res.data.xValue,res.data.yValue)
          }
      )
        .catch(function(err){
        console.log(err);
        
        })
    },
    drawFavApp(xValue,yValue){
      // 绘制最喜爱的app,top4
      // 基于准备好的dom，初始化echarts实例
      var self=this
      let myChart = this.$echarts.init(document.getElementById("fav_app"))
      //绘制图表
      myChart.setOption({
        title:{text:'app'},
        tooltip: {},
        xAxis: {
          data: xValue
        },
        yAxis:{},
        series:[{
          type:'bar',
          data:yValue
        }]
      });
      //给图表添加点击事件,根据不同的app返回其情况
      myChart.on('click', function (params) {
        self.getJobOfApp("/appcount/getJobOfApp",params.name)
      });

    },
    getJobOfApp(url,appname){
      var self = this;
      this.$ajax({
        method:'post',
        url:url,
        responseType:'json',
        params:{
          appname:appname,
        }
      }
      ).then(
        function(res){
          console.log(res);
          self.drawUserApp(appname,res.data)
          }
      )
        .catch(function(err){
        console.log(err);
        
        })
    },
    drawUserApp(title,num_person){
      //绘制对应某个app的使用人群
      // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById("userApp"))
        //绘制图表
        myChart.setOption({
          title:{text:title},
          tooltip: {},
          series:[{
            type:'pie',
            data:num_person
          }]
        });
    }
  }
}
</script>