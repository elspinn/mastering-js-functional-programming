import {PartialCurry} from './types';

function partialCurry<P extends any[], R>(fn: (...args: P) => R): PartialCurry<P, R>;
function partialCurry(fn: (...args: any[]) => any) {
  return fn.length === 0 ? fn() : (...args: any[]) => partialCurry(fn.bind(null, ...args));
}

export {partialCurry};
