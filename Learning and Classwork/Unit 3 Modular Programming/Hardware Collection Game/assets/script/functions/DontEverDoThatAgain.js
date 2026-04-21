'use strict';

/**
 * Don't ever do that again.
 * @param {string} audioSrc path to epilepsy warning audio file
 * @param {string} imgSrc path to epilepsy warning image file
 */
export function DontEverDoThatAgain(audioSrc = "assets/audio/dont-ever-do-that-again.mp3", imgSrc = "assets/img/dont-ever-do-that-again.png") {
    if (globalThis.epilepsyWarning) return;
    globalThis.epilepsyWarning = true;

    const audio = new Audio(audioSrc);
    audio.play();

    const overlay = document.createElement("div");
    Object.assign(overlay.style, {
        position: "fixed", inset: "0", zIndex: "999998",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0, 0, 0, 0.85)", pointerEvents: "none"
    });

    const img = document.createElement("img");
    img.src = imgSrc;
    Object.assign(img.style, {
        maxWidth: "80%", maxHeight: "80%", objectFit: "contain"
    });

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.remove();
        audio.pause();
        audio.currentTime = 0;
        globalThis.epilepsyWarning = false;
    }, duration);
}
