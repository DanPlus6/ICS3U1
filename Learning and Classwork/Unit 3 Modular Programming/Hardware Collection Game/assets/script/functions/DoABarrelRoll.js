'use strict';

/** Performs a barrel roll animation on the document body */
export function DoABarrelRoll() {
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes roll {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
        }
        .barrel-roll {
        animation: roll 2s linear;
        }
    `;
    document.head.appendChild(style);
    document.body.classList.add('barrel-roll');

    setTimeout(() => {
        document.body.classList.remove('barrel-roll');
    }, 2);
}
