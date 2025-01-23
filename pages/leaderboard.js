import { getHighScores } from '../utils.js';

export function LeaderboardPage() {
    const container = document.createElement('div');
    container.className = 'form-home';

    const scores = getHighScores();
    
    container.innerHTML = `
        <div class="text-white">
            <h2 class="text-center mb-4">🏆 Leaderboard</h2>
            ${scores.length === 0 ? `
                <p class="text-center">No scores yet. Be the first to play!</p>
                <div class="text-center mt-4">
                    <button class="btn btn-primary" onclick="window.location.hash = '#/'">Play Now</button>
                </div>
            ` : `
                <div class="table-responsive">
                    <table class="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Score</th>
                                <th>Coins</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${scores.map((score, index) => `
                                <tr class="${index === 0 ? 'table-warning text-dark' : ''}">
                                    <td>${index + 1}</td>
                                    <td>${score.name}</td>
                                    <td>${score.score}</td>
                                    <td>🪙 ${score.coins}</td>
                                    <td>${new Date(score.date).toLocaleDateString()}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="text-center mt-4">
                    <button class="btn btn-primary" onclick="window.location.hash = '#/'">Play Again</button>
                </div>
            `}
        </div>
    `;

    return container;
} 