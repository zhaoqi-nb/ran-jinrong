import React, { Fragment, useEffect, useState } from 'react';
import SelectList from '../selectList';
import { Layout, Menu, Input, Dropdown, Tooltip } from 'antd';
import MyToolTip from '../../../component/toolTip';
import RsIcon from '../../../component/rsIcon/index';
import { getPageData, getSubMenuData } from '../util';
import { getAccessState } from '../../util/template';
import { getPrimaryMarketRouterParams } from '@/utils/primaryMarketUtil';
import { Link } from 'react-router-dom';
import Logo from '../../../component/logo';
import Img from '@/components/Img'
import Api from './store/api';
import i18n from '@/plugin/i18n';
import { GetDecodeURIComponent } from '../../../../utils/Util.js'
import './index.less';
import '../less/left.less';


const { SubMenu } = Menu;

const iconStyle = { color: '#8c8c8c', fontSize: "16px" }

const followStyle = {
    fontSize: '16px',
    cursor: 'pointer',
    position: 'absolute',
    marginRight: "4px",
    right: '6px',
    top: '8px'

}
const Header = ({ data, list, type, urlParams }) => {
    const isCompany = type === 'company';
    const isBoard = type === 'board';
    //是否是一级市场
    const isPrimary = type === 'primary';
    const resAttr = data && data.resAttr ? JSON.parse(data.resAttr) : {};
    console.log("参数===", data, list, type)
    const [followState, setFollowState] = useState(false);
    const [attentionFlag, setAttentionFlag] = useState(false);
    useEffect(async () => {
        if (isCompany) {
            let result = await Api.getUserAttention({ resId: data?.resId });
            if (result.code == 200) {
                let attendState = JSON.stringify(result.data) == "{}" ? false : true;
                setFollowState(attendState);
            }
        }
    }, []);

    useEffect(async () => {
        if (isPrimary && urlParams) setAttentionFlag(urlParams.attentionFlag)
    }, [urlParams]);




    const addAttention = async () => {
        let result = await Api.addAttention({ resId: data.resId, resAttr: data.resAttr });
        if (result.code == 200) {
            setFollowState(true);
        }
    }

    const delUserAttention = async () => {
        let result = await Api.delUserAttention({ resId: data.resId });
        if (result.code == 200) {
            setFollowState(false);
        }
    }

    const getTypeLevelText = (level) => {
        let text = null
        if (level == 1) {
            text = i18n.format('一级行业')
        } else if (level == 2) {
            text = i18n.format('二级行业')
        } else if (level == 3) {
            text = i18n.format('三级行业')
        }
        return text
    }

    //新详情页关注 ｜｜ 取消关注
    const newAddAttention = async (typeAttention, market) => {
        let {
            type_name,
            type,
            pageType,
            summary_word,
            first_type_id,
            second_type_id,
            third_type_id,
            first_type_name,
            second_type_name,
            third_type_name,
            industry_name,
            industry_id,
            store_type,
            brandName,
            brand_id,
            brand_name,
            level
        } = urlParams
        console.log('urlParams', urlParams)

        // if (!level) level = (first_type_id == -100 || first_type_id == '-' || first_type_id == 'undefined') ? 0 : (second_type_id == -100 || !second_type_id || second_type_id == '-') ? 1 : (third_type_id == -100 || !third_type_id || third_type_id == '-') ? 2 : 3
        if (!level) {
            if (first_type_id) {
                if (industry_id) {
                    level = first_type_id === industry_id ? 1 : second_type_id === industry_id ? 2 : third_type_id === industry_id ? 3 : 0
                } else {
                    level = (first_type_id == -100 || first_type_id == '-' || first_type_id == 'undefined') ? 0 : (second_type_id == -100 || !second_type_id || second_type_id == '-') ? 1 : (third_type_id == -100 || !third_type_id || third_type_id == '-') ? 2 : 3
                }
            } else {
                first_type_id = industry_id
                first_type_name = industry_name
                level = 1
            }
        }

        const type_id = third_type_id && third_type_id != -100 && third_type_id != '-' ? third_type_id :
            second_type_id && second_type_id != -100 && second_type_id != '-' ? second_type_id : first_type_id

        let params = {
            instantiationId: 'addAttention',
            market, // 1 一级市场, 2 二级市场
            businessType: type, // 1 国内电商, 2 线下门店, 3 舆情分析
            attentionType: pageType == "industry" ? 1 : pageType == "brand" ? 2 : 3, // 1 行业, 2 品牌, 3 概念, 4 公司
            extraAttrJson: JSON.stringify({
                first_type_id: parseFloat(first_type_id),
                first_type_name,
                second_type_id: parseFloat(second_type_id),
                second_type_name,
                third_type_id: parseFloat(third_type_id),
                third_type_name,
                level,
                industry_id: parseFloat(industry_id),
                industry_name,
            }), // json数据，例如三级行业的id和行业级数


            itemId: summary_word && summary_word != 'null' ? summary_word : brand_id && brand_id != 'null' ? brand_id : industry_id ? industry_id : type_id, // 关注id
            itemName: summary_word && summary_word != 'null' ? summary_word : brand_name && brand_name != 'null' ? brand_name : brandName && brandName != 'null' ? brandName : type_name, // 关注名称
            type: typeAttention // 0 关注, 1 取消关注

        }
        console.log(params, 41231);
        let result = await Api.newAddAttention(params);
        if (result.code == 200) {
            if (!typeAttention) setAttentionFlag(true)
            else setAttentionFlag(false)
        }
    }

    console.log('resAttrresAttrresAttr', resAttr)

    const img = `${process.env.ASSET_PATH}img/company/${_.get(resAttr, 'img')}`

    const imgStyle = {
        width: 40, height: 40, borderRadius: 8,
        background: 'linear-gradient(270deg, rgb(6, 151, 255) 0%, rgb(6, 120, 255) 100%)',
        margin: 'auto',
        boxShadow: '0px 1px 4px 0px rgb(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
    return (
        <div className='header-industry'>
            {
                type != "primary" ? <Fragment>
                    <span>
                        {isCompany ? followState ? <RsIcon type="icon-guanzhu" onClick={delUserAttention} style={{ ...followStyle, color: "#FFBA00" }} /> :
                            <RsIcon type="icon-weiguanzhu" onClick={addAttention} style={{ ...followStyle, color: "#8C8C8C" }} />
                            : null}
                    </span>

                    <dl style={{ marginBottom: '0em' }}>
                        <dt>
                            {!isCompany
                                ? <Logo icon={resAttr.icon} />
                                : !resAttr.img
                                    ? <Logo icon={'icon-kanban-gongsikanban'} />
                                    : <Img src={img} style={imgStyle} />
                            }
                            {/* //<img src={require("../../../image/user.png")} />} */}
                        </dt>
                        <dd className='show-name'>{i18n.format(data?.newDisplayResName || data?.displayResName)}</dd>
                        <dd className='show-code'>{isCompany ? i18n.format(resAttr.stock_code) : data?.type_level ? getTypeLevelText(data.type_level) : null}</dd>
                    </dl>
                    <SelectList type={type} title={isCompany ? i18n.format('切换公司') : i18n.format('切换')} searchPlaceholder={i18n.format(isCompany ? '公司' : '搜索')} searchType={isCompany ? 'stock_code' : null} list={list} selectData={data} />
                </Fragment>
                    : <Fragment>
                        {
                            attentionFlag ? <RsIcon type="icon-guanzhu" onClick={() => newAddAttention(1, 1)} style={{ ...followStyle, color: "#FFBA00" }} />
                                : <RsIcon type="icon-weiguanzhu" onClick={() => newAddAttention(0, 1)} style={{ ...followStyle, color: "#8C8C8C" }} />
                        }
                        <dl style={{ marginBottom: '0em' }}>
                            <dt>
                                <Logo icon={urlParams.pageType == "brand" ? "icon-xianshangxiaofeikanban" : urlParams.pageType == "industry" ? "icon-hangyefenxi" : "icon-gainian"} />
                            </dt>
                            <dd className='show-name'>{urlParams.type_name}</dd>
                            <dd className='show-code'>{urlParams.pageType == "industry" ? "行业" : urlParams.pageType == "brand" ? "品牌" : "概念"}</dd>
                        </dl>
                    </Fragment>
            }

        </div>
    )
}


const LeftMenu = ({ leftMenu, urlData, type }) => {
    let defaultOpenKeys = [];

    leftMenu.forEach((item, index) => {
        if (item.child && item.child.length > 0) {
            defaultOpenKeys.push(item.resId.toString());
        }
    })
    // console.log('defaultOpenKeys=>', leftMenu, defaultOpenKeys);

    const getConfigPath = (resId, path, is618) => {
        const { companyId, brandId, industryId, boardId, appId, primaryId } = urlData;
        let url = '';
        switch (type) {
            case 'company':
                url = `/page/company/${companyId}/${resId}/${path}`;
                break;
            case 'brand':
                url = `/page/brand/${brandId}/${resId}/${path}`;
                break;
            case 'industry':
                url = `/page/industry/${industryId}/${resId}/${path}`
                break;
            case 'board':
                if (is618) {
                    url = `/page/appSM/${boardId}/${resId}/${path}`
                } else {
                    url = `/page/board/${boardId}/${resId}/${path}`
                }
                break;
            case 'dataSource':
                // url = `/page/appAnalyze/${appId}/${resId}/${path}`
                url = `/page/dataSource/${appId}/${resId}/${path}`
                break;
            case 'appAnalyze':
                url = `/page/appAnalyze/${appId}/${resId}/${path}`;
                break;
            case 'primary':
                url = `/page/primary/${primaryId}/${resId}/${path}`;
                break;
            default:
                break;
        }
        //参数
        if (location.search && url.indexOf('?') < 0) {
            url = url + location.search;
        }
        return url;
    }

    const getHref = (obj, is618) => {
        let resAttr = obj.resAttr ? JSON.parse(obj.resAttr) : {};
        let href = <span className='colors'>{obj.displayResName}</span>
        if (resAttr.path || (resAttr && resAttr.redirectUrl)) {
            let resId = obj.resId;
            let path = resAttr.path;
            let url = "";
            if (resAttr && resAttr.menuType == "config") {
                // /page/brand/${brandId}/${resId}/${path}
                url = getConfigPath(resId, path, is618);
            } else if (resAttr && path) {
                url = getConfigPath(resId, path, is618);
            } else if (resAttr && resAttr.redirectUrl) {
                url = resAttr.redirectUrl;
            }
            if (url.indexOf('/page/appAnalyze/') !== -1) { // 用A链接调整
                return <a href={url} title={obj.displayResName}>
                    <span className='colors'>{obj.displayResName}</span>
                </a>

            }

            // return <Link to={url} title={obj.displayResName}>
            //     <span className='colors'>{obj.displayResName}</span>
            // </Link>
            href = is618 ?
                <a href={url} title={obj.displayResName}>
                    <span className='colors'>{obj.displayResName}</span>
                </a>
                : <Link to={url} title={obj.displayResName}>
                    <span className='colors'>{obj.displayResName}</span>
                </Link>
        }
        // else return <span className='colors'>{obj.displayResName}</span>
        return href
    }

    const handleMenuData = (datas) => {
        let result = [];

        const checkChildAuth = (child) => {
            let displayParent = false;
            for (let i = 0; i < child.length; i++) {
                const item = child[i];
                let accessState = getAccessState(item.privilegeDtoList);
                if (!accessState || accessState.code != "all") {
                    displayParent = false;
                } else {
                    displayParent = true;
                    break;
                }
            }

            return displayParent;

        }
        (function loop(list) {

            list.forEach(item => {
                if (item.child && item.level == 5) {
                    const displayParent = checkChildAuth(item.child);
                    if (displayParent) {
                        // loop(item.child);
                        result.push(item);
                    }
                } else {
                    result.push(item);
                }

            })

        })(datas);

        return result;
    }

    const renderLeftMenu = (datas) => {
        if (!datas) return;
        datas = handleMenuData(datas);

        return datas.map((item, index) => {
            //判断菜单是否显示
            let menuNotDisplay = item.menuNotDisplay;
            //判断是否618
            const is618 = item.resName.indexOf('618') > -1
            if (!menuNotDisplay) {
                let accessState = getAccessState(item.privilegeDtoList);
                if (!accessState || accessState.code != "all") return null;
            }

            //如果有child 返回本身和child
            // if (item.child && item.level == 5) {
            if (item.child) {
                var itemList = item.child;
                return <SubMenu style={{ margin: 0, marginTop: index ? 0 : -8 }} title={item.displayResName} key={item.resId} >
                    {
                        itemList.map(items => {
                            let accessState = getAccessState(items.privilegeDtoList);
                            if (!accessState || accessState.code != "all") return null;

                            return <Menu.Item style={{ paddingLeft: 16, margin: 0 }} key={items.resId}><span style={{ color: '#595959', cursor: 'text' }}>{getHref(items, is618)}</span></Menu.Item>
                        })
                    }
                </SubMenu>
            }
            // 没有child直接返回
            else {
                let isLast = datas[index + 1]?.child;
                return <Menu.Item key={item.resId} style={{ paddingLeft: 16, margin: 0, marginBottom: isLast ? 8 : 0 }}>
                    {getHref(item)}
                </Menu.Item>
            }
        })

    }

    const expandIcon = (props) => {
        const { isSubMenu, isOpen } = props;
        if (isSubMenu) {
            if (isOpen) {
                return <RsIcon type="icon-jiantoushang" style={{ color: '#8c8c8c' }} />
            } else {
                return <RsIcon type="icon-jiantouxia" style={{ color: '#8c8c8c' }} />
            }
        }
    }
    return (
        <Menu theme="dark" mode="inline" expandIcon={expandIcon} defaultSelectedKeys={[urlData?.resId?.toString()]} defaultOpenKeys={defaultOpenKeys} style={{ overflow: "hidden auto" }}>
            {renderLeftMenu(leftMenu)}
        </Menu>
    )
}

//一级市场左侧菜单详情
const PrimaryLeftMenu = ({ boardList, urlParams }) => {
    const { type } = urlParams
    return (
        <>
            <div className="primaryBox">
                {
                    boardList.map(item => {
                        return <div>
                            {item.title ? <p className="primaryBox-title">{item.title}</p> : null}
                            {
                                item.children.map(itemChild => {
                                    let ifHref = Object.prototype.toString.call(itemChild.value) == '[object Array]'
                                    let flag = ""
                                    if (ifHref && itemChild.value.length == 1) flag = "primaryBox-block-href1Length"
                                    else if (ifHref && itemChild.value.length == 2) flag = "primaryBox-block-href2Length"
                                    return <div className={`primaryBox-block${ifHref ? " primaryBox-block-href" : ""} ${flag}`}>

                                        <Tooltip placement="left" title={`${i18n.format(itemChild.detailTitle)}`}>
                                            <p className="primaryBox-block-detailTitle">
                                                {i18n.format(itemChild.detailTitle)}

                                                {itemChild.detailTitle == "成熟门店数" && <MyToolTip title={`${i18n.format("运营超过24个月的运营门店数量")}`}>
                                                    <RsIcon type="icon-shuoming" style={{ fontSize: 14 }} />
                                                </MyToolTip>}

                                                {itemChild.detailTitle == "覆盖重点品牌数" && <MyToolTip title={`${i18n.format("重点品牌：该概念下月均 GMV 大于 20W 的品牌")}`}>
                                                    <RsIcon type="icon-shuoming" style={{ fontSize: 14 }} />
                                                </MyToolTip>}

                                            </p>
                                        </Tooltip>


                                        {
                                            ifHref ? <div>
                                                {
                                                    itemChild.value.map(v => {
                                                        //获取resId
                                                        let { resId } = getPrimaryMarketRouterParams("国内电商-品牌分析详情")
                                                        if (!resId) return <span className="primaryBox-block-detailTitle-href">{v.brand_name}</span>
                                                        else return <Tooltip placement="left" title={`${v.brand_name}`}>
                                                            <a className="primaryBox-block-detailTitle-href"
                                                                href={`/redirect/pmIndustryName/${resId}/9978?brandId=${v.brand_id}&brandName=${v.brand_name}&type_name=${v.brand_name}&first_type_name=${urlParams.first_type_name}&type=1&pageType=brand&project_type=1`}>
                                                                {v.brand_name}</a>
                                                        </Tooltip>
                                                    })
                                                }
                                            </div> : <p className="primaryBox-block-value">{itemChild.value}</p>
                                        }

                                    </div>
                                })
                            }
                        </div>
                    })
                }

            </div>
            {type != 3 ? <p className="primaryBox-bottom"><span>数据源：</span>
                {
                    type == 2 ? <>
                        <RsIcon type="icon-dazhongdianping" style={iconStyle} />
                        <RsIcon style={iconStyle} type="icon-baiduditu" />
                        <RsIcon style={iconStyle} type="icon-gaodeditu" />
                    </> : <>
                            <RsIcon type="icon-jingdong" style={iconStyle} />
                            <RsIcon type="icon-tianmao" style={iconStyle} />
                            <RsIcon type="icon-douyin" style={iconStyle} />
                        </>
                }
            </p> : null}
        </>
    )
}

const getUrlParam = () => {
    const queryStringArr = window.location.href.split('?')
    const queryString = queryStringArr.length > 1 ? queryStringArr[1] : ''
    const queryParamArr = queryString.split('&')
    let queryParam = {}
    if (Array.isArray(queryParamArr)) {
        queryParamArr.map(item => {
            const [key, val] = item.split("=")
            if (key === 'industryName') {
                queryParam[key] = GetDecodeURIComponent(val)
            } else {
                queryParam[key] = val
            }
        })
    }
    return queryParam
}


const SecondMenu = ({ type, list, urlData, urlParams }) => {

    // 获取菜单数据
    let data = getSubMenuData();
    let leftMenu = data ? data.child : [];
    const queryParam = getUrlParam()
    if (queryParam && queryParam.industryName && queryParam.type_level) {
        const industryNameArr = queryParam.industryName.split('>')
        data.newDisplayResName = industryNameArr[industryNameArr.length - 1]
        data.type_level = queryParam.type_level
    }

    console.log('qiao=>leftMenu', type, leftMenu, data);
    return (
        <div className='second_rightMenuBox select_menu'>
            <div className='rightMenuBox'>
                <Header data={data} list={list} type={type} urlParams={urlParams} />
                <p style={{ height: 1, background: '#E1E8F0', marginBottom: 8 }}></p>
                {/* <PrimaryLeftMenu boardList={boardList} /> */}
                {
                    type === "primary" ? <PrimaryLeftMenu boardList={list} urlParams={urlParams} /> : <LeftMenu leftMenu={leftMenu} urlData={urlData} type={type} />
                }
            </div>
        </div>
    );
}

SecondMenu.defaultProps = {
    type: 'company', // company 企业，brand 品牌   industry 行业        board 综合
    /**
     * 企业数据
     */
    list: [],

    /**
     * urlData数据
     */
    urlData: {},

}

export default SecondMenu;