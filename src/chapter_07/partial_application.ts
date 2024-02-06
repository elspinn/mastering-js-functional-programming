import {Partial} from '../../test/chapter_07/types.ts';

function partial<P extends any[], R>(fn: (...args: P) => R): Partial<P, R>;

function partial(fn: (...args: any[]) => any) {
  const partialApplication =
    (...argsPartial: any[]) =>
    (...argsRemainder: any[]) => {
      for (let i = 0; i < argsPartial.length && argsRemainder.length; i++) {
        if (argsPartial[i] === undefined) {
          argsPartial[i] = argsRemainder.shift();
        }
      }

      const allParams = [...argsPartial, ...argsRemainder];

      return allParams.includes(undefined) || allParams.length < fn.length
        ? partialApplication(...allParams)
        : fn(...allParams);
    };

  return partialApplication();
}

export {partial};
