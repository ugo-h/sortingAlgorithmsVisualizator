export function promisifyWithDelay(func, delay) {
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(func);
        }, delay);
    });
}