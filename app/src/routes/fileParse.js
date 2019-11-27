const Koa=require("koa");
const router=require("koa-router")();
const process=require('child_process');
var path = require('path');
let reStartPro="ls";//这是一条重启服务的linux命令,也可以是执行其他功能的命令~
 

function callback(err, stdout, stderr){
    console.log("enter in func callbacke stdout: " + stdout);
}
//对exec进行一个简单的封装，返回的是一个Promise对象，便于处理。
function doShellCmd(cmd){
    let str=cmd;
    let result={};
    return new Promise(function(resolve,reject){
        console.log("******************enter in route doShellcmd func");
        var exePath = path.resolve(__dirname, './test.sh');
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
//加URL
router.get('/fileSystem/parse', async ctx => {
    console.log("***********************enter in routes");
    let result=await doShellCmd(reStartPro);//调用exec
    console.log("[restartServer] ",result);
    ctx.response.status=result.errCode;
    ctx.response.body=result.data;

   // return result;
});


module.exports = router;