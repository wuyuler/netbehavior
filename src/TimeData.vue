<template>
  <div>
    
    <el-input v-model="input" placeholder="检索日期" :style="{width: '200px'}"></el-input>
    <el-button @click="getDataToBar('/usertime/getMapTimeAndNum',input,'上线时间统计','len_time')">查询</el-button>
    <div id="len_time" :style="{width: '1800px', height: '600px'}"></div>


  </div>
  
   
</template>

<script>
export default {
  data(){
    return{
      input:""
    }
    
  },
  // //在网页加载前都要调用一次,可以用来回去数据
  // mounted(){
  //   this.getDataToBar('/usertime/getMapTimeAndNum',input,'时间数据分析','len_time')
  // },
  methods:{
    //访问后端,得到绘制柱状图的数据,并绘制
    getDataToBar(url,date,title,element_id){
      var self = this;
      this.$ajax({
        method:'post',
        url:url,
        responseType:'json',
        params:{
          date:date
        }
      }
      ).then(
        function(res){
          console.log(res);
      self.drawline(res.data.xValue,res.data.yValue,title,element_id)
      
}
      )
.catch(function(err){
console.log(err);
})
    },
    //绘制柱状图,通过访问后端得到的数据
    drawline(X,Y,title,element_id){
      // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById("len_time"))
        // 绘制图表
        myChart.setOption({
          title: { 
            text: title,
            
          },
          xAxis: {
          data:X
        },
        yAxis: {},
        series: [{
          type: 'bar',
          data: Y,
          itemStyle: {
					normal: {
					  label: {
					    show: true, //开启显示
					    position: 'top', //在上方显示
					    textStyle: { //数值样式
					      color: 'black',
								fontSize: 16
									}
					}
						}

          }
        }
        ]

        });

    }
  }
 
}
</script>

<style>

</style>