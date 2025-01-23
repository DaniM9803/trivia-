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

export const getCoins = () => {
    return parseInt(localStorage.getItem('quizCoins')) || 0;
};

export const addCoins = (amount) => {
    const currentCoins = getCoins();
    const newTotal = currentCoins + amount;
    localStorage.setItem('quizCoins', newTotal);
    window.dispatchEvent(new CustomEvent('coinsUpdated'));
    return newTotal;
};

export const getHighScores = () => {
    const scores = localStorage.getItem('quizHighScores');
    return scores ? JSON.parse(scores) : [];
};

export const addHighScore = (name, score, coins, category) => {
    const scores = getHighScores();
    const newScore = {
        name,
        score,
        coins,
        category: category ? parseInt(category) : null,
        date: new Date().toISOString()
    };
    scores.push(newScore);
    scores.sort((a, b) => b.score - a.score || b.coins - a.coins);
    const topScores = scores.slice(0, 10);
    localStorage.setItem('quizHighScores', JSON.stringify(topScores));
    window.dispatchEvent(new CustomEvent('scoresUpdated'));
    return topScores;
};

export const incrementGamesPlayed = () => {
    const gamesPlayed = parseInt(localStorage.getItem('gamesPlayed')) || 0;
    localStorage.setItem('gamesPlayed', gamesPlayed + 1);
    return gamesPlayed + 1;
};

export const getCategoryHighScore = (categoryId) => {
    const scores = getHighScores();
    const categoryScores = scores.filter(score => score.category === categoryId);
    return categoryScores.length > 0 
        ? Math.max(...categoryScores.map(score => score.score))
        : 0;
};