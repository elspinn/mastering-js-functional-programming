import {describe, mock, test} from "node:test";
import assert from 'node:assert';
import {debounce, throttle} from "../../src/chapter_06/throttling_debouncing";
import {withDelayedPromise} from "../../src/chapter_06/decorators";

describe('throttle and debounce', () => {
    test('debounce', async (t) => {
        const mockFn = mock.fn();

        await t.test('will only execute a given function once, if called twice within the a given time limit', () => {
            const limit = 1000;
            const debounceMockFn = debounce(mockFn, limit);

            debounceMockFn();
            debounceMockFn();
            debounceMockFn();

            setTimeout(() => {
                assert.equal(mockFn.mock.callCount(), 1);
            }, limit)
        })

        await t.test('will repeat a function call after a given time', async () => {
            mockFn.mock.resetCalls();
            const limit = 100;

            const debouncedMockFn = debounce(mockFn);
            const delayedMock = withDelayedPromise(debouncedMockFn, 1000);

            debouncedMockFn();
            await delayedMock();

            assert.equal(mockFn.mock.callCount(), 2);
        });
    })

    test('throttle', async (t) => {
        const mockFn = mock.fn();

        await t.test('will call a given function once and not after',  () => {
            const throttledMockFn = throttle(mockFn, 2000);

            throttledMockFn();
            throttledMockFn();
            throttledMockFn();

            assert.equal(mockFn.mock.callCount(), 1)
        })

        await t.test('will call a given function again after a given time', async () => {
            mockFn.mock.resetCalls();

            const throttledMockFn = throttle(mockFn, 100);
            const delayed = withDelayedPromise(throttledMockFn, 1000);

            throttledMockFn();
            await delayed();

            assert.equal(mockFn.mock.callCount(), 2)
        })
    })
})