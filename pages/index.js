export function IndexPage() {
    const container = document.createElement('div');
    container.className = 'home-container';
    
    const categories = [
        { id: 9, name: 'General Knowledge', icon: '🎓' },
        { id: 10, name: 'Books', icon: '📚' },
        { id: 11, name: 'Film', icon: '🎬' },
        { id: 12, name: 'Music', icon: '🎵' },
        { id: 17, name: 'Science & Nature', icon: '🔬' },
        { id: 21, name: 'Sports', icon: '⚽' },
        { id: 23, name: 'History', icon: '📜' },
        { id: 27, name: 'Animals', icon: '🐾' },
        { id: 31, name: 'Anime & Manga', icon: '🎌' }
    ];

    container.innerHTML = `
        <div class="welcome-section">
            <h1 class="welcome-title">Welcome to Trivia Quiz!</h1>
            <p class="welcome-text">Test your knowledge across various categories or try a random quiz.</p>
        </div>
        
        <div class="quick-start">
            <button onclick="window.location.hash='#/home'" class="btn btn-primary quick-start-btn">
                <span class="btn-icon">🎲</span>
                Custom Quiz
            </button>
        </div>

        <div class="categories-section">
            <h2 class="categories-title">Popular Categories</h2>
            <div class="categories-grid">
                ${categories.map(category => `
                    <div class="category-card" 
                         onclick="window.location.hash='#/quiz?amount=10&category=${category.id}'">
                        <span class="category-icon">${category.icon}</span>
                        <h3 class="category-name">${category.name}</h3>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    return container;
} 