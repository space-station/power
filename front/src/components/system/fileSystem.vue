
<template>
　<div id="app">
  　<el-button type="primary" @click="executeFile">运行文件</el-button>
    <p>这个文件执行结果是： {{count}}</p>
　</div>
</template>
<script>
export default {
    methods:{
        executeFile(){
            console.log("enter in func doAddUser")
            context : "test for next step"
        }
    }
}
</script>
