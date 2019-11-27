
<template>
　<div id="app">
  　<el-button type="primary" @click="executeFile">运行文件</el-button>
    <p>这个文件执行结果是：{{response.split(',')}} </p>
　</div>
</template>
<script>
export default {
    data () {
            return {
                test:'123qwe',
                response:'',
                userInfo:{},
                loginInfo:{},
                treeData:[],
                dialogVisible:false,
                defaultProps:{children: 'children',label: 'name'}
            }
        },
        //created(){
        //    this.queryInfo();
        //},
    methods:{              
        executeFile(){
            console.log("enter in func executeFile")
            var _this=this;
             db.fileSystem.parse().then(response=>{
                 console.log(response);
                this.body=response.body;
                this.response = response
                this.test = "qwergtetgbtdh"
                console.log(response.body);
                _this.$message({
                    type: 'success',
                    message: success,
                    duration:5000,
                    showClose: true
                });  
            }).catch(err=>{
                _this.$message({
                type: 'error',
                message: err,
                showClose: true
                });
            })
        },
    }
}
</script>
