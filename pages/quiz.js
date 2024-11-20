import { fetchQuestions } from '../api.js';

export async function QuizPage(params) {
    const container = document.createElement('div');
    container.className = 'form-home';
    container.innerHTML = '<div class="text-white">Loading questions...</div>';

    try {
        const searchParams = new URLSearchParams(params);
        const questions = await fetchQuestions(
            searchParams.get('amount'),
            searchParams.get('category'),
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
                    <p>${question.question}</p>
                </div>
                <div class="d-grid gap-2">
                    ${answers.map(answer => `
                        <button class="btn btn-primary answer-btn">${answer}</button>
                    `).join('')}
                </div>
            `;

            const answerButtons = container.querySelectorAll('.answer-btn');
            answerButtons.forEach(button => {
                button.addEventListener('click', () => checkAnswer(button.textContent));
            });
        }

        function checkAnswer(selectedAnswer) {
            const question = questions[currentQuestion];
            if (selectedAnswer === question.correct_answer) {
                score++;
            }

            currentQuestion++;
            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                showResults();
            }
        }

        function showResults() {
            container.innerHTML = `
                <div class="text-white text-center">
                    <h2>Quiz Complete!</h2>
                    <p>Your score: ${score}/${questions.length}</p>
                    <button class="btn btn-primary" onclick="window.location.hash = '#/'">Try Again</button>
                </div>
            `;
        }

        showQuestion();
    } catch (error) {
        container.innerHTML = `
            <div class="text-white text-center">
                <p>Error loading questions. Please try again.</p>
                <button class="btn btn-primary" onclick="window.location.hash = '#/'">Go Back</button>
            </div>
        `;
    }

    return container;
}