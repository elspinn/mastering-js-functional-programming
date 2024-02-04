import {describe, test} from 'node:test';
import assert from 'node:assert';
import {curry} from '../../src/chapter_07/currying';
import {nonsense, add3} from '../testing_functions';

describe('curry', () => {
  test('works as intended', () => {
    const curriedNonsense = curry(nonsense);
    assert.equal(curriedNonsense('1')('2')('3')('4'), `1:2:3:4`);
  });
  test('curries a target function that returns the same value as the un-curried original', () => {
    const curriedAdd3 = curry(add3);
    assert.equal(curriedAdd3(1)(2)(3), add3(1, 2, 3));
  });
});
