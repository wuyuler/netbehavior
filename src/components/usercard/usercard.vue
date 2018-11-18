<template>
    <div>
        <h1></h1>
        <el-card>
            <div slot="header">{{info.id}}</div>
            <el-row>
                <el-col :span="12">gender:</el-col>
                <el-col :span="12">{{info.gender}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="12">birthday:</el-col>
                <el-col :span="12">{{info.birthday}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="12">province:</el-col>
                <el-col :span="12">{{info.province}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="12">city:</el-col>
                <el-col :span="12">{{info.city}}</el-col>
            </el-row>
            <el-button style="float: right; padding: 3px 0" type="text" @click="toTopApp(info.id)">操作按钮</el-button>
        </el-card>
        
    </div>
</template>

<script>
export default {
    props:["info"],
    methods:{
        toTopApp(userid){
            console.log(userid)
            this.$router.push({name:'TopApp',params:{'userid':userid}});
        }
    }
}
</script>

<style>

</style>
