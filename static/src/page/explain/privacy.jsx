'use strict'

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less'

class Privacy extends Component {
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
                <div className="explain-title">网站隐私保护声明</div>
                <div className="explain-section">本隐私保护声明适用于使用北京燃数科技有限公司网站（以下简称“本网站”）提供的各种服务的用户。我们尊重、保护用户的个人隐私，并郑重承诺，除非有法律或法规等强制性程序要求及本声明所载例外情况，未经用户授权我们不会公布与用户个人有关的资料。我们将定期检查隐私保护措施，切实保证用户个人资料隐私保护。</div>
                <div className="explain-section">用户使用本网站时，网站会根据具体实际情况需要要求用户提供必要的个人资料，这些资料均属于隐私保护范围，我们将对这些资料内容进行隐私保护。</div>
                <div className="explain-section">在以下几个例外情形下，本网站将载合理范围内披露用户的相关信息。这些情形包括但不限于：</div>
                <div className="explain-section list">（1）当用户在本网站的行为违反了《计算机信息网络国际联网安全保护管理办法》、《互联网信息服务管理办法》，或可能损害或妨碍本网站其他用户或其他网站用户的权益或导致他人遭受损害，披露用户的个人资料是为了辨识、联络或采取法律行动所必要的行动时。 <br />（2）法律法规所规定的必须披露或公开的个人信息。 <br /> （3）当司法机关或其它授权机关依法执行公务，要求网站公开特定个人资料时。</div>
                <div className="explain-section">本网站具有全面的技术保护措施和安全维护机制来保证用户信息的内容，但由于不可抗力或者因计算机病毒感染、黑客攻击等特殊外力侵扰，导致用户信息破坏、泄密并受到损失的，本网站不承担任何法律责任。</div>
            </div>
        );
    }

    renderEnUSConetnt() {
        return (
            <div className="explain-content">
                <div className="explain-title">Privacy Statement on the Website</div>
                <div className="explain-section">This Privacy Statement is applicable to users who receive various services from the Website of Beijing Databurning Technology Co., LTD. (hereinafter referred to as "Databurning"). We respect and protect the personal privacy of users and solemnly promise that we will not publish the personal data of users without their authorization unless required by mandatory procedures such as laws or regulations and other than the exceptions contained in this Statement. We will check privacy protection measures at regular intervals to ensure the privacy protection of the personal data on users.</div>
                <div className="explain-section">When users use this Website, the Website will require users to provide necessary personal data in light of the actual situation within the scope of privacy protection and under our privacy protection.</div>
                <div className="explain-section">Except for the following exceptions, this Website will not disclose the relevant information on users outside a reasonable range. Including but not limited to:</div>
                <div className="explain-section list">
                    (1) When a user violates the Measures for the Administration of Internet Security Protection of Computer Information Networks and the Measures for the Administration of Internet Information Services or may cause damage to the rights and interests of other users of this Website or others, the disclosure of the user's personal data is necessary for the identification of or liaison with the user or taking legal action.<br />
                    (2) Personal information that must be disclosed or made publicly available as required by the laws and regulations.<br />
                    (3) When the judicial agency or other authorities perform official duties according to law, requiring the Website to disclose specific personal data.
                </div>
                <div className="explain-section">This Website has comprehensive technical protection measures and security maintenance mechanism in place to ensure the safety of user information. However, it will not bear any legal responsibilities for the destruction, disclosure and loss of user information due to <span className="book-name">force majeure</span> or special and external factors such as computer virus infection, hacking, etc.</div>
            </div>
        );
    }

    render() {
        const { currentLanguage } = this.props
        return currentLanguage === 'zh_CN' ? this.renderZhCNContent() : this.renderEnUSConetnt()
    }
}

Privacy.propTypes = {

};

export default Privacy;