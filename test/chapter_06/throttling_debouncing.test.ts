import {describe, mock, test} from "node:test";
import assert from 'node:assert';
import {throttle, debounce} from "../../src/chapter_06/throttling_debouncing";

describe('throttle and debounce', () => {
    test('debounce', async (t) => {
        const mockFn = mock.fn();

        await t.test('will only execute a given function once, if called twice within the a given time limit', () => {
            const limit = 100;
            const debounceMockFn = debounce(mockFn, 100);

            debounceMockFn();
            debounceMockFn();

            assert.equal(mockFn.mock.callCount(), 2);
        })
    })
})