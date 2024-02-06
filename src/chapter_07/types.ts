//Utility type for partializing two array types
export type Partialize<P extends any[], A extends any[]> = 0 extends P['length']
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

//Utility type for matching types of two arrays
export type TypeMatch<P extends any[], A extends any[]> = 0 extends A['length']
  ? boolean
  : 0 extends P['length']
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

export type Partial<P extends any[], R> = <A extends any[]>(
  ...args: A
) => TypeMatch<P, A> extends never
  ? never
  : P extends any[]
    ? 0 extends Partialize<P, A>['length']
      ? (...args: [...P]) => R
      : Partial<Partialize<P, A>, R>
    : never;

//Utility difference type between two arrays or types
export type Difference<P extends any[], A extends any[]> = [P, A] extends [
  [any, ...infer PT],
  [any, ...infer PA],
]
  ? Difference<PT, PA>
  : P;

type d1 = Difference<[string, boolean], [string]>;
const d1: d1 = [true];
type d2 = Difference<[number, string], [number]>;
const d2: d2 = ['string'];
// type d3 = Difference<boolean, boolean>;
// const d3: d3 = true;

export type PartialCurry<P extends any[], R> = <A extends any[]>(
  ...args: A
) => TypeMatch<P, A> extends never
  ? never
  : P extends any[]
    ? A['length'] extends P['length']
      ? R
      : PartialCurry<Difference<P, A>, R>
    : never;
