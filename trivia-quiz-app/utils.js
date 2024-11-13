
//TODO use another solution instead of forEach
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

// const key = "name";
// const person = {
//     "full name": "Cristi",
//     age: 18,
//     ocupation: "Engineer"
// }
// console.log(person["full name"])

