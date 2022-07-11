'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Layout, Menu, Input} from 'antd'
import RsIcon from '../../../component/rsIcon/index';
import { Link } from 'react-router-dom';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }
 
    componentDidMount() {
        this.initData()
    }

    componentWillReceiveProps(nextProps) {

    }
 
    componentWillUnmount() {
        this.setState(this.getInitialState())
    }
    getInitialState = () =>{
        return {
            isReady     : false,
            collapsed   : false,
            leftMenu    : {},
            pageInfo    : {},
            boardData: {},
            inputValue  : null,
            visible     : false,
            //全部行业
            boardList: [],
            //下拉显示
            selectOption: []
        }
    }
    initData = async() => {
        // const { urlData } = this.props;
        // try {
        //     let boardId      = urlData.boardId;
        //     let boardData    = getSubMenuData();
        //     let leftMenu     = boardData.child;
        //     let pageInfo     = getPageData();
        //     let boardList    = await this.queryboardData(boardData.resId);
        //     let selectOption = cloneDeep(boardList);
            
        //     this.setState({ boardId, leftMenu, pageInfo, boardData, boardList, selectOption, isReady: true})

        // } catch (error) {
        //     console.log(error);
        // }
        
    }
    showChangeModal=()=>{
        this.props.content(!this.props.visible)
        
    }
    filertLi=(e)=>{
        this.props.searchfix(e.target.value)
    }
    render(){
        const {visible,inputValue,selectOption}=this.props;
        return(
            <div>
                 <p style={{width:'100%',height:'32px'}} >
                    <span className='switch' style={{display:'inline-block',border:'1px solid #0678FF', color:'#0678FF', width:'100%', height:'32px', lineHeight:'32px',borderRadius:'4px'}} 
                    onClick={this.showChangeModal}
                    ><RsIcon type="icon-qiehuan" style={{fontSize:'14px', marginRight:'2px'}}/>切换</span>
                </p> 
                <div className='searchModal' style={{display:visible?"":"none"}}>
                    <p className='inputbox'>
                        <Input value={inputValue} prefix={<RsIcon type="icon-gb-sousuo" style={{color:"#999"}}/>} placeholder='搜索行业' onChange={this.filertLi} onClick={(e)=>e.stopPropagation()}/>
                    </p>
                    <ul>
                        {
                            selectOption.map((item, index)=><Link to={item.href} key={item.resId}><li>{item.resName}</li></Link>)
                        }
                    </ul>
                </div> 
            </div>
        )
    }
}

export default Index;