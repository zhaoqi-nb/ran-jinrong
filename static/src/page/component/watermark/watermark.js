'use strict';
import { getMenuData } from '../date/util/index';

const removeDiv = (dom) =>{
    let eleArray = dom.querySelectorAll(".mask_div");
    eleArray.forEach((ele)=>{
        ele.parentNode.removeChild(ele); 
    })
}

export function watermark(dom, settings) {
    if(!dom) return;

    //删除
    removeDiv(dom);

    const menuData = getMenuData();
    const userInfo = menuData.userInfo;
    const userName = userInfo&&false?userInfo.name:"燃数科技";
    const company  = userInfo&&false?userInfo.dept:"DATA BURNING"
    
    //默认设置
    var defaultSettings={
        watermark_txt:`${userName} <br/> ${company}`,
        watermark_x:20,//水印起始位置x轴坐标
        watermark_y:20,//水印起始位置Y轴坐标
        watermark_rows:50,//水印行数
        watermark_cols:20,//水印列数
        watermark_x_space:50,//水印x轴间隔
        watermark_y_space:50,//水印y轴间隔
        watermark_color:'rgb(191, 183, 183)',//水印字体颜色
        watermark_alpha:0.4,//水印透明度
        watermark_fontsize:'17px',//水印字体大小
        watermark_font:'微软雅黑',//水印字体
        watermark_width:210,//水印宽度
        watermark_height:80,//水印长度
        watermark_angle:15//水印倾斜度数
    };
    //采用配置项替换默认值，作用类似jquery.extend
    for(let key in settings)
    {
        if(settings[key]&&defaultSettings[key]&&settings[key]===defaultSettings[key])
            continue;
        else if(settings[key])
            defaultSettings[key]=settings[key];
    }

    var oTemp = document.createDocumentFragment();

    /** 暂时先用document.body获取宽、高，防止之前有的页面的元素没有增加水印
     * var page_width = Math.max(dom.scrollWidth,dom.clientWidth);
     * var page_height = Math.max(dom.scrollHeight,dom.clientHeight);
    */
    //获取页面最大宽度
    var page_width = Math.max(document.body.scrollWidth,document.body.clientWidth);
    var cutWidth = page_width*0.0150;
    var page_width=page_width-cutWidth;
    //获取页面最大高度
    var page_height = Math.max(document.body.scrollHeight,document.body.clientHeight)+450;
    // var page_height = document.body.scrollHeight+document.body.scrollTop;
    //如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
    if (defaultSettings.watermark_cols == 0 || (parseInt(defaultSettings.watermark_x + defaultSettings.watermark_width *defaultSettings.watermark_cols + defaultSettings.watermark_x_space * (defaultSettings.watermark_cols - 1)) > page_width)) {
        defaultSettings.watermark_cols = parseInt((page_width-defaultSettings.watermark_x+defaultSettings.watermark_x_space) / (defaultSettings.watermark_width + defaultSettings.watermark_x_space));
        defaultSettings.watermark_x_space = parseInt((page_width - defaultSettings.watermark_x - defaultSettings.watermark_width * defaultSettings.watermark_cols) / (defaultSettings.watermark_cols - 1));
    }

    //如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
    if (defaultSettings.watermark_rows == 0 || (parseInt(defaultSettings.watermark_y + defaultSettings.watermark_height * defaultSettings.watermark_rows + defaultSettings.watermark_y_space * (defaultSettings.watermark_rows - 1)) > page_height)) {
        defaultSettings.watermark_rows = parseInt((defaultSettings.watermark_y_space + page_height - defaultSettings.watermark_y) / (defaultSettings.watermark_height + defaultSettings.watermark_y_space));
        defaultSettings.watermark_y_space = parseInt(((page_height - defaultSettings.watermark_y) - defaultSettings.watermark_height * defaultSettings.watermark_rows) / (defaultSettings.watermark_rows - 1));
    }

    var watermark_rows = defaultSettings.watermark_rows;
    if(dom.clientHeight){
        watermark_rows = parseInt(dom.clientHeight/(defaultSettings.watermark_height+defaultSettings.watermark_y_space))+1;
    }
    var x;
    var y;
    for (var i = 0; i < watermark_rows; i++) {
        y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i;
        for (var j = 0; j < defaultSettings.watermark_cols; j++) {
            x = defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j;

            var mask_div = document.createElement('div');
            mask_div.id = 'mask_div' + i + j;
            mask_div.className = 'mask_div';
            let text_div = document.createElement("div");
                text_div.innerHTML = defaultSettings.watermark_txt; 

            mask_div.appendChild(text_div);
            //设置水印div倾斜显示
            mask_div.style.webkitTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
            mask_div.style.MozTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
            mask_div.style.msTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
            mask_div.style.OTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
            mask_div.style.transform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
            mask_div.style.visibility = "";
            mask_div.style.position = "absolute";
            mask_div.style.left = x + 'px';
            mask_div.style.top = y + 'px';
            mask_div.style.overflow = "hidden";
            mask_div.style.zIndex = "9";
            mask_div.style.pointerEvents='none';//pointer-events:none  让水印不遮挡页面的点击事件
            //mask_div.style.border="solid #eee 1px";
            mask_div.style.opacity = defaultSettings.watermark_alpha;
            mask_div.style.fontSize = defaultSettings.watermark_fontsize;
            mask_div.style.fontFamily = defaultSettings.watermark_font;
            mask_div.style.color = defaultSettings.watermark_color;
            mask_div.style.textAlign = "center";
            mask_div.style.width = defaultSettings.watermark_width + 'px';
            mask_div.style.height = defaultSettings.watermark_height + 'px';
            mask_div.style.display = "block";
            oTemp.appendChild(mask_div);
        };
    };
    dom.appendChild(oTemp);
}