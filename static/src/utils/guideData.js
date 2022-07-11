let guideData = {};
let isCompanyLoad = false;
window.guideData = guideData;



export function isCompanyAddress() {
    return location.pathname === '/page/companyAnalysis';
}

export const setGuideData = (type, data) => {
    guideData[type] = data;
}


const getCount = async () => {
   
    let count =  Object.values(guideData);
    let len = isCompanyAddress() ? 3 : 2;
    if (count.length === len) {
        return count;
    } else {
        await new Promise((resolve, reject) => { setTimeout(() => { resolve() }, 100); });
        return await getCount();
    }

}

export const getGuideCount = async () => {
   const count = await getCount();
    return count;
   // return Object.values(guideData)
    // return count.reduce((prev, curr) => {
    //     return prev.concat(curr);
    // }, []);
}

export const setCompany = () => {
    isCompanyLoad = true;
}

const getCompany = async () => {
    
    if (isCompanyLoad) {
        return isCompanyLoad;
    } else {
        // debugger;
        await new Promise((resolve, reject) => { setTimeout(() => { resolve() }, 100); });
        return await getCompany();
    }

}

export const getCompanyLoad = async () => {
    return await getCompany();
}