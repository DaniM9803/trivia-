
export const getCategories = async () => {
    const result = await fetch("https://opentdb.com/api_category.php");
    const data = await result.json();
    return data;
}

export const resetToken = async (storedToken) => {
    await fetch(`https://opentdb.com/api_token.php?command=reset&token=${storedToken}`); 
}


export const requestToken = async () => {
    const result = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await result.json();
    return data;
}

export const getQuestions = async (params) => {
    const result = await fetch(`https://opentdb.com/api.php?${params}`);
    const data = await result.json();
    return data;
}
