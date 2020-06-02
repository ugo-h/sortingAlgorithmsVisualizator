export function promisifyIteratorWithDelay(func, delay, iterator=true) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(iterator) {
                resolve(func.next());
            } else {
                resolve(func());
            }
        }, delay);
    });
}