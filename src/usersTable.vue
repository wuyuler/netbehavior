<template>
    <div>
        <el-input v-model="input" placeholder="请输入用户id" :style="{width: '400px'}"></el-input>
        <el-button @click="toUserPage(input)">搜索</el-button>
    </div>

</template>

<script>
export default {
    data(){
        return{
            input:''
        }
    },
    methods:{
        toUserPage(userid){
            console.log(userid)
            this.$router.push({name:'TopApp',params:{'info':this.input}});
        }
    }
}
</script>

<style>

</style>
