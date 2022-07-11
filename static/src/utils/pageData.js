import _ from 'lodash';
let pageDataList = [];
window.pageDataList = pageDataList;


function handlePageList(curPageList) {
    let resultPageList = curPageList.filter(f => f.current);

    resultPageList = resultPageList.sort(function (a, b) { return a.current.props.downIndex - b.current.props.downIndex })

    if (Array.isArray(resultPageList) && resultPageList.length > 0) {
        resultPageList = resultPageList.sort(function (a, b) { return a.current.props.sortIndex - b.current.props.sortIndex })
    }
    return resultPageList;
}
export async function getPageData() {
    let result = []

    await handlePageList(pageDataList).forEach(async (item) => {
        if (!item.current) {
            return;
        }
        const res = await item.current.getExcelData();
        result.push(res);
    })
    return result;

}

export function addPageData(ref) {
    pageDataList.push(ref);
}

export function getPageTile() {

    if (pageDataList.length > 0) {
        for (let i = 0; i < pageDataList.length; i++) {
            const item = pageDataList[i];
            if (item.current) {
                return item.current.getFileName();
            }
        }
    } else {
        return `${document.title}.xlsx`;
    }
}

export function getPageIndicator() {
    // indicatorData
    const indicatorData = handlePageList(pageDataList).reduce((prev, item) => {
        return prev.concat(item.current ? item.current.props.indicatorData : []);
    }, [])
    return _.uniqWith(indicatorData, _.isEqual);
}

export async function resetPageData() {
    pageDataList = [];
}


// 全局table下载
let globalTableIsDownload = false;

export function setTableIsDownload(isDownload) {
    globalTableIsDownload = isDownload;
}

export function getTableIsDownload() {
    return globalTableIsDownload;
}


// 底部免责声明
let bottomExplain = {};
export function setBottomExplainFun(fun) {
    bottomExplain.fun = fun;
}
export function getBottomExplainFun() {
    return  bottomExplain?.fun()
}
