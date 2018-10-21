<template>
  <div >
    <div>
<el-row >
    <el-col :span="8" 
        >
        <div id="myChartGender" :style="{width: '400px', height: '400px'}" >
        </div>
        
    </el-col>
    <el-col :span="8">
        <div id="myChartJob" :style="{width: '550px', height: '400px'}" >
        </div>
    </el-col>
    <el-col :span="8" 
        >
        
        <div id="myChartIsCity" :style="{width: '400px', height: '400px'}" >
        </div>
        
    </el-col>
    
</el-row>
<el-row>
        <el-col :span="8" 
        >
        <div id="myChartEdu" :style="{width: '400px', height: '400px'}" >
        </div>
        
    </el-col>
     <el-col :span="8" 
        >
        
        <div id="myChartIncome" :style="{width: '550px', height: '400px'}" >
        </div>
        
    </el-col>
     <el-col :span="8" 
        >
        
        <div id="myChartProvince" :style="{width: '400px', height: '400px'}" >
        </div>
        
    </el-col>
</el-row>


       </div>
  </div>
</template>

<script>

        
export default {
  data(){
    return{
      xValue:[],
    }
  },
  created(){
    

  },
  mounted(){
    this.getDataToPie("users/getGender","myChartGender","男女");
    this.getDataToPie("users/getIsCity","myChartIsCity","城乡");
    this.getDataToPie("users/getIncome","myChartIncome","收入");
    this.getDataToPie("users/getEdu","myChartEdu","教育程度");
    this.getDataToPie("users/getJob","myChartJob","工作");
    this.getDataToPie("users/getProvince","myChartProvince","地域");
    
  },
  methods:{
    getDataToPie(url,chart,title){
       var self = this;
      this.$ajax({
        method:'get',
        url:url,
        responseType:'json'
      }
      ).then(
        function(res){
      self.xValue=res.data;
      self.drawline(self.xValue,title,"人数",chart)
}
      )
.catch(function(err){
console.log(err);
})
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

<style>

</style>