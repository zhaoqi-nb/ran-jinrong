/*
 * @Description: 文件描述
 * @version: 1.0
 * @Company: fengjr
 * @Author: lin.li@fengjr.com
 * @LastEditors: OBKoro1
 * @Date: 2019-03-14 20:09:01
 * @LastEditTime: 2019-03-26 14:15:37
 */

'use strict';

//设置事件方法
export function setEvnetFun(funId, callback=()=>{}){
    if(!funId) return null;
    Event[funId] = callback;
}

//调用事件方法
export function triggerEvnetFun(funId, param=null){
    if(!funId || !Event[funId]) return null;
    try {
        let fun = Event[funId];
        return fun(param);
    } catch (error) {
        console.log(error);
    }
}

//销毁方法
export function destroyEvnetFun(funId){
    if(!funId && Event[funId]) return null;
    delete Event[funId];
}

//触发clearState数据
export function triggerClearStateData(effectElement){
    if(!effectElement || !effectElement.length) return;
    for(let i=0,len=effectElement.length;i<len;i++){
        let id = effectElement[i];
        triggerEvnetFun(`clearStateData_${id}`);
    }
}