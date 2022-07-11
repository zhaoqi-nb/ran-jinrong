/*
 * @FileDescription    : 文件描述  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-06-07 15:45:01 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: 2019-01-16 11:06:21
 */
 
'use strict';


var fs = require('fs');

function geFileList(path) {
    var filesList = [];
    readFile(path, filesList);
    return filesList;
}

//遍历读取文件 
function readFile(path, filesList) {
    let files = fs.readdirSync(path);//需要用到同步读取 
    files.forEach(walk);
    function walk(file) {
        let states = fs.statSync(path + '/' + file);
        if (states.isDirectory()) {
            readFile(path + '/' + file, filesList);
        }
        else {
            //创建一个对象保存信息 
            var obj = new Object();
            obj.size = states.size;//文件大小，以字节为单位 
            obj.name = file;//文件名 
            obj.path = path + '/' + file; //文件绝对路径 
            filesList.push(obj);
        }
    }
}


//获取文件夹大小
exports.getFolderSize = (path) =>{
    let list = geFileList(path);
    let size = 0;
    list.forEach(item=>{
        size+=item.size;
    })
    return size;
}
