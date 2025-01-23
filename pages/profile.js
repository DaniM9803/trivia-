import { getCoins, getHighScores, getCategoryHighScore } from '../utils.js';

export function ProfilePage() {
    const container = document.createElement('div');
    container.className = 'form-home profile-container';

    const playerName = localStorage.getItem('playerName') || 'Anonymous';
    const totalGames = parseInt(localStorage.getItem('gamesPlayed')) || 0;
    const highScores = getHighScores();
    const bestScore = highScores.length > 0 ? Math.max(...highScores.map(score => score.score)) : 0;
    const totalCoins = getCoins();
    
    
    const averageScore = highScores.length > 0 
        ? (highScores.reduce((sum, score) => sum + score.score, 0) / highScores.length).toFixed(1)
        : 0;

    
    const categoryAchievements = [
        { id: 9, icon: '🌍', name: 'General Knowledge', desc: 'Score 8+ in General Knowledge' },
        { id: 10, icon: '📚', name: 'Bookworm', desc: 'Score 8+ in Books' },
        { id: 11, icon: '🎬', name: 'Film Buff', desc: 'Score 8+ in Film' },
        { id: 12, icon: '🎵', name: 'Music Maestro', desc: 'Score 8+ in Music' },
        { id: 13, icon: '🎭', name: 'Theatre Expert', desc: 'Score 8+ in Theatre' },
        { id: 14, icon: '📺', name: 'TV Enthusiast', desc: 'Score 8+ in Television' },
        { id: 15, icon: '🎮', name: 'Gaming Guru', desc: 'Score 8+ in Video Games' },
        { id: 16, icon: '🎲', name: 'Board Game Champion', desc: 'Score 8+ in Board Games' },
        { id: 17, icon: '🔬', name: 'Science Whiz', desc: 'Score 8+ in Science & Nature' },
        { id: 18, icon: '💻', name: 'Tech Savvy', desc: 'Score 8+ in Computers' },
        { id: 19, icon: '🧮', name: 'Math Genius', desc: 'Score 8+ in Mathematics' },
        { id: 20, icon: '🏛️', name: 'Mythology Scholar', desc: 'Score 8+ in Mythology' },
        { id: 21, icon: '🏃', name: 'Sports Expert', desc: 'Score 8+ in Sports' },
        { id: 22, icon: '🌍', name: 'Geography Pro', desc: 'Score 8+ in Geography' },
        { id: 23, icon: '📜', name: 'History Buff', desc: 'Score 8+ in History' },
        { id: 24, icon: '🏛️', name: 'Politics Sage', desc: 'Score 8+ in Politics' },
        { id: 25, icon: '🎨', name: 'Art Connoisseur', desc: 'Score 8+ in Art' },
        { id: 26, icon: '👥', name: 'Celebrity Expert', desc: 'Score 8+ in Celebrities' },
        { id: 27, icon: '🐾', name: 'Animal Lover', desc: 'Score 8+ in Animals' },
        { id: 28, icon: '🚗', name: 'Vehicle Virtuoso', desc: 'Score 8+ in Vehicles' },
        { id: 29, icon: '📚', name: 'Comics Guru', desc: 'Score 8+ in Comics' },
        { id: 30, icon: '🧪', name: 'Gadget Geek', desc: 'Score 8+ in Science: Gadgets' },
        { id: 31, icon: '🎌', name: 'Anime Aficionado', desc: 'Score 8+ in Anime & Manga' },
        { id: 32, icon: '🎨', name: 'Animation Expert', desc: 'Score 8+ in Cartoon & Animation' }
    ];

    
    const getCategoryName = (categoryId) => {
        const category = categoryAchievements.find(cat => cat.id === parseInt(categoryId));
        return category ? category.name : 'General Quiz';
    };

    container.innerHTML = `
        <div class="profile-header">
            <div class="profile-avatar">
                ${playerName.charAt(0).toUpperCase()}
            </div>
            <h2 class="profile-name">${playerName}</h2>
            <button class="btn btn-outline-light btn-sm edit-name-btn" onclick="document.getElementById('editNameModal').style.display='flex'">
                <i class="fas fa-edit"></i> Edit Name
            </button>
        </div>

        <div class="profile-stats">
            <div class="stat-card">
                <span class="stat-icon">🎮</span>
                <div class="stat-value">${totalGames}</div>
                <div class="stat-label">Games Played</div>
            </div>
            <div class="stat-card">
                <span class="stat-icon">🏆</span>
                <div class="stat-value">${bestScore}</div>
                <div class="stat-label">Best Score</div>
            </div>
            <div class="stat-card">
                <span class="stat-icon">📊</span>
                <div class="stat-value">${averageScore}</div>
                <div class="stat-label">Average Score</div>
            </div>
            <div class="stat-card">
                <span class="stat-icon">🪙</span>
                <div class="stat-value">${totalCoins}</div>
                <div class="stat-label">Total Coins</div>
            </div>
        </div>

        <div class="profile-achievements">
            <h3 class="section-title">General Achievements</h3>
            <div class="achievements-grid">
                <div class="achievement-card ${totalGames >= 1 ? 'achieved' : ''}">
                    <span class="achievement-icon">🎯</span>
                    <div class="achievement-title">First Steps</div>
                    <div class="achievement-desc">Complete your first quiz</div>
                </div>
                <div class="achievement-card ${totalGames >= 10 ? 'achieved' : ''}">
                    <span class="achievement-icon">🎮</span>
                    <div class="achievement-title">Quiz Enthusiast</div>
                    <div class="achievement-desc">Play 10 quizzes</div>
                </div>
                <div class="achievement-card ${bestScore >= 10 ? 'achieved' : ''}">
                    <span class="achievement-icon">⭐</span>
                    <div class="achievement-title">Perfect Score</div>
                    <div class="achievement-desc">Score 10/10 in a quiz</div>
                </div>
                <div class="achievement-card ${totalCoins >= 100 ? 'achieved' : ''}">
                    <span class="achievement-icon">💰</span>
                    <div class="achievement-title">Coin Collector</div>
                    <div class="achievement-desc">Earn 100 coins</div>
                </div>
            </div>

            <h3 class="section-title mt-4">Category Mastery</h3>
            <div class="achievements-grid">
                ${categoryAchievements.map(cat => `
                    <div class="achievement-card ${getCategoryHighScore(cat.id) >= 8 ? 'achieved' : ''}">
                        <span class="achievement-icon">${cat.icon}</span>
                        <div class="achievement-title">${cat.name}</div>
                        <div class="achievement-desc">${cat.desc}</div>
                        <div class="achievement-progress">Best: ${getCategoryHighScore(cat.id)}/10</div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="recent-activity">
            <h3 class="section-title">Recent Activity</h3>
            <div class="activity-list">
                ${highScores.slice(0, 5).map(score => `
                    <div class="activity-item">
                        <span class="activity-icon">📝</span>
                        <div class="activity-details">
                            <div class="activity-title">${getCategoryName(score.category)}</div>
                            <div class="activity-stats">Score: ${score.score}/10 | Coins: 🪙 ${score.coins}</div>
                            <div class="activity-date">${new Date(score.date).toLocaleDateString()}</div>
                        </div>
                    </div>
                `).join('') || '<div class="no-activity">No recent activity</div>'}
            </div>
        </div>

        <!-- Edit Name Modal -->
        <div id="editNameModal" class="modal">
            <div class="modal-content">
                <h3>Edit Profile Name</h3>
                <input type="text" id="newNameInput" class="form-control" value="${playerName}" maxlength="20">
                <div class="modal-buttons">
                    <button class="btn btn-secondary" onclick="document.getElementById('editNameModal').style.display='none'">Cancel</button>
                    <button class="btn btn-primary" onclick="updateProfileName()">Save</button>
                </div>
            </div>
        </div>
    `;

    
    window.updateProfileName = () => {
        const newName = document.getElementById('newNameInput').value.trim();
        if (newName) {
            localStorage.setItem('playerName', newName);
            window.location.reload();
        }
    };

    const modal = container.querySelector('#editNameModal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    window.addEventListener('scoresUpdated', () => {
        const app = document.querySelector('#app');
        if (window.location.hash === '#/profile') {
            app.innerHTML = '';
            app.appendChild(ProfilePage());
        }
    });

    return container;
} 