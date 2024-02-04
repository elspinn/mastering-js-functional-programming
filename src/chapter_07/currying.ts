import {nonsense} from './nonsense.ts';

//Currying is a technique that enables you to only work with single-variable functions,
//even if you need a multi-variable one.

//Currying with bind()
function curry(fn: (...args: any[]) => any) {
  return fn.length === 0 ? fn() : (x: any) => curry(fn.bind(null, x));
}
