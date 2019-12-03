<template>
　<div id="app">

  <div class="block">
    <p>使用 scoped slot</p>
    
    <el-tree
      :data="data5"
      node-key="id"
      default-expand-all
      @node-click = "doOnClick"
       @node-expand="treeExpand"
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => showAppendNodeDialog(data)">
            <i class="el-icon-circle-plus"></i>
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            <i class="el-icon-delete-solid"></i>
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog
            title="添加节点"
            :visible.sync="appendNodeDialogVisible"
            width="600px"
            centerjsontree
           >
           <el-form :model="appendNode" label-width="100px">               
                <el-form-item label="节点名称">
                 <el-input v-model="appendNode.name"></el-input>
                </el-form-item>                
           </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="appendNodeDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doAppend(data)">确 定</el-button>
            </span>
       </el-dialog>
  </div>
  　<el-button type="primary" @click="executeFile">运行文件</el-button>

    <p>这个文件执行结果是：<br>{{response}} </p>
　</div>
</template>
<script>
    let id = 1000;
    export default {
        data () {
            const data = [{
                id: 1,
                label: '一级 1',
                children: [{
                id: 4,
                label: '二级 1-1',
                children: [{
                    id: 9,
                    label: '三级 1-1-1'
                }, {
                    id: 10,
                    label: '三级 1-1-2'
                }]
                }]
            }, {
                id: 2,
                label: '一级 2',
                children: [{
                id: 5,
                label: '二级 2-1'
                }, {
                id: 6,
                label: '二级 2-2'
                }]
            }, {
                id: 3,
                label: '一级 3',
                children: [{
                id: 7,
                label: '二级 3-1'
                }, {
                id: 8,
                label: '二级 3-2'
                }]
            }];
      return {
        data4: JSON.parse(JSON.stringify(data)),
        data5: data,
        appendNodeDialogVisible : false,
        appendNode:{},
        treeData:{},
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
                console.log(response.body);
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
                    this.response = response
                    console.log(response.body);
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
            }
        },
        queryInfo(){
            console.log("enter in func executeFile")
            var _this=this;
             db.fileSystem.getFileSystem().then(response=>{
                 console.log("***************************************************");
                 console.log(JSON.parse(JSON.stringify(this.data5)));
                console.log(JSON.parse(JSON.stringify(response)));
                 console.log("****************************************************");
                this.data5 = response;
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
            console.log(this.data5);
            console.log(data);
            this.appendNodeDialogVisible = true;
            this.treeData = {...data};
            
            console.log(this.treeData)

        },

        doAppend(data) {
            this.appendNodeDialogVisible = false;
            console.log("enter in func doAppend name: " + this.appendNode.name);
            const newChild = { id: id++, label: this.appendNode.name, children: [] };
                       console.log(this.data5);
                       console.log(treeData);
            if (!this.treeData.children) {
            this.$set(this.treeData, 'children', []);
            }
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" + this.treeData.children);
            this.treeData.children.push(newChild);
            this.data5 = treeData;
            console.log(this.data5);
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
