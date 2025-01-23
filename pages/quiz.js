import { fetchQuestions } from '../api.js';
import { addCoins, getCoins, addHighScore, incrementGamesPlayed } from '../utils.js';

export async function QuizPage(params) {
    const container = document.createElement('div');
    container.className = 'form-home';
    
    const searchParams = new URLSearchParams(params);
    const category = searchParams.get('category');

    // Show loading state
    container.innerHTML = '<div class="text-white">Loading questions...</div>';

    try {
        const questions = await fetchQuestions(
            searchParams.get('amount') || '10',
            category,
            searchParams.get('difficulty')
        );

        let currentQuestion = 0;
        let score = 0;

        function showQuestion() {
            const question = questions[currentQuestion];
            const answers = [...question.incorrect_answers, question.correct_answer]
                .sort(() => Math.random() - 0.5);

            container.innerHTML = `
                <div class="text-white mb-4">
                    <h3>Question ${currentQuestion + 1}/${questions.length}</h3>
                    <p class="question-text">${question.question}</p>
                </div>
                <div class="d-grid gap-2">
                    ${answers.map(answer => `
                        <button class="btn btn-primary answer-btn" onclick="window.handleAnswer('${answer.replace(/'/g, "&apos;")}')">${answer}</button>
                    `).join('')}
                </div>
            `;
        }

        // Add global handler for answers
        window.handleAnswer = (selectedAnswer) => {
            const question = questions[currentQuestion];
            if (selectedAnswer === question.correct_answer) {
                score++;
                const coinsEarned = 10;
                addCoins(coinsEarned);
            }

            currentQuestion++;
            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                showResults();
            }
        };

        function showResults() {
            const playerName = localStorage.getItem('playerName') || 'Anonymous';
            incrementGamesPlayed();
            addHighScore(playerName, score, score * 10, category);

            container.innerHTML = `
                <div class="text-white text-center">
                    <h2>Quiz Complete!</h2>
                    <p>Your score: ${score}/${questions.length}</p>
                    <p>Coins earned: 🪙 ${score * 10}</p>
                    <div class="mt-3">
                        <button class="btn btn-primary me-2" onclick="window.location.hash = '#/'">Try Again</button>
                        <button class="btn btn-secondary" onclick="window.location.hash = '#/profile'">View Profile</button>
                    </div>
                </div>
            `;
        }

        // Start showing questions
        showQuestion();

    } catch (error) {
        console.error('Error loading quiz:', error);
        container.innerHTML = `
            <div class="text-white text-center">
                <p>Error loading questions. Please try again.</p>
                <button class="btn btn-primary" onclick="window.location.hash = '#/'">Go Back</button>
            </div>
        `;
    }

    return container;
}