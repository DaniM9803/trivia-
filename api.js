const BASE_URL = 'https://opentdb.com/api.php';

export async function fetchQuestions(amount, category, difficulty) {
    try {
        let url = `${BASE_URL}?amount=${amount}`;
        if (category) url += `&category=${category}`;
        if (difficulty) url += `&difficulty=${difficulty}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.response_code === 0) {
            return data.results;
        } else {
            throw new Error('Failed to fetch questions');
        }
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
    }
}
