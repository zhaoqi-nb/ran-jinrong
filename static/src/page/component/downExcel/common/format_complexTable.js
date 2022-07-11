'use strict';

import fill from 'lodash/fill';
import cloneDeep from 'lodash/cloneDeep';

//添加空 子元素
function addEmptyChild(data){
    return data.map(item=>{
        if(!item.children) item["children"] = [{"title":"","dataIndex":item.dataIndex}]
        return item;
    })
}

//
function getHeader(data){
    let indexKeys = [],
        header    = [],
        merges    = [];

    const loopHeader = (arr, index=0) =>{
        let list = [];
        for(let i=0,len=arr.length;i<len;i++){
            let obj       = arr[i],
                title     = obj.original_title?obj.original_title: obj.title,
                dataIndex = obj.dataIndex,
                children  = obj.children;
            if (Object.prototype.toString.call(obj.title) === '[object Object]') {
                title = obj.orginTitle;
            }
            list.push(title);
                
            if(children && children.length){
                loopHeader(children,index+1);
                //生成空占位符
                let emptyLen = children.length-1;
                let temp = fill(new Array(emptyLen), '', 0, emptyLen);
                //合并
                let start = list.length-1,
                    end   = start+children.length-1;

                // //行合并
                // if(children.length==1){
                //     //目前复杂表头是两行，默认先这么写，以后在更新
                //     merges.push({s: {r: 0, c: start}, e: {r: 1, c: end}})
                // }else {//列合并
                    merges.push({s: {r: index, c: start}, e: {r: index, c: end}})
                // }
                //填充占位符
                list = list.concat(temp);
            }else if(dataIndex){
                indexKeys.push(dataIndex);
            }
        }

        header[index] = (header[index] || []).concat(list);
    }

    //补充空数据
    data = addEmptyChild(data);

    loopHeader(data)

    return {
        indexKeys,
        header,
        merges
    };
}


//复杂表头 表格
export function geComplexTableSplitData(columns, datas){
    let dataSource = [];

    let { header, indexKeys, merges } = getHeader(cloneDeep(columns));
 
    console.log(`indexKeys=${indexKeys} header=${header}`);

    const loopData = (arr) =>{
        for(let i=0,len=arr.length;i<len;i++){
            let obj = arr[i];
            let list = [];
            for(let k=0,k_len = indexKeys.length;k<k_len;k++){
                let value = obj[indexKeys[k]]
                list.push(value);
            }
            dataSource.push(list);
            if (Array.isArray(obj.children)) {
                loopData(obj.children);
            }
        }
    }

    //数据
    loopData(datas)
    
    return {
        dataSource,
        header,
        merges
    }
}