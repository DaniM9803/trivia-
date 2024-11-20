export function HomePage() {
    const container = document.createElement('div');
    container.innerHTML = `
        <form class="form-home">
            <div class="form-input-container">
                <label for="amount" class="form-label text-white">Number of Questions:</label>
                <input type="number" class="form-control" id="amount" min="1" max="50" value="10" required>
            </div>
            
            <div class="form-input-container">
                <label for="category" class="form-label text-white">Category:</label>
                <select class="form-control" id="category">
                    <option value="">Any Category</option>
                    <option value="9">General Knowledge</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="11">Entertainment: Film</option>
                    <option value="12">Entertainment: Music</option>
                    <option value="13">Entertainment: Musicals & Theatres</option>
                    <option value="14">Entertainment: Television</option>
                    <option value="15">Entertainment: Video Games</option>
                    <option value="16">Entertainment: Board Games</option>
                    <option value="17">Science & Nature</option>
                    <option value="18">Science: Computers</option>
                    <option value="19">Science: Mathematics</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                    <option value="29">Entertainment: Comics</option>
                    <option value="30">Science: Gadgets</option>
                    <option value="31">Entertainment: Japanese Anime & Manga</option>
                    <option value="32">Entertainment: Cartoon & Animations</option>
                </select>
            </div>
            
            <div class="form-input-container">
                <label for="difficulty" class="form-label text-white">Difficulty:</label>
                <select class="form-control" id="difficulty">
                    <option value="">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            
            <button type="submit" class="btn btn-primary w-100">Start Quiz</button>
        </form>
    `;

    const form = container.querySelector('form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const amount = document.getElementById('amount').value;
        const category = document.getElementById('category').value;
        const difficulty = document.getElementById('difficulty').value;

        try {
            window.location.hash = `#/quiz?amount=${amount}&category=${category}&difficulty=${difficulty}`;
        } catch (error) {
            alert('Error starting quiz. Please try again.');
        }
    });

    return container;
}