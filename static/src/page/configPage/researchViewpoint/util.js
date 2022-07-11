import { GetQueryString, getUrlPath } from '@util';
//获取登录用户信息
const getData = (data) => {
  if (!data) return;
  data = Base64.decode(data);
  if (!data) return;
  try {
    data = JSON.parse(data);
  } catch (error) {
    return null;
  }
  return data;
}

export const getPageParam = () => {
  const menu = getData(PAGEMIXDATA);
  const resName = menu.leftMenu.resName;
  //判断公司、行业类型
  const path = getUrlPath();
  let queryType = '';
  if (path.indexOf('company') !== -1) {
    queryType = "company"
  } else {
    queryType = "industry"
  }
  return { [queryType]: resName }
}