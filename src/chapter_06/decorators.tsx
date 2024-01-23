import {fibonacci} from "./fibonacci.tsx";


const fibonacciWithLogger = withLogger(fibonacci);
new Array(5).fill(0).forEach((_, i) => fibonacciWithLogger(i))

//A decorator function that adds logging statements before and after a given function is called
function withLogger<T extends (...args: any[]) => any>(fn: T) {
    return function(...args: Parameters<T>): ReturnType<T>{
        console.log(`Entering function ${fn.name}`)
        const returnValue = fn(...args);
        console.log(`Exiting function ${fn.name}`)
        return returnValue;
    }
}