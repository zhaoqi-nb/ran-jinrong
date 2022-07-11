let tableData = {
    isTableDestroy: true,
}

export const getTableData = () => {
    return tableData;
}

export const setTableData = (data) => {
    for (const key in data) {
        tableData[key] = data[key];
    }
}
