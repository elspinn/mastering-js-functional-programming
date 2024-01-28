import test, {describe} from 'node:test';
import assert from "node:assert";
import {fibonacci, memoizedFibonacci} from "../../src/chapter_06/fibonacci";

describe('fibonacci', () => {
    test('should return 0 for argument of 0', () => {
        assert.equal(fibonacci(0), 0)
    });

    test('should return 1 for argument of 1', () => {
        assert.equal(fibonacci(1), 1)
    })

    test('should return 0 for argument less than 0', () => {
        assert.equal(fibonacci(-1), 0)
    })

    test('should return 1 for argument of 2', () => {
        assert.equal(fibonacci(2), 1)
    })
})

