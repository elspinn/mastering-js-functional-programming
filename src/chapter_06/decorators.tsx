import {fibonacci} from "./fibonacci.tsx";


const fibonacciWithLogger = withLogger(fibonacci);
// new Array(5).fill(0).forEach((_, i) => fibonacciWithLogger(i))

const fibonacciWithPerformance = withPerformance(fibonacci);
// new Array(10).fill(0).forEach((_, i) => fibonacciWithPerformance(i))
// fibonacciWithPerformance(10)
fibonacciWithPerformance(100)
fibonacciWithPerformance(100)
fibonacciWithPerformance(101)

const fibonacciWithMemoAndPerf = withPerformance(memoize(fibonacci));
// fibonacciWithMemoAndPerf(40)
// fibonacciWithMemoAndPerf(40)

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
//Purer function with optional output and timer function parameters
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

//A memoizing function that caches function results;
function memoize<T extends (n: number) => any>(fn: T) {
    const cache: Record<number, ReturnType<T>> = {};
    return (n: number): ReturnType<T> => {
        return n in cache ? cache[n] : (cache[n] = fn(n))
    }
}