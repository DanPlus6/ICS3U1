'use strict';

/**
 * Never do that again.
 * @param {number} duration duration of the flashing in milliseconds
 * @param {number} hz frequency of the flashes in hertz
 * @returns 
 */
export function Epilepsy(duration = 2000, hz = 15) {
    if (active) return;
    
    active = true;
    const overlay = document.createElement("epilepsy-overlay");
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

    // Reset after epilepsy effect completes
    setTimeout(() => {
        clearInterval(flash);
        overlay.remove();
        active = false;
    }, duration);
}
