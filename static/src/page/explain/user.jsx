'use strict'

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less'

class User extends Component {
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
                <div className="explain-title">用户服务协议</div>
                <div className="explain-sec-title">一、协议范围</div>
                <div className="explain-sec-content">1、北京燃数科技有限公司网（https://www.databurning.com/）（以下简称“本网”），由北京燃数科技有限公司（以下简称“燃数科技”）开发、建设、运营、管理。</div>
                <div className="explain-sec-content">2、依照本《用户服务协议》（以下简称“本协议”）以下条款在本网登记/注册、浏览的会员（以下简称“用户”），同意以下服务条款，方有资格享受本网提供的相应服务。</div>
                <div className="explain-sec-divider"></div>
                <div className="explain-sec-title">二、网站内容所有权</div>
                <div className="explain-sec-content">1、本网提供的网络服务内容可能包括：文字、软件、声音、图片、录像、图表等，以上内容均来源于燃数科技对通过自有引擎收集的合法公开信息之建模以及计算结果，内容均受版权、商标和其它财产所有权法律的保护。</div>
                <div className="explain-sec-content">2、用户只有在获得本网或其他相关权利人的授权之后才能对本网内容进行再加工（包括但不限于解读、分析、变更、修改等），不得擅自复制、再造本网内容，或创造与内容有关的派生产品。</div>
                <div className="explain-sec-divider"></div>
                <div className="explain-sec-title">三、用户注册及隐私保护</div>
                <div className="explain-sec-content">1、为保障用户的合法权益，避免在服务时因用户注册资料与真实情况不符而发生纠纷，请用户注册时务必按照真实、全面、准确的原则填写用户信息。对因用户注册资料填写不符合实际情况或填写有误、不完整而造成的不能服务情况，本网概不负责。若用户提供的资料包含有不合法或不正确的信息，本网保留结束该用户使用服务资格的权利。</div>
                <div className="explain-sec-content">2、本网用户注册信息仅用于本网向用户提供相关服务之用，不会用于其他目的。同时，用户务必对其用户密码、个人帐号等信息保密，以免被盗用或遭窜改。用户如发现上述情况应立即与本网联系以寻求合理解决方式，但本网不对用户自行泄密承担任何直接或间接责任。</div>
                <div className="explain-sec-content">3、保护用户隐私是本网的一项基本政策，本网保证不对外公开或向第三方提供用户注册资料及用户在使用网络服务时存储在本网的非公开内容，但下列情况除外：</div>
                <div className="explain-sec-content list">（1）事先获得用户的明确授权； <br />（2）根据有关的法律法规要求；<br /> （3）按照相关政府主管部门的要求； <br />（4）为维护社会公众的利益； <br />（5）为维护本网和/或燃数科技的合法权益。</div>
                <div className="explain-sec-content">4、用户同意，本网可能会与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方同意承担与本网同等的保护用户隐私的责任，则本网可将用户的注册资料等信息提供给该第三方。</div>
                <div className="explain-sec-content">5、在不透露单个用户隐私资料的前提下，本网有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。</div>
                <div className="explain-sec-divider"></div>
                <div className="explain-sec-title">四、用户享有的权利和服务</div>
                <div className="explain-sec-content">1、用户有权随时对自己的个人资料进行查询、修改和删除。为客户服务安全考虑，帐号不能随意更改。</div>
                <div className="explain-sec-content">2、用户享有在本网所购买的各种服务内容。</div>
                <div className="explain-sec-content">3、本网网络服务的具体内容由本网根据实际情况提供。本网所有内容仅用于展示、分享，不代表燃数科技或本网价值判断或价值取向，本网保留随时变更、中断或终止部分或全部网络服务的权利。</div>
                <div className="explain-sec-content">4、本网在提供网络服务时，可能会对部分网络服务（例如购买报告等服务）的用户收取一定的费用或额外费用。在此情况下，本网会在相关页面上做明确的提示。如用户拒绝支付该等费用，则不能使用相关的网络服务。</div>
                <div className="explain-sec-content">5、用户理解，本网仅提供相关的网络服务，除此之外与相关网络服务有关的设备（如电脑、调制解调器及其他与接入互联网有关的装置）及所需的费用（如为接入互联网而支付的电话费及上网费）均应由用户自行负担。</div>
                <div className="explain-sec-divider"></div>
                <div className="explain-sec-title">五、用户管理</div>
                <div className="explain-sec-content">1、不得利用本网危害国家安全、泄露国家秘密，不得侵犯国家社会集体的和公民的合法权益，不得利用本网制作、复制和传播下列信息：</div>
                <div className="explain-sec-content list">（1）煽动抗拒、破坏宪法和法律、行政法规实施的；<br />（2）煽动颠覆国家政权，推翻社会主义制度的；<br />（3）煽动分裂国家、破坏国家统一的；<br />（4）煽动民族仇恨、民族歧视，破坏民族团结的；<br />（5）捏造或者歪曲事实，散布谣言，扰乱社会秩序的；<br />（6）宣扬封建迷信、淫秽、色情、赌博、暴力、凶杀、恐怖、教唆犯罪的；<br />（7）公然侮辱他人或者捏造事实诽谤他人的，或者进行其他恶意攻击的；<br />（8）损害国家机关信誉的；<br />（9）其他违反宪法和法律行政法规的；<br />（10）未经允许进行商业广告行为的。</div>
                <div className="explain-sec-content list">本网声明用户的的系统记录有可能作为用户违反法律、法规和相关政策文件的证据。</div>
                <div className="explain-sec-divider"></div>
                <div className="explain-sec-title">六、免责声明</div>
                <div className="explain-sec-content">1、用户明确同意其使用本网网络服务所存在的风险将完全由其自己承担；因其使用本网网络服务而产生的一切后果也由其自行承担，本网不承担任何直接或间接的责任。</div>
                <div className="explain-sec-content">2、本网不担保网络服务一定能满足用户的要求，也不担保网络服务不会中断，对网络服务的及时性、安全性、准确性也均不作担保。</div>
                <div className="explain-sec-content">3、除上述外，用户理解并同意，在使用本网前已阅读、完全知悉并同意《免责声明》，并同意《免责声明》条款作为本协议不可分割的一部分亦须遵守。</div>
                <div className="explain-sec-divider"></div>
                <div className="explain-sec-title">七、服务变更、中断或终止</div>
                <div className="explain-sec-content">1、如本网因系统维护或升级的需要而需暂停网络服务，本网将尽可能事先进行通告。</div>
                <div className="explain-sec-content">2、如发生下列任何一种情形，本网有权随时中断或终止向用户提供本协议项下的网络服务而无需通知用户：</div>
                <div className="explain-sec-content list">（1）用户提供的个人资料不合法或不真实； <br />（2）用户违反本协议中规定的使用规则或《免责声明》之有关条款。</div>
                <div className="explain-sec-content">3、除前款所述情形外，本网同时保留根据监管要求或出于合法、合理目的，在不事先通知用户的情况下随时中断或终止部分或全部网络服务的权利，对于所有服务的中断或终止而造成的任何损失，本网无需对用户或任何第三方承担任何直接或间接责任。</div>
                <div className="explain-sec-divider"></div>
                <div className="explain-sec-title">八、违约赔偿</div>
                <div className="explain-sec-content">1、用户同意保障和维护本网及其他用户的利益，如因用户违反有关法律、法规或本协议项下的任何条款而给本网或任何其他第三人造成损失，用户同意承担由此造成的损害赔偿责任（包括但不限于本网或燃数科技向第三方承担的赔偿金、违约金，或因参与诉讼而发生的律师费、诉讼费用等）。</div>
                <div className="explain-sec-content">2、用户以任何方式非法地或未经燃数科技同意而全部或部分复制、转载、引用、（超）链接、抓取或以其他方式使用本站的信息内容的，燃数有权不经通知直接暂停或终止用户使用本网账户和/或浏览、使用本网信息，用户须赔偿燃数科技因用户行为遭受的全部经济损失及名誉损失，同时本网保留追究用户法律责任的权利。</div>
                <div className="explain-sec-divider"></div>
                <div className="explain-sec-title">九、协议变更</div>
                <div className="explain-sec-content">1、本网将可能不时的修改本协议的有关条款，一旦条款内容发生变动，本网将会在相关的页面提示修改内容。</div>
                <div className="explain-sec-content">2、如果不同意本网对服务条款所做的修改，用户有权停止使用网络服务。如果用户继续使用网络服务，则视为用户接受服务条款的变动。</div>
                <div className="explain-sec-divider"></div>
                <div className="explain-sec-title">十、争议解决</div>
                <div className="explain-sec-content">1、本协议的订立、执行和解释及争议的解决均应适用中华人民共和国境内法律。</div>
                <div className="explain-sec-content">2、如双方就本协议内容或其执行发生任何争议，双方应尽量友好协商解决；协商不成时，任何一方均可向燃数科技或网站所在地有管辖权的人民法院提起诉讼。</div>
                <div className="explain-sec-divider"></div>
                <div className="explain-sec-title">十一、通知和送达</div>
                <div className="explain-sec-content">1、本协议项下所有的通知均可通过重要页面公告、电子邮件或常规的信件传送等方式进行；该等通知于发送之日视为已送达收件人。</div>
                <div className="explain-sec-divider"></div>
                <div className="explain-sec-title">十二、知识产权及数据安全</div>
                <div className="explain-sec-content">1、本网尊重知识产权，反对并打击侵犯知识产权的行为并致力于知识产权保护以及为用户提供一个诚信安全的交易平台。</div>
                <div className="explain-sec-content">2、本网严格遵守数据安全相关法律法规，反对并打击侵犯数据安全的行为，同时通过合理手段最大限度地确保本网公开的数据和信息不含个人隐私数据和敏感信息，同时确保数据和信息来源和加工过程合法合规。</div>
                <div className="explain-sec-content">3、本网将严格遵守，同时本网用户亦应严格遵守《中华人民共和国网络安全法》、《中华人民共和国商标法数据安全法》、《中华人民共和国商标法》、《中华人民共和国专利法》、《中华人民共和国电子商务法》等法律法规中关于数据安全及知识产权保护的规定。</div>
                <div className="explain-sec-divider"></div>
                <div className="explain-sec-title">十三、其他规定</div>
                <div className="explain-sec-content">1、本协议构成双方对本协议之约定事项及其他有关事宜的完整协议，除本协议规定的之外，未赋予本协议各方其他权利。</div>
                <div className="explain-sec-content">2、如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。</div>
                <div className="explain-sec-content">3、本协议中的标题仅为方便而设，在解释本协议时应被忽略。</div>
                <div className="explain-sec-content">4、本协议适用中华人民共和国境内法律，因任何一方出现违反法律的行为而造成协议条款的不能执行，都应由责任方自行负责并补偿由此而给对方造成的损失。</div>
                <div className="explain-sec-content">5、在法律范围内，本协议最终解释权属于本网。</div>

            </div>
        );
    }

    renderEnUSConetnt() {
        return (
            <div className="explain-content">
                <div className="explain-title">User Service Agreement</div>
                <div className="explain-sec-title">I.Scope</div>
                <div className="explain-sec-content">1、The website of Beijing Databurning Technology Co., Ltd. (available at https://www.databurning.com/)(hereinafter referred to as the "Website") is developed, constructed, operated and managed by Beijing Databurning Technology Co., Ltd. (hereinafter referred to as "Databurning").</div>
                <div className="explain-sec-content">2、By registering with and flipping through this Website according to the following terms of this User Service Agreement (hereinafter referred to as this “Agreement"), members (hereinafter referred to as "Users") agree to the following terms of service and are entitled to the corresponding services provided by this Website. </div>
                <div className="explain-sec-divider"></div>
                <div className="explain-sec-title">II.Ownership of the Contents on the Website </div>
                <div className="explain-sec-content">1、The network services provided by this Website may include text, software, voices, images, videos, charts, etc. which are derived from the modeling and calculation of the legal and publicly available information collected by Databurning through its own engine under the protection of the laws of copyrights, trademarks and other property ownership rights. </div>
                <div className="explain-sec-content">2、Users are not allowed to reprocess the contents on this Website (including but not limited to interpretation, analysis, change, modification, etc.) or copy or recreate the same or create derivative products related thereto unless with the authorization of this Website or other relevant right owners.</div>
                <div className="explain-sec-divider"></div>
                <div className="explain-sec-title">III.User Registration and Privacy Protection</div>
                <div className="explain-sec-content">1、In order to safeguard the legitimate rights and interests of users and avoid disputes over inconsistencies between the registration data on users and the real situation during the service period, users must provide authentic, comprehensive and accurate information for the purpose of registration. If no services may be performed as a result of any inconsistencies between the registration data on users and the real situation or any incorrect or incomplete information provided by users for the purpose of registration, this Website will not be responsible. If the information provided by a user contains illegal or incorrect information, this Website reserves the right to terminate the user's access to services.</div>
                <div className="explain-sec-content">2、The user registration information on this Website will not be used for any purposes other than providing relevant services to users. At the same time, users must keep their user passwords, personal accounts and other information confidential to protect the same from theft or tampering. If a user becomes aware of any of the above situation, he/she shall immediately get in contact with the Website for a reasonable solution, but the Website will not bear any responsibilities for the user's willful disclosure, directly or indirectly.</div>
                <div className="explain-sec-content">3、It is a basic policy of the Website to protect users' privacy. The Website guarantees not to disclose or provide third parties with the registration data on users and non-public contents stored on the Website during access to network services, except to the extent that:</div>
                <div className="explain-sec-content list">（1）Explicit authorization is obtained from a user in advance; <br />（2）Are required by the relevant laws and regulations;<br /> （3）Are required by concerned government authorities; <br />（4）Are for the purpose of safeguarding the interests of the public; <br />（5）Are for the purpose of safeguarding the legitimate rights and interests of the Website and / or Databurning.</div>
                <div className="explain-sec-content">4、Users agree that the Website may provide relevant network services to users through cooperation with a third party, in which case, the Website may provide the registration data on users and other information to the third party provided that the third party agrees to assume the same responsibility as the Website to protect users’ privacy.</div>
                <div className="explain-sec-content">5、Without disclosing the privacy information on an individual user, the Website has the right to analyze and commercialize the entire user database.</div>
                <div className="explain-sec-divider"></div>
                <div className="explain-sec-title">IV.Rights and Services Enjoyed by Users</div>
                <div className="explain-sec-content">1、Users have the right to query about, modify and delete their personal data at any time. For the sake of customer service security, account numbers cannot be changed at will.</div>
                <div className="explain-sec-content">2、Users enjoy the services purchased on this Website.</div>
                <div className="explain-sec-content">3、The specific network services are provided by this Website in light of the actual conditions. All the contents of this Website are only for the purpose of display and sharing, representing no value judgment or value orientation of Databurning or this Website. This Website reserves the right to change, interrupt or terminate the network services in whole or in part at any time.</div>
                <div className="explain-sec-content">4、While providing network services, the Website may charge users certain fees or additional fees for some of network services (such as purchasing reports and other services). In this case, the Website will give clear tips on relevant pages. If a user refuses to pay such fees, he/she will gain no access to the relevant network services.</div>
                <div className="explain-sec-content">5、Users understand that in addition to relevant network services provided by this Website, the equipment related to relevant network services (such as computers, modems and other devices related to Internet access) and necessary expenses (such as telephone fees and Internet access fees paid for Internet access) shall be borne by users.</div>
                <div className="explain-sec-divider"></div>
                <div className="explain-sec-title">V.User Management</div>
                <div className="explain-sec-content">1、Users shall not use this Website to endanger national security, disclose state secrets or infringe upon the legitimate rights and interests of the state, social collective and citizens or produce, copy and disseminate the following information:</div>
                <div className="explain-sec-content list">（1）Inciting resistance against and undermining the implementation of the constitution, laws and administrative regulations;<br />（2）Inciting the subversion of state power and the overthrow of the socialist system;<br />（3）Inciting secession of and undermining national unity;<br />（4）Inciting racial hatred and ethnic discrimination, and undermining national unity;<br />（5）Fabricating or distorting facts, spreading rumors or disturbing social order;<br />（6）Advocating feudal superstition, pornography, gambling, violence, homicide, terror or instigating crimes;<br />（7）Blatantly insulting others, fabricating facts to slander others or making other malicious attacks;<br />（8）Damaging the reputation of state agencies;<br />Other information in violation of the constitution, laws and administrative regulations;<br />（10）Commercial advertising without permission.</div>
                <div className="explain-sec-content list">The Website declares that the system records of users may be used as evidence as to whether or not a user has the violated laws, regulations and relevant policy documents.</div>
                <div className="explain-sec-divider"></div>
                <div className="explain-sec-title">VI.Disclaimer</div>
                <div className="explain-sec-content">1、Users expressly agree that use of the network services from this Website will be at their own risk; all consequences arising from their use of the network services from this Website shall also be borne by themselves and this Website will not bear any direct or indirect liabilities.</div>
                <div className="explain-sec-content">2、This Website does not guarantee that network services will surely satisfy the demand of users, or will not be interrupted, nor will it guarantee the timeliness, security and accuracy of the network services.</div>
                <div className="explain-sec-content">3、In addition to the above, users understand and agree that they have read, fully understood and agreed to the Disclaimer before use of this Website and that the terms of the Disclaimer, as an integral part of this Agreement, must also be observed.</div>
                <div className="explain-sec-divider"></div>
                <div className="explain-sec-title">VII.Change, Interruption or Termination of Services</div>
                <div className="explain-sec-content">1、If the network services need to be suspended for the purpose of system maintenance or upgrade, the Website will give a notice in advance as far as possible.</div>
                <div className="explain-sec-content">2、The Website has the right to suspend or terminate provision of the network services to any user under this Agreement at any time without notice if:</div>
                <div className="explain-sec-content list">（1）The personal data provided by a user is illegal or untrue; <br />（2）A user violates the rules of use specified in this Agreement or the relevant provisions of the Disclaimer.</div>
                <div className="explain-sec-content">3、In addition to the preceding paragraph, the Website also reserves the right to interrupt or terminate part or all of the network services at any time without prior notice to users according to regulatory requirements or for legal and reasonable purposes. The Website does not bear any direct or indirect liabilities to users or any third party for any losses caused by the interruption or termination of all services.</div>
                <div className="explain-sec-divider"></div>
                <div className="explain-sec-title">VIII.Liquidated Damages</div>
                <div className="explain-sec-content">1、Users agree to protect the interests of the Website and other users. If a user violates the relevant laws, regulations or any terms under this Agreement causing losses to the Website or any other third party, the user agrees to bear the liability for damages (including but not limited to the compensation and liquidated damages paid by the Website or Databurning to the third party or the attorney's fees and litigation costs incurred for participation in the litigation).</div>
                <div className="explain-sec-content">2、If a user copies, reproduces, quotes, (hyperlinks), captures or otherwise uses the information on this Website in whole or in part in any illegal way or without the consent of Databurning, Databurning has the right to directly suspend or terminate the user's access to this Website account and / or flipping through and use of the information on this Website without notice, in which case, the user shall compensate Databurning for all economic losses and reputation losses caused by the user's behavior, while this Website reserves the right to hold users legally responsible.</div>
                <div className="explain-sec-divider"></div>
                <div className="explain-sec-title">IX.Changes to this Agreement</div>
                <div className="explain-sec-content">1、The Website may modify the relevant terms of this Agreement from time to time. In case of changes thereto, the Website will remind users of the modification on the relevant pages.</div>
                <div className="explain-sec-content">2、If a user disagrees with the modification to the terms of service made by the Website, the user has the right to stop using the network services. If a user continues to use the network services, it is deemed that the user has accepted the changes to the terms of service.</div>
                <div className="explain-sec-divider"></div>
                <div className="explain-sec-title">X.Dispute Resolution</div>
                <div className="explain-sec-content">1、The conclusion, performance and interpretation of this Agreement and the resolution of disputes shall be governed by the laws of the People's Republic of China.</div>
                <div className="explain-sec-content">2、If there is any dispute between both parties over the contents or performance of this Agreement, both parties shall use their best efforts to settle the dispute through amicable consultation; if the negotiation fails, either party may bring a lawsuit to the People’s Court of the place where Databurning or this Website is located.</div>
                <div className="explain-sec-divider"></div>
                <div className="explain-sec-title">XI.Service of Notices</div>
                <div className="explain-sec-content">1、All notices under this Agreement may be made by announcements on web pages, e-mails or regular mail delivery, etc.; such notices are deemed to have been served on recipients on the date of delivery.</div>
                <div className="explain-sec-divider"></div>
                <div className="explain-sec-title">XII.Intellectual Property Rights and Data Security</div>
                <div className="explain-sec-content">1、We respect intellectual property rights, oppose and crack down on violations of intellectual property rights and are committed to protection of intellectual property rights and providing users with a  credible and safe trading platform.</div>
                <div className="explain-sec-content">2、We strictly comply with the laws and regulations related to data security by opposing and cracking down on the breach of data security and ensure that the data and information disclosed by this Website contain no personal privacy data and sensitive information to the greatest extent by reasonable means and that the source of data and information and processing process are legally compliant.</div>
                <div className="explain-sec-content">3、Both this Website and users will strictly abide by the regulations on protection of data security and intellectual property rights in the laws and regulations such as the Cyber Security Law of the People’s Republic of China, the Trademark Law of the people's Republic of China, the Data Security Law of the People's Republic of China, the <span className="book-name">Patent Law of the People's Republic of China</span> and the <span className="book-name">E-Commerce Law of the People's Republic of China</span>.</div>
                <div className="explain-sec-divider"></div>
                <div className="explain-sec-title">XIII.Miscellaneous </div>
                <div className="explain-sec-content">1、This Agreement constitutes the entire agreement between the parties on the matters agreed upon herein and other relevant matters. Except as otherwise stipulated in this Agreement, no other rights are conferred upon the parties to this Agreement.</div>
                <div className="explain-sec-content">2、If any provision of this Agreement becomes invalid or unenforceable in whole or in part for any reason, the remainder of this Agreement shall remain valid and binding.</div>
                <div className="explain-sec-content">3、The headings herein are provided for reference and convenience only, without regard to the interpretation of this Agreement.</div>
                <div className="explain-sec-content">4、This Agreement shall be governed by the laws of the people's Republic of China. If the terms of this Agreement cannot be enforced due to the violation of laws by either party, the violating party shall be responsible for making compensation for the losses caused to the other party.</div>
                <div className="explain-sec-content">5、To the extent permitted by law, the Website shall have the ultimate power to interpret this Agreement.</div>

            </div>
        );
    }

    render() {
        const { currentLanguage } = this.props
        return currentLanguage === 'zh_CN' ? this.renderZhCNContent() : this.renderEnUSConetnt()

    }
}

User.propTypes = {

};

export default User;