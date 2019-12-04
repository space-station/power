import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { copyFile } from 'fs';
const urlPrefix = "/manage"
export default new class {
    create(name, methods) {
        this.DB(name, methods);
    }
    DB(name, methods) {
        for (let method in methods) {
            console.log("method: " + method + " name: " + name);
            const config = methods[method];
            if (!this[name]) this[name] = {};
            this[name][method] = params => new Request(config, params);
        }
    }
}

function Request(config, params) {
    let cfg = {
        method: config.method,
        url: urlPrefix + config.url
    }
    console.log("enter in Request method: " + cfg.method + " url : " + cfg.url);
    console.log("enter in Request params: " + params);
    if (config.method == "post") cfg.data = params
    else cfg.params = params
    return new Promise((resolve, reject) => {
        axios(cfg).then(res => {
            if (res.data.errMsg) {
                let hash = location.hash;
                if (!((hash == '#/login' || hash == '#/') && res.data.notLogged)) {
                    if (global.gMsg) gMsg.close();
                    global.gMsg = Message({
                        type: 'warning',
                        message: res.data.errMsg
                    });
                }
                if (res.data.notLogged) {
                    location.hash = "#/login"
                }
                reject(res.data.errMsg);
            } else if (res.data.errBox) {
                MessageBox.confirm(res.data.errBox, '提示', {
                    confirmButtonText: '确定',
                    showCancelButton: false,
                    type: "error"
                })
                reject(res.data.errBox);
            } else {
                resolve(res.data)
            }
        } ).catch (res =>{
            console.log(" enter in catch " );
        }).finally(res =>{
            console.log("enter in finally" );
        })
    })
}
