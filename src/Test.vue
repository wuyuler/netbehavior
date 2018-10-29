<template>
<div>
  <h1>{{title}}</h1>
  <!-- 最喜欢的app排名前5 -->
  <div id="fav_app" :style="{width: '300px', height: '300px'}"></div>
  <!-- 使用该app的人群分布 -->
  <div id='userApp' :style="{width: '300px', height: '300px'}" ></div>
</div>
</template>

<script>
export default {
  data() {
    return {
      title:'',
      fav_app_data:[12,56,77],
      userApp1:[1,2,3],
      userApp2:[2,3,5],
      userapp_title:'username',
      area_perosn1:[{name:'老师',value:3},{name:'学生',value:3},{name:'白领',value:5}],
      area_perosn2:[{name:'老师',value:4},{name:'学生',value:11},{name:'白领',value:33}]

    }
  },
  created(){
     let info = this.$router.history.current.params.info;
	  //  let info = this.$route.params.info;
      if (info) {
        sessionStorage.setItem("detailItem12", info);
      }
      let title = sessionStorage.getItem("detailItem12") + '';
      this.title = title;
  },
  mounted() {
   this.drawFavApp();
   this.drawUserApp(this.title,this.area_perosn1);
  },
  methods: {
    drawFavApp(){
      // 绘制最喜爱的app,top4
      // 基于准备好的dom，初始化echarts实例
      var self=this
      let myChart = this.$echarts.init(document.getElementById("fav_app"))
      //绘制图表
      myChart.setOption({
        title:{text:'app'},
        tooltip: {},
        xAxis: {
          data: ['qq','360','google']
        },
        yAxis:{},
        series:[{
          type:'bar',
          data:this.fav_app_data
        }]
      });
      myChart.on('click', function (params) {
      // 控制台打印数据的名称
      self.drawUserApp('新数据',[{name:'老师',value:4},{name:'学生',value:11},{name:'白领',value:33}])
      });

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