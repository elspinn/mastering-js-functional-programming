import {describe, test} from 'node:test';
import assert from 'node:assert';
import {nonsense} from '../testing_functions';
import {partialCurry} from '../../src/chapter_07/partialCurry';

describe('partialCurry', () => {
  test('can fix arguments in several steps', () => {
    const pcNonsense = partialCurry(nonsense);
    const f1 = pcNonsense('a');
    const f2 = f1('b');
    const f3 = f2('c');
    const f4 = f3('d');

    assert.equal(f4, nonsense('a', 'b', 'c', 'd'));
  });

  test('can fix arguments in single step', () => {
    const pcNonsense = partialCurry(nonsense);
    const f1 = pcNonsense('a', 'b', 'c', 'd');
    assert.equal(f1, nonsense('a', 'b', 'c', 'd'));
  });
});
