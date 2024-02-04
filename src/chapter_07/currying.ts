import {nonsense} from './testing_functions.ts';

//Currying is a technique that enables you to only work with single-variable functions,
//even if you need a multi-variable one.

//Types for currying
type Curry<P, R> = P extends [infer H]
  ? (arg: H) => R
  : P extends [infer H, ...infer T]
    ? (arg: H) => Curry<[...T], R>
    : never;

function curry<P extends any[], R>(fn: (...args: P) => R): Curry<P, R>;

//Currying with bind()
function curry(fn: (...args: any[]) => any) {
  return fn.length === 0 ? fn() : (x: any) => curry(fn.bind(null, x));
}

export {curry};
