interface AnimateProps {
    fromValue: number;
    toValue: number;
    onUpdate: any;
    onComplete: any;
    duration?: number;
}

const easing = {
    linear: (t: number) => t,
    easeInCubic: (t: number) => t * t * t,
    easeOutCubic: (t: number) => (--t) * t * t + 1,
    easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
}

const getValue = (fromValue: number, toValue: number, elapsed: number, duration: number) => {
    if (elapsed > duration) return toValue;
    return fromValue + (toValue - fromValue) * easing.easeInOutCubic(elapsed / duration);
}

export default function animate({
    fromValue,
    toValue,
    onUpdate,
    onComplete,
    duration = 600,
}: AnimateProps) {
    const startTime = performance.now();
    const tick = () => {
        const elapsed = performance.now() - startTime;
        window.requestAnimationFrame(() => {
            return onUpdate(
                getValue(fromValue, toValue, elapsed, duration),
                // Callback
                elapsed <= duration ? tick : onComplete
            )
        })
    }
    tick();
}