<template>
  <div >
   
<el-row >
    <el-col :span="8" >
        <div id="myChartGender" style="width:100%; height:400px;"> </div>
    </el-col>
    <el-col :span="8">
        <div id="myChartJob" style="width:100%; height:400px;">  </div>
    </el-col>
    <el-col :span="8" >
        <div id="myChartIsCity" style="width:100%; height:400px;" ></div>
    </el-col>
    <el-col :span="8" >
        <div id="myChartEdu" style="width:100%; height:400px;" ></div>
    </el-col>
     <el-col :span="8" >
        <div id="myChartIncome" style="width:100%; height:400px;" ></div>
    </el-col>
     <el-col :span="8" >
        <div id="myChartProvince" style="width:100%; height:400px;" ></div>
    </el-col>
</el-row>


       
  </div>
</template>

<script>
import {getUserdata} from "@/request/api"; 
export default {
  data(){
    return{
      xValue:[],
    }
  },
  mounted(){
    //this.getDataToPie("users/getGender","myChartGender","男女");
    this.getdataAndDraw("users/getGender","myChartGender","男女");
    this.getdataAndDraw("users/getIsCity","myChartIsCity","城乡");
    this.getdataAndDraw("users/getIncome","myChartIncome","收入");
    this.getdataAndDraw("users/getEdu","myChartEdu","教育程度");
    this.getdataAndDraw("users/getJob","myChartJob","工作");
    this.getdataAndDraw("users/getProvince","myChartProvince","地域");
    
  },
  methods:{
      getdataAndDraw(url,chart,title){
          var self = this;
        getUserdata(url).then(function(res){
            self.xValue=res.data;
            self.drawline(self.xValue,title,"人数",chart)})
      },
    drawline(data,title,name,id){
       // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById(id))
        // 绘制图表
        myChart.setOption({
            title: { text: title },
            series: [{
                label: {
                    normal: {
                        show: true,
                        //position: 'inside',
                        formatter: '{b}'//多值的嵌套
                    },
                    },
            radius:'55%',
            name: name,
            type: 'pie',
            data:data
            }]

        });
            
    }
  }
}
</script>

<style scoped>
    .el-col {
        padding: 30px 20px;
    }
</style>