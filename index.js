import { router } from './router.js';
import { getCoins } from './utils.js';


window.addEventListener('hashchange', router);
window.addEventListener('load', router);


function updateCoinDisplay() {
    const coinDisplay = document.getElementById('coinDisplay');
    if (coinDisplay) {
        coinDisplay.textContent = `🪙 ${getCoins()}`;
    }
}


document.addEventListener('DOMContentLoaded', updateCoinDisplay);


window.addEventListener('coinsUpdated', updateCoinDisplay);