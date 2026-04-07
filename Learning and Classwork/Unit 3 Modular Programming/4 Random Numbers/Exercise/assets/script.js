'use strict';

const COIN = document.getElementById('cheaters-coin');

const SLEEP = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let flipping = false;
async function flipCheatersCoin() {
    if (flipping) return;
    flipping = true;

    let res = Math.random();
    COIN.src = "assets/img/coin-flip.gif";
    
    await SLEEP(1100);

    if (res < 0.75) COIN.src = "assets/img/coin-heads.png";
    else COIN.src = "assets/img/coin-tails.png";

    await SLEEP(100);

    flipping = false;
}
