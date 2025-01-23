import { HomePage } from './pages/home.js';
import { QuizPage } from './pages/quiz.js';
import { LeaderboardPage } from './pages/leaderboard.js';
import { ProfilePage } from './pages/profile.js';

export function router() {
    const app = document.querySelector('#app');
    const hash = window.location.hash || '#/';

    app.innerHTML = '';

    if (hash === '#/') {
        app.appendChild(HomePage());
    } else if (hash.startsWith('#/quiz')) {
        const params = hash.includes('?') ? hash.slice(hash.indexOf('?')) : '';
        QuizPage(params).then(component => app.appendChild(component));
    } else if (hash === '#/leaderboard') {
        app.appendChild(LeaderboardPage());
    } else if (hash === '#/profile') {
        app.appendChild(ProfilePage());
    }
}