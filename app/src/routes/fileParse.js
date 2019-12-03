const Koa=require("koa");
const router=require("koa-router")();
const process=require('child_process');
const fs = require('fs');
var path = require('path');
let reStartPro="ls";//这是一条重启服务的linux命令,也可以是执行其他功能的命令~
 

function callback(err, stdout, stderr){
    console.log("enter in func callbacke stdout: " + stdout);
}
//对exec进行一个简单的封装，返回的是一个Promise对象，便于处理。
function doShellCmd(param){
    //let str=cmd;
    let result={};
    return new Promise(function(resolve,reject){
        console.log("******************enter in route doShellcmd func");
        var exePath = path.resolve(__dirname, param);
        console.log("exePath = " + exePath + " _dirname = " + __dirname);
        process.execFile(exePath,null,null,function (err, stdout, stderr) {

            console.log('execFile', stdout, err);
            callback(err, stdout, stderr);
            if(err){
                console.log('err');
                result.errCode=500;
                result.data="操作失败！请重试";
                reject(result);
            }else{
                console.log('stdout ',stdout);//标准输出
                result.errCode=200;
                result.data=stdout;
                resolve(result);
            }
        
        });
       /*! process.exec(str,function(err,stdout,stderr){
            if(err){
                console.log('err');
                result.errCode=500;
                result.data="操作失败！请重试";
                reject(result);
            }else{
                console.log('stdout ',stdout);//标准输出
                result.errCode=200;
                result.data=stdout;
                resolve(result);
            }
        })*/
    })
}



// 获取指定路径 path 下的，默认深度为 3 的目录 JSON
function getIndexByPath(dir) {
    let result={};
    return new Promise(function(resolve,reject){
        let dirDevide = dir.split('/');
        let preDir = dirDevide.splice(0, dirDevide.length - 1).join('/');
        let index = [];
        let id =0;
        getIndexOfPathByDeep(index, path.join(__dirname, preDir), dirDevide[0]);
        result.data =  JSON.stringify(index);
        /*[ { id: 35, label: 'bin1' ,
        children: [ { id: 36, label: 'adb' },
          { id: 37, label: 'adb_back' },
          { id: 38, label: 'adb_bak' },
          { id: 39, label: 'fastboot' },
          { id: 40, label: 'fastboot_bak' },
          { id: 41, label: 'repo' } ]} ];*/
      
        result.errCode = 200;
        resolve(result);
       // console.log(index);

    })
}
let id = 0;
// 开始对指定 path 递归查找深度为 deep 深度
function getIndexOfPathByDeep(obj, dir, curDir) {
    //console.log("dir = " + dir);
    let curPath = path.join(dir, curDir);
    let tmp = {};
   // console.log("*****************id = " + id);
    // 达到搜索深度，停止
   // if(deep) {
        tmp["id"] = id;
        id += 1;
        tmp["label"] = curDir;

       // obj[id] = tmp;
       // console.log(obj);
        if(fs.statSync(curPath).isDirectory()) {
            tmp["children"] = [];
            let lists = fs.readdirSync(curPath);

            lists.forEach(list => getIndexOfPathByDeep(tmp["children"], curPath, list))
        }
        obj.push(tmp);
        //console.log(obj);
   // }


}



//加URL
router.post('/fileSystem/parse', async ctx => {
    console.log("***********************enter in routes");
    console.log(ctx.request.body);
    var param = ctx.request.body;
    
    let result=await doShellCmd(param.pwd);//调用exec
    //getIndexByPath("/others"); 
   // console.log("[restartServer] ",result);
    ctx.response.status=result.errCode;
    ctx.response.body=result.data;

   // return result;
});

router.post('/fileSystem/getFileSystem', async ctx => {
    console.log("***********************enter in routes");
    let result=await getIndexByPath("/bin1");//调用exec
    //getIndexByPath("/others"); 
    console.log("[restartServer] ",result.data);
    ctx.response.status=result.errCode;
    ctx.response.body=result.data;
    console.log("*****[restartServer] ",ctx.response);
    //console.log(result);
   // return result;
});

module.exports = router;
