import i18n from '@/plugin/i18n';

export const getDisClaimers = () => {
    const language = i18n.getLocalLanguage()
    let disClaimers = [
        { "text": `© 2022 ${i18n.format("北京燃数科技有限公司")}. All rights reserved.` },
        { "text": `${i18n.format("京ICP备19017910号-1")}` },
        { "text": `${i18n.format("京公网安备")} 11010502038235` },
        { "text": `${i18n.format("用户协议")}`, "href": "/page/explain?tab=0" },
        { "text": `${i18n.format("隐私政策")}`, "href": "/page/explain?tab=1" },
        { "text": `${i18n.format("免责声明")}`, "href": "/page/explain?tab=2" }
    ]
    if (language !== "zh_CN") {
        disClaimers = [
            { "text": `© 2022 ${i18n.format("北京燃数科技有限公司")}. All rights reserved.` },
            { "text": `${i18n.format("用户协议")}`, "href": "/page/explain?tab=0" },
            { "text": `${i18n.format("隐私政策")}`, "href": "/page/explain?tab=1" },
            { "text": `${i18n.format("免责声明")}`, "href": "/page/explain?tab=2" }
        ]
    }

    return disClaimers
}

export const DISCLAIMERS = getDisClaimers()