//Memoized fibonacci
const memoizedFibonacci = function() {
    const cache: Record<number, number> = {};

    return (n: number): number => {
        if(n in cache){
            console.log(`Cached result for ${n}`)
            return cache[n]
        } else if (n <= 0) {
            console.log(`New result for ${n}`)
            return 0
        } else if (n == 1){
            console.log(`New result for ${n}`)
            return 1
        }

        console.log(`New result for ${n}`)
        return cache[n] = fibonacci(n - 2) + fibonacci(n - 1)
    }
}();

//Recursive fibonacci function
function fibonacci(n: number): number {

    if (n <= 0) {
        return 0
    } else if (n == 1) {
        return 1
    }

    return fibonacci(n - 2) + fibonacci(n - 1)
}



export {fibonacci, memoizedFibonacci};