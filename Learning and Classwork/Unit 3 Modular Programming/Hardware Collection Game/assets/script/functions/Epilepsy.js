'use strict';

/**
 * Never do that again.
 * @param {string} audioSrc path to audio to play
 * @param {number} audioDelay ms of audio to play before visuals start
 * @param {number} duration duration of the flashing in milliseconds
 * @param {number} hz frequency of the flashes in hertz
 */
export function Epilepsy(audioSrc = "assets/audio/epilepsy.wav", audioDelay = 2000, duration = 2000, hz = 20) {
    if (globalThis.active) return;
    globalThis.active = true;

    const audio = new Audio(audioSrc);
    audio.play();

    setTimeout(() => {
        const overlay = document.createElement("div");
        Object.assign(overlay.style, {
            position: "fixed", inset: "0", zIndex: "999999",
            pointerEvents: "none", mixBlendMode: "difference"
        });
        document.body.appendChild(overlay);

        const interval = 1000 / hz;
        let tick = 0;
        const flash = setInterval(() => {
            overlay.style.background = tick++ % 2 === 0 ? "white" : "black";
        }, interval);

        setTimeout(() => {
            clearInterval(flash);
            overlay.remove();
            globalThis.active = false;
        }, duration);
    }, audioDelay);
}
