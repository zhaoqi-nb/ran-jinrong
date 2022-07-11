'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Select, Menu, Button, Input, Dropdown, message } from 'antd';
import Tool_Tip from '../../../util/toolTip';
import { getComponentParam } from '../../template';
import RsIcon from '../../../rsIcon/index';
import Api from '../store/api';
import { MenuItem } from "react-contextmenu-ranshu";

import './index.css';
const { Option } = Select;

class EditTitle extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState()
  }

  componentDidMount() {
    this.initData();
  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() {
    this.setState(this.getInitialState())
  }
  getInitialState = () => {
    return {
      //组件是否准备就绪
      isReady: false,
      visible: false,
    }
  }
  initData = () => {
    const { templateId } = this.props;

    let isReady = false;
    if (templateId == 8 || templateId == 2) isReady = true;

    this.setState({ isReady })
  }
  handleCancel = () => {
    this.setState({ visible: false })
  }
  handleOpen = () => {
    this.setState({ visible: true })
  }
  render() {
    const { isReady, visible } = this.state;
    if (!isReady) return null;
    const { instantiationId, templateId } = this.props;
    return (
      <div className="tool-item">
           <MenuItem onClick={this.handleOpen}>
				<RsIcon type="icon-shezhi"/><span style={{marginLeft:"10px"}}>修改组件标题</span>
			</MenuItem>
			<Modal
				title="编辑标题属性"
				visible={visible}
				onCancel={this.handleCancel}
				maskClosable={false}
				destroyOnClose={true}
				width="600px"
				style={{ padding: "10px 20px" }}
				footer={false}
				>
				<p><span className="f-title">记录ID</span>{instantiationId}<span className="f-title" style={{ marginLeft: "50px" }}>模版ID</span>{templateId}</p>
				<EditTitleModel {...this.props} onChange={this.handleCancel} />
			</Modal>
      </div>
    );
  }
}


class EditTitleModel extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  componentDidMount() {
    this.initData();
  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() {

  }
  getInitialState = () => {
    return {
      loading: false,
      titleOption: [],
      dynamicOption: [],
      addTextList: [],
    }
  }
  initData = () => {
    const { templateData } = this.props;

    let placeholderOption = this.getPlaceholderData(),
      dynamicOption = this.getDynamicData(templateData.controlledElement),
      titleOption = templateData && templateData.titleOption ? templateData.titleOption : [{ "type": "placeholder", "value": "" }, { "type": "fixedText", "value": "" }],
      addTextList = [{ code: 0, name: "添加占位文字" }, { code: 2, name: "添加固定文字" }];

    if (dynamicOption && dynamicOption.length) {
      if (templateData && !templateData.titleOption) titleOption = [{ "type": "placeholder", "value": "" }, { "type": "dynamic", "value": "" }, { "type": "fixedText", "value": "" }];
      addTextList = [{ code: 0, name: "添加占位文字" }, { code: 1, name: "添加动态文字" }, { code: 2, name: "添加固定文字" }];
    }
    if (this.props.templateId === 2) {
      addTextList = [{ code: 0, name: "添加占位文字" }, { code: 1, name: "添加动态文字" }, { code: 2, name: "添加固定文字" }, { code: 3, name: "添加动态key" }];
    }
    this.setState({ placeholderOption, dynamicOption, titleOption, addTextList })
  }
  //占位
  getPlaceholderData = () => {
    return [{
      "code": "pageTitle",
      "name": "页面标题"
    }]
  }
  //动态
  getDynamicData = (controlledElement) => {
    let param = getComponentParam(controlledElement);
    let dynamicOption = [];
    if (param) {
      for (let key in param) {
        let value = param[key];
        dynamicOption.push({
          type: "dynamic",
          name: value,
          code: key
        })
      }
    }
    return dynamicOption;
  }
  handleChangeOrder = (type, index) => {
    const upGo = (arr, index) => {
      if (index != 0) {
        arr[index] = arr.splice(index - 1, 1, arr[index])[0];
      }
      return arr;
    }

    const downGo = (arr, index) => {
      if (index != arr.length - 1) {
        arr[index] = arr.splice(index + 1, 1, arr[index])[0];
      }
      return arr;
    }

    let { titleOption } = this.state;
    if (type == "up") {
      titleOption = upGo(titleOption, index)
    } else if (type == "down") {
      titleOption = downGo(titleOption, index)
    }

    this.setState({ titleOption })
  }
  //占位参数
  renderPlaceholderContent = (index, value) => {
    const { placeholderOption } = this.state;
    return (<div style={{ display: "inline-block" }}>
      <span className="f-title">占位文字<Tool_Tip title={"从页面标题获取"} /></span>
      <Select style={{ width: 300 }} placeholder="请选择占位文字" value={value} onChange={(value) => this.handleChangeSelect("placeholder", value, index)}>
        {placeholderOption.map(item => <Option value={item.code}>{item.name}</Option>)}
      </Select>
    </div>)
  }
  //动态参数
  renderDynamicContent = (index, value) => {
    const { dynamicOption } = this.state;
    return (<div style={{ display: "inline-block" }}>
      <span className="f-title">动态文字<Tool_Tip title={"从页面参数传递获取"} /></span>
      <Select style={{ width: 300 }} placeholder="请选择动态文字" value={value} onChange={(value) => this.handleChangeSelect("dynamic", value, index)}>
        {dynamicOption.map(item => <Option value={item.code}>{item.name}</Option>)}
      </Select>
    </div>)
  }
  //动态key值（适用于表格）todo:动态获取表格行所有key，这期先默认parentTitle
  renderDynamicTitleContent = (index, value) => {
    return (<div style={{ display: "inline-block" }}>
      <span className="f-title">动态key<Tool_Tip title={"从表格行获取key值对应的参数"} /></span>
      <Input style={{ width: 300 }} placeholder="请选择动态key值" defaultValue={value} onChange={(e) => this.handleChangeSelect("dynamicKey", e.target.value, index)} />
    </div>)
  }
  handleChangeSelect = (type, value, index) => {
    this.setCoachData(type, value, index);
  }
  //固定
  renderFixedContent = (index, value) => {
    return (<div style={{ display: "inline-block" }}>
      <span className="f-title">固定文字<Tool_Tip title={"固定写在标题上面的文字"} /></span>
      <Input placeholder="请输入固定内容" value={value} style={{ width: 300 }} onChange={(ev) => this.handleChangeInput(ev, index)} />
    </div>)
  }
  handleChangeInput = (ev, index) => {
    let value = ev && ev.target ? ev.target.value : "";
    this.setCoachData("fixedText", value, index);
  }
  setCoachData = (type, value, index) => {
    let { titleOption } = this.state;
    titleOption[index] = {
      type,
      value
    }
    this.setState({ titleOption });
  }

  handleDelContent = (index) => {
    let titleOption = this.state.titleOption;
    titleOption.splice(index, 1)
    this.setState({ titleOption })
  }
  renderContent = (data) => {
    return data.map((item, index) => {
      let value = item.value;
      let content = null;
      if (item.type == "placeholder") {
        content = this.renderPlaceholderContent(index, value);
      } else if (item.type == "dynamic") {
        content = this.renderDynamicContent(index, value);
      } else if (item.type == "fixedText") {
        content = this.renderFixedContent(index, value);
      } else if (item.type == "dynamicKey" && this.props.templateId === 2) {
        content = this.renderDynamicTitleContent(index, value);
      }
      let up_className = !index ? "disabled" : "";
      let down_className = data.length - 1 == index ? "disabled" : "";
      return (<div className="row_setTitle">
        <div className="row_content">{content}</div>
        <div className="row_order">
          <span className={`row_order_up ${up_className}`} onClick={() => this.handleChangeOrder("up", index)}><RsIcon type="icon-caret-up" /></span>
          <span className={`row_order_down ${down_className}`} onClick={() => this.handleChangeOrder("down", index)}><RsIcon type="icon-caret-down" /></span>
        </div>
        <div className="row_del" onClick={() => this.handleDelContent(index)}><RsIcon type="icon-close-circle" /></div>
      </div>)
    })
  }
  handleAdd = ({ key }) => {
    let titleOption = this.state.titleOption;
    let type = "";
    if (key == "0") type = "placeholder";
    else if (key == "1") type = "dynamic";
    else if (key == "2") type = "fixedText";
    else if (key == "3") type = "dynamicKey";
    titleOption.push({
      type,
      value: "",
    })

    this.setState({ titleOption })
  }
  renderPreview = () => {
    const { titleOption, dynamicOption } = this.state;
    let arr = [];
    for (let i = 0, len = titleOption.length; i < len; i++) {
      let obj = titleOption[i],
        value = obj.value;
      if (!value) continue;
      if (obj.type == "placeholder") {
        if (value == "pageTitle") arr.push(document.title);
      } else if (obj.type == "dynamic") {
        let temp = dynamicOption.find(item => item.code == value);
        if (temp) arr.push(temp.name)
      } else if (obj.type == "fixedText") {
        arr.push(value);
      } else if (obj.type == "dynamicKey") {
        arr.push(value);
      } //todo:标题预览应该怎么展示
    }
    return arr && arr.length ? arr.join("-") : null
  }
  ifEmpty = (data) => {
    if (!data || !data.length) return false;

    for (let i = 0, len = data.length; i < len; i++) {
      let obj = data[i];
      if (!obj.value) return false;
    }

    return true;
  }
  updateFrontTemplate = async () => {
    const { titleOption } = this.state;
    let { instantiationId, templateData } = this.props;

    console.log("titleOption=" + titleOption)

    if (!this.ifEmpty(titleOption)) {
      message.warn("内容不能为空");
      return;
    }
    //
    this.setState({ loading: true });
    //添加属性
    templateData["titleOption"] = titleOption;
    //请求
    let result = await Api.updateFrontTemplate({
      instantiationId,
      templatePropertyValue: JSON.stringify(templateData)
    })
    if (result.code == 200) {
      message.success("修改成功！即将刷新页面...");
      this.props.onChange();
      setTimeout(() => location.reload(), 700);
    }
    this.setState({ loading: false });
  }
  render() {
    const { titleOption, addTextList, loading } = this.state;
    const addContent = (
      <Menu onClick={this.handleAdd}>
        {addTextList.map((item, index) => <Menu.Item key={item.code}>{item.name}</Menu.Item>)}
      </Menu>
    );
    return (
      <div>
        <div className="editTitleModal">
          {this.renderContent(titleOption)}
          <Dropdown overlay={addContent} placement="bottomCenter" trigger={['click']}>
            <Button block><RsIcon type="icon-add" />添加</Button>
          </Dropdown>
          <p className="titlePreview"><span className="f-title">标题预览</span>{this.renderPreview()}</p>
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button type="primary" loading={loading} onClick={this.updateFrontTemplate}>提交</Button>
          <Button onClick={this.props.onChange} style={{ marginLeft: "20px" }}>关闭</Button>
        </div>
      </div>
    );
  }
}

EditTitle.defaultProps = {
  instantiationId: PropTypes.number.isRequired,
  templateId: PropTypes.number.isRequired,
  templateData: PropTypes.object.isRequired,
  userInfo: PropTypes.object.isRequired,
}

export default EditTitle;