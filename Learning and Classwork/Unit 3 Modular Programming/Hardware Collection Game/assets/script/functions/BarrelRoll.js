'use strict';

/**
 * Performs a barrel roll animation on the document body
 * @param {number} duration The duration of the animation in milliseconds
 */
export function BarrelRoll(duration = 1250) {
    const elem = document.documentElement;
    elem.style.transition = `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    elem.style.transformOrigin = "center center";
    elem.style.transform = "rotate(360deg)";
    setTimeout(() => {
        elem.style.transition = "none";
        elem.style.transform = "rotate(0deg)";
    }, duration);
};
