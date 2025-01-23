

const formatQueryParams = (paramsObj) => `?${Object.keys(paramsObj).map((k) => `${k}=${paramsObj[k]}`).join("&")}`;


export const getQueryParams = (paramsStr) => {
    const p = new URLSearchParams(paramsStr);
    const params = {}
    p.forEach((value, key) => {
        if(value === "Any" || key === "name")return
        params[key] = value;
    })
    return formatQueryParams(params);
}

export const fisherYatesShuffle = (arr) => {
    const newArr = Array.from(arr);
    for (let i = newArr.length -1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i+1));
      let k = newArr[i];
      newArr[i] = newArr[j];
      newArr[j] = k;
    }
    return newArr
  }

