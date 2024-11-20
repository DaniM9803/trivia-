import { IndexPage } from './pages/index.js';
import { HomePage } from './pages/home.js';
import { QuizPage } from './pages/quiz.js';

const routes = {
    '/': IndexPage,
    '/home': HomePage,
    '/quiz': QuizPage
};

export function router() {
    const app = document.getElementById('app');
    let hash = window.location.hash.slice(1) || '/';
    const [path, params] = hash.split('?');
    
    const page = routes[path];
    if (page) {
        app.innerHTML = '';
        Promise.resolve(page(params)).then(component => {
            app.appendChild(component);
        });
    } else {
        window.location.hash = '#/';
    }
}