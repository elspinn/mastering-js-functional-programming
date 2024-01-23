import {fibonacci} from "./fibonacci.tsx";


const fibonacciWithLogger = withLogger(fibonacci);
new Array(5).fill(0).forEach((_, i) => fibonacciWithLogger(i))

const fibonacciWithPerformance = withPerformance(fibonacci);
new Array(50).fill(0).forEach((_, i) => fibonacciWithPerformance(i))

//A decorator function that adds logging statements before and after a given function is called
function withLogger<T extends (...args: any[]) => any>(fn: T) {
    return function(...args: Parameters<T>): ReturnType<T>{
        console.log(`Entering function ${fn.name}`)
        const returnValue = fn(...args);
        console.log(`Exiting function ${fn.name}`)
        return returnValue;
    }
}

//A decorator function that adds performance measurements to a function;
function withPerformance<T extends (...args: any[]) => any>(
    fn: T,
    output: (...results: string[]) => void = console.log.bind(console),
    timer: () => number = performance.now.bind(performance)
){
    return (...args: Parameters<T>): ReturnType<T> => {
        const startTime = timer();
        const returnValue = fn(...args);
        output(`${fn.name} execution time: ${timer() - startTime}`, `Function arguments: ${args}`)
        return returnValue;
    }
}