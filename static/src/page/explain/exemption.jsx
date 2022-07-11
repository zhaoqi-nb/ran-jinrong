'use strict'

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less'

class Exemption extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {

    }

    renderZhCNContent() {
        return (
            <div className="explain-content">
                <div className="explain-title">免责声明</div>
                <div className="explain-section">本网站所提供的所有信息，仅供参考之用，不构成投资建议。</div>
                <div className="explain-section">本网站提供之数据、图标、分析及其他文字均基于网站所有人北京燃数科技有限公司（以下简称“燃数科技”）对通过自有引擎收集的合法公开信息之建模以及计算结果；引擎相关版权归燃数科技所有。本网站对所有信息均持客观、中立立场，网站仅用于展示、分享建模以及计算结果，网站信息不代表燃数科技或网站价值判断或价值取向，网站不对用户对于网站信息的任何理解、解释、解读、分析、变更、修改负任何直接或间接的责任。</div>
                <div className="explain-section">本网站及其雇员一概毋须以任何方式就任何信息传递或传送的失误、不准确或错误对用户或任何其他人士负任何直接或间接的责任。</div>
                <div className="explain-section">本网站受中华人民共和国法律、法规及规范性文件管辖，在法律允许的范围内，本网站在此声明，不承担用户或任何人士就使用或未能使用本网站所提供的信息或任何链接或项目所引致的任何直接、间接、附带或惩罚性的损害赔偿（包括但不限于实际损失或预期利益损失）。</div>
                <div className="explain-section">本网站用户须自行保证依据中华人民共和国法律、法规及规范性文件之规定合理使用本网站；在域外使用本网站的，用户须自负其责保证不会受限于任何限制或禁止用户使用或分发本网站所提供信息的当地的规定。</div>
                <div className="explain-section">凡以任何方式登录本网站或直接、间接使用本网站资料者，视为自愿接受本网站本份声明的约束。</div>
            </div>
        );
    }

    renderEnUSConetnt() {
        return (
            <div className="explain-content">
                <div className="explain-title">Disclaimer</div>
                <div className="explain-section">All information made available on this Website is for reference only and does not constitute investment suggestions.</div>
                <div className="explain-section">The data, icons, analysis and other text on this Website are derived from the modeling and calculation of the legal and publicly available information collected by Beijing Databurning Technology Co., Ltd. (hereinafter referred to as "Databurning"), the website owner, through its own engine; The copyright related to the engine shall remain the property of Databurning. This Website adopts an objective and neutral stance towards all information. It is only designed to display and share the results of modeling and calculation. The website information does not represent the value judgment or value orientation of Databurning or this Website. The Website will not be responsible for the understanding, interpretation, analysis, change or modification of the website information by users directly or indirectly.</div>
                <div className="explain-section">Neither this Website nor its employees shall be liable to users or any others directly or indirectly for any errors, inaccuracies or mistakes in the transmission or communication of any information in any way.</div>
                <div className="explain-section">This Website is governed by the laws, regulations and normative documents of the people's Republic of China. To the extent permitted by law, this Website hereby declares that it will not be responsible for any direct, indirect, incidental or punitive damages (including but not limited to actual loss or expected loss of interest) caused by a user or any person's use or failure to use the information provided by this Website or any link thereto or contents thereof.</div>
                <div className="explain-section">Users of this Website must guarantee that they will reasonably use this Website in accordance with the laws, regulations and normative documents of the people's Republic of China; users who use this Website outside the territory shall make sure that they will not be subject to any local regulations that restrict or prohibit users from using or distributing the information made available on this Website.</div>
                <div className="explain-section">Anyone who logs on this Website in any way or directly or indirectly uses the information on this Website shall be deemed to have been voluntarily bound by this Disclaimer on this Website.</div>
            </div>
        );
    }

    render() {
        const { currentLanguage } = this.props
        return currentLanguage === 'zh_CN' ? this.renderZhCNContent() : this.renderEnUSConetnt()
    }
}

Exemption.propTypes = {

};

export default Exemption;