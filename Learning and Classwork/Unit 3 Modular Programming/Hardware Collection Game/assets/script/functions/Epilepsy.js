'use strict';

/**
 * Never do that again.
 * @param {number} duration duration of the flashing in milliseconds
 * @param {number} hz frequency of the flashes in hertz
 */
export function Epilepsy(duration = 2000, hz = 20) {
    if (globalThis.givingEpilepsy) return;
    globalThis.givingEpilepsy = true;

    const overlay = document.createElement("div");
    Object.assign(overlay.style, {
        position: "fixed", inset: "0", zIndex: "999999", pointerEvents: "none"
    });
    document.body.appendChild(overlay);

    const rand = (a, b) => Math.random() * (b - a) + a;
    const randInt = (a, b) => Math.floor(rand(a, b));
    const randColor = () => `hsl(${randInt(0,360)},${randInt(60,100)}%,${randInt(30,80)}%)`;

    const interval = 1000 / hz;
    let last = 0;
    let raf;

    const tick = (ts) => {
        if (ts - last >= interval) {
        last = ts;
        const layers = randInt(2, 5);
        overlay.style.background = [...Array(layers)].map(() =>
            `radial-gradient(ellipse at ${randInt(0,100)}% ${randInt(0,100)}%, ${randColor()} 0%, transparent 60%)`
        ).join(", ");
        overlay.style.opacity = rand(0.6, 1);
        document.body.style.transform = `translate(${rand(-8,8)}px, ${rand(-8,8)}px) rotate(${rand(-2,2)}deg)`;
        }
        raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    // Stop after the specified duration
    setTimeout(() => {
        cancelAnimationFrame(raf);
        overlay.remove();
        document.body.style.transform = "";
        globalThis.givingEpilepsy = false;
    }, duration);
}
