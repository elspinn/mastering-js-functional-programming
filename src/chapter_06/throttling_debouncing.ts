const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number = 1000) => {
    let timer: NodeJS.Timeout;

    return (...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay)
    }
}

const throttle = <T extends (...args: any[]) => any> (fn: T, delay: number = 100) => {
    let timer: NodeJS.Timeout | undefined;

    return (...args: Parameters<T>) => {
        if(!timer){
            timer = setTimeout(() => {
                timer = undefined
            }, delay)
            fn(...args)
        }
    }
}

export {debounce, throttle}