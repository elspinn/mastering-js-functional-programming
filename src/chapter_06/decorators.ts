import {fibonacci, memoizedFibonacci} from "./fibonacci.ts";


const fibonacciWithLogger = withLogger(fibonacci);
// new Array(5).fill(0).forEach((_, i) => fibonacciWithLogger(i))

const fibonacciWithPerformance = withPerformance(fibonacci);
const fibonacciWithMemoAndPerf = withPerformance(memoize(fibonacci));

fibonacciWithPerformance(20);
[1, 2].forEach(() => fibonacciWithMemoAndPerf(20));

const fibonacciWithLoggerOnce = withLogger(once(fibonacci));
fibonacciWithLoggerOnce(5);
fibonacciWithLoggerOnce(5);

//A decorator function that adds logging statements before and after a given function is called
function withLogger<T extends (...args: any[]) => any>(fn: T) {
    return function(...args: Parameters<T>): ReturnType<T>{
        console.log(`Entering function ${fn.name}`)
        const returnValue = fn(...args);
        console.log(`Function ${fn.name} returning ${returnValue}`)
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
function memoize<T extends (...args: any[]) => any>(fn: T){
    const PRIMITIVES = ['string', 'number'];
    const cache: Record<string | number, ReturnType<T>> = {}

    return (...args: Parameters<T>): ReturnType<T> => {
        if(args.length === 1 && typeof args in PRIMITIVES){
            return args[0] in cache ? cache[args[0]] : cache[args[0]] = fn(...args)
        } else {
            return JSON.stringify(args) in cache ? cache[JSON.stringify(args)] : (cache[JSON.stringify(args)] = fn(...args))
        }
    }
}

//Wrapper function that limits a given function to be called once
function once<T extends (...args: any[]) => any>(fn: T){
    let done = false;

    return ((...args: Parameters<T>) => {
        if(!done){
            const returnValue = fn(...args);
            done = true;
            return returnValue;
        }
    }) as T;
}

function onceAndAfter<T extends (...args: any[]) => any>(
    once: T,
    after: T
){
    let done = false;

    return ((...args: Parameters<T>): ReturnType<T> => {
        const toCall = !done ? once : after;
        const returnValue = toCall(...args);
        done = true;

        return returnValue;
    }) as T
}

export {withLogger, withPerformance, memoize, once, onceAndAfter}