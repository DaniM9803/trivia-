

export const getQueryParams = (paramsStr) => {
    const p = new URLSearchParams(paramsStr);
    const params = {}
    p.forEach((value, key) => {
        params[key] = value;
    })
    return params;
}

export const createQueryParams = (paramsObj) => {
    
}