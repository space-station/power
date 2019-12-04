<template>
　<div id="app">
    <el-container style="height: 520px;  overflow-y: scroll;">
        <el-tree
        :data="treeNode"
        node-key="id"
        default-expand-all
        @node-click = "doOnClick"
        @node-expand="treeExpand"
        :expand-on-click-node="false">      
        </el-tree>
    </el-container>
    <el-container style="height: 300px; border: 1px solid #eee; overflow-y: scroll; ">
        <p>文件解析结果：<br>
         <ol>
            <li v-for="f in files">
            {{ f }}
            </li>
        </ol>
        </p>
    </el-container>
  </div>
</template>
<script>
    let id = 1000;
    export default {
    data () {            
      return {
        treeNode: [],
        appendNodeDialogVisible : false,
        appendNode:{},
        treeData:{},
        files:[],
        response:'',
        defaultProps:{children: 'children',label: 'name'}
        }
    },
    created(){
        this.queryInfo();
    },
    methods:{              
        executeFile(){
            console.log("enter in func executeFile")
            var _this=this;
             db.fileSystem.parse().then(response=>{
                 console.log(response);
                this.response = response
                
                _this.$message({
                    type: 'success',
                    message: "successful",
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
        // 当节点打开时，记录下打开节点的id
            treeExpand(data, node, self) {
                console.log(data);
                console.log(node)
                this.treeExpandedKeys.push(data.id);
            },
         doOnClick(data, node, self){
            console.log("enter in func doOnClick")
            console.log(data);
            console.log(node.isLeaf);
            console.log(node)
            var tmpNode = node;
            var path = node.label;
            while(tmpNode.parent.parent != null){
                path = tmpNode.parent.label + "/" + path;
                tmpNode = tmpNode.parent;
            }
            console.log(path);
            if (node.isLeaf){
                var _this=this;
                db.fileSystem.parse({"pwd":path}).then(response=>{
                    console.log(response);
                    this.files = response.split('\n');
                }).catch(err=>{
                    console.log("response failed!");
                    this.response='';                    
                })
            }
        },
        queryInfo(){
            console.log("enter in func executeFile")
            var _this=this;
             db.fileSystem.getFileSystem().then(response=>{
                this.treeNode = response;
                console.log("body: " + response);
                _this.$message({
                    type: 'success',
                    message: "successful",
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

        handleNodeClick(data) {
            console.log("tree clicked!" + data.id + " " + data.label)

            console.log(data);
        },
        showAppendNodeDialog(data){
            console.log("enter in func showAppendNodeDialog");
            console.log(this.treeNode);
            console.log(data);
            this.appendNodeDialogVisible = true;
            this.treeData = {...data};
            
            console.log(this.treeData)

        },

        doAppend(data) {
            this.appendNodeDialogVisible = false;
            console.log("enter in func doAppend name: " + this.appendNode.name);
            const newChild = { id: id++, label: this.appendNode.name, children: [] };
                       console.log(this.treeNode);
                       console.log(treeData);
            if (!this.treeData.children) {
            this.$set(this.treeData, 'children', []);
            }
            this.treeData.children.push(newChild);
            this.treeNode = treeData;
            console.log(this.treeNode);
        },

        remove(node, data) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
        },

        renderContent(h, { node, data, store }) {
            return (
            <span class="custom-tree-node">
                <span>{node.label}</span>
                <span>
                <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
                <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
                </span>
            </span>);
        }

    }
}
</script>
<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>