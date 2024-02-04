import {describe, test} from 'node:test';
import assert from 'node:assert';
import {nonsense, add3} from '../testing_functions';
import {partial} from '../../src/chapter_07/partial_application';

describe('partial', () => {
  test('a partial application of a target function returns the same value when called with the remainder arguments, as the original function', () => {
    const partialAdd3 = partial(add3);
    const f1 = partialAdd3(1, 2, undefined);
    assert.equal(f1(3), add3(1, 2, 3));
  });
});
