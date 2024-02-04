//Type utility for type match
type TypeMatch<P extends any[], A extends any[]> = 0 extends P['length']
  ? boolean
  : 0 extends A['length']
    ? boolean
    : [P, A] extends [[infer PH, ...infer PT], [infer AH, ...infer AT]]
      ? AH extends undefined
        ? TypeMatch<PT, AT>
        : PH extends AH
          ? TypeMatch<PT, AT>
          : never
      : never;

type t1 = TypeMatch<[number, string], [number, string]>;
const ls1: t1 = true;

type t2 = TypeMatch<[number, string], [number, number]>;
// const ls2: t2 = never;

//Type for partial application
type Partialize<P extends any[], A extends any[]> = 0 extends P['length']
  ? []
  : 0 extends A['length']
    ? P
    : [P, A] extends [[infer PH, ...infer PT], [infer AH, ...infer AT]]
      ? AH extends undefined
        ? [PH, ...Partialize<PT, AT>]
        : [...Partialize<PT, AT>]
      : never;

type p0 = Partialize<[boolean, number, string], [undefined, undefined, string]>; // type [boolean, number]
const list0: p0 = [true, 1];

type p1 = Partialize<[boolean, number, string], []>; // type [boolean, number, string]
const list1: p1 = [true, 1, 'hello'];

type p2 = Partialize<[], [boolean, number, string]>; // type []
const list2: p2 = [];

type Partial<P extends any[], R> = <A extends any[]>(
  ...x: A
) => TypeMatch<P, A> extends never
  ? never
  : P extends any[]
    ? 0 extends Partialize<P, A>['length']
      ? (...x: [...P]) => R
      : Partial<Partialize<P, A>, R>
    : never;

function partial<P extends any[], R>(fn: (...args: P) => R): Partial<P, R>;
function partial(fn: (...args: any[]) => any) {
  const partialApplication =
    (...args1: any[]) =>
    (...args2: any[]) => {
      for (let i = 0; i < args1.length && args2.length; i++) {
        if (args1[i] === undefined) {
          args1[i] = args2.shift();
        }
      }
      const allParams = [...args1, ...args2];

      return allParams.includes(undefined) || allParams.length === fn.length
        ? partialApplication(...allParams)
        : fn(...allParams);
    };

  return partialApplication();
}

export {partial};
