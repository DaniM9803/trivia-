export function HomePage() {
   
    const categories = [
        { id: 9, icon: '🌍', name: 'General Knowledge' },
        { id: 10, icon: '📚', name: 'Books' },
        { id: 11, icon: '🎬', name: 'Film' },
        { id: 12, icon: '🎵', name: 'Music' },
        { id: 13, icon: '🎭', name: 'Theatre' },
        { id: 14, icon: '📺', name: 'Television' },
        { id: 15, icon: '🎮', name: 'Video Games' },
        { id: 16, icon: '🎲', name: 'Board Games' },
        { id: 17, icon: '🔬', name: 'Science & Nature' },
        { id: 18, icon: '💻', name: 'Computers' },
        { id: 19, icon: '🧮', name: 'Mathematics' },
        { id: 20, icon: '🏛️', name: 'Mythology' },
        { id: 21, icon: '🏃', name: 'Sports' },
        { id: 22, icon: '🌍', name: 'Geography' },
        { id: 23, icon: '📜', name: 'History' },
        { id: 24, icon: '🏛️', name: 'Politics' },
        { id: 25, icon: '🎨', name: 'Art' },
        { id: 26, icon: '👥', name: 'Celebrities' },
        { id: 27, icon: '🐾', name: 'Animals' },
        { id: 28, icon: '🚗', name: 'Vehicles' },
        { id: 29, icon: '📚', name: 'Comics' },
        { id: 30, icon: '🧪', name: 'Science: Gadgets' },
        { id: 31, icon: '🎌', name: 'Anime & Manga' },
        { id: 32, icon: '🎨', name: 'Cartoon & Animation' }
    ];

    const container = document.createElement('div');
    container.className = 'home-container';

    container.innerHTML = `
        <div class="welcome-section">
            <h1 class="welcome-title">Welcome to TriviaMaster!
            <p class="welcome-text">Challenge yourself with our exciting quizzes and earn coins for every correct answer!</p>
        </div>

        <div class="categories-section">
            <h2 class="categories-title">Quiz Categories</h2>
            <div class="categories-grid">
                ${categories.map(cat => `
                    <div class="category-card" onclick="window.location.hash='#/quiz?category=${cat.id}&amount=10'">
                        <span class="category-icon">${cat.icon}</span>
                        <h3 class="category-name">${cat.name}</h3>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="stats-section mt-5 text-center text-white">
            <h2>Your Stats</h2>
            <div class="stats-grid mt-4">
                <div class="stat-card">
                    <span class="stat-icon">🪙</span>
                    <div class="stat-value">${localStorage.getItem('quizCoins') || 0}</div>
                    <div class="stat-label">Total Coins</div>
                </div>
                <div class="stat-card">
                    <span class="stat-icon">🏆</span>
                    <div class="stat-value">${localStorage.getItem('gamesPlayed') || 0}</div>
                    <div class="stat-label">Games Played</div>
                </div>
            </div>
        </div>
    `;

    return container;
}