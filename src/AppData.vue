<template>
  <div>
    
  <el-input v-model="tableDataName" placeholder="请输入App名称" style="width:240px"></el-input>
  <el-button type="primary" @click="doFilter">搜索</el-button>
  <!-- <el-button type="primary" @click="openData">展示数据</el-button> -->
  <el-table
    :data="tableDataEnd"
    border
    style="width: 100%">
    <el-table-column
      prop="name"
      label="姓名">
    </el-table-column>
    <el-table-column label="操作">
        <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">在线情况
        </el-button>
        </template>
    </el-table-column>
  </el-table>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[50, 100, 150, 200]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalItems">
    </el-pagination>


    
    <!-- 近期使用情况柱状图 -->
    <el-dialog ref="dialog" title="一段时间使用人数变化" :visible.sync="dialogTableVisible"  >
      
      <div ref="myChart" :style="{width: '600px', height: '300px'}"></div>
      
</el-dialog>
</div>
</template>

<script>
export default {

  created(){
    this.getAppName()
  },
  mounted(){
    this.$refs.dialog.open();
    this.$refs.dialog.close();
  },
  data(){
    return{
      tableDataBegin:[],
      tableDataName: "",
      tableDataEnd: [],
      currentPage: 1,
      pageSize: 50,
      totalItems: 0,
      filterTableDataEnd:[],
      flag:false,
      dialogTableVisible: false,
      myChart:null
    }
  },
  methods:{
    initData(data){
      data.forEach((value)=>{
        this.tableDataBegin.push({name:value})
      })
      this.totalItems = this.tableDataBegin.length;
      if (this.totalItems > this.pageSize) {
        for (let index = 0; index < this.pageSize; index++) {
          this.tableDataEnd.push(this.tableDataBegin[index]);
        }
      } else {
          this.tableDataEnd = this.tableDataBegin;
      }
      
    },
    getAppName(){
      var self = this;
      this.$ajax({
        method:'get',
        url:"netdatas/getAllAppName",
        responseType:'json'
      }
      ).then(
        function(res){
          //console.log(res)
          self.initData(res.data) 
        }
      ).catch(function(err){
      console.log(err);
      })
    },
    drawline(name,xData,data){
       // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(this.$refs.myChart)
        // 绘制图表
        myChart.setOption({
            tooltip: {},
             title: { text: name },
            legend: {
                data:['在线人数']
            },
            dataZoom: [
        {
            type: 'slider',
            start: 1,
            end: 35
        },
         {   // 这个dataZoom组件，也控制x轴。
            type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
            start: 1,      // 左边在 10% 的位置。
            end: 35         // 右边在 60% 的位置。
        }
    ],  
            xAxis: {
                data: xData
            },
            yAxis: {},
            series: [{
                name: '在线人数',
               
                type:'line',
           
                data: data
            }]
        });
    },

    //前端搜索功能需要区分是否检索,因为对应的字段的索引不同
    //用两个变量接收currentChangePage函数的参数
    doFilter() {
      if (this.tableDataName == "") {
        this.$message.warning("查询条件不能为空！");
        return;
      }
      this.tableDataEnd = []
      //每次手动将数据置空,因为会出现多次点击搜索情况
      this.filterTableDataEnd=[]
      this.tableDataBegin.forEach((value, index) => {
        if(value.name){
          if(value.name.indexOf(this.tableDataName)>=0){
            this.filterTableDataEnd.push(value)
          }
        }
      });
      //页面数据改变重新统计数据数量和当前页
      this.currentPage=1
      this.totalItems=this.filterTableDataEnd.length
      //渲染表格,根据值
      this.currentChangePage(this.filterTableDataEnd)
      //页面初始化数据需要判断是否检索过
      this.flag=true
    },
    openData() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.handleCurrentChange(this.currentPage);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      //需要判断是否检索
      if(!this.flag){
      this.currentChangePage(this.tableDataBegin)
      }else{
      this.currentChangePage(this.filterTableDataEnd)      
      }
    }, //组件自带监控当前页码
    currentChangePage(list) {
      let from = (this.currentPage - 1) * this.pageSize;
      let to = this.currentPage * this.pageSize;
      this.tableDataEnd = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.tableDataEnd.push(list[from]);
        }
      }
    },

    //弹出对话框,展示图
    handleEdit(index, row) {
       this.dialogTableVisible=true;
        console.log(index, row);
        this.getDataToBar("netdatas/getDataByname",row.name)
        
        
      },

      //读取数据,填充到柱状图
      getDataToBar(url,name){
        var self = this;
        this.$ajax({
          method:'post',
          url:url,
          responseType:'json',
          params:{
            appName:name,
          
          }
        }
        ).then(
        function(res){
          console.log(res.data)
          self.drawline(name,res.data.xValue,res.data.value);
        }
        ).catch(function(err){
          console.log(err);
          })
        }
  

  }

}



</script>

<style>
 .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
 
  }
  
</style>