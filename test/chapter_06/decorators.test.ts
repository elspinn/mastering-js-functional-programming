import {describe, test, mock, afterEach, it} from "node:test";
import assert from 'node:assert';
import {withPerformance, once, onceAndAfter} from "../../src/chapter_06/decorators";

describe('decorators', () => {

    test('withPerformance', async (t) => {
        const mockFunction = mock.fn();
        const mockLogger = mock.fn();
        const mockTimer = mock.fn(() => 100);
        const mockWithPerformance = withPerformance(mockFunction, mockLogger, mockTimer);

        await t.test('calls a wrapped function', () => {
            mockWithPerformance();
            assert.equal(mockFunction.mock.callCount(), 1)
        })

        await t.test('calls a given timer function', () => {
            mockTimer.mock.resetCalls();
            mockWithPerformance();
            assert.equal(mockTimer.mock.callCount(), 2)
        })

        await t.test('calls a given logger function', () => {
            mockLogger.mock.resetCalls();
            mockWithPerformance();
            assert.equal(mockLogger.mock.callCount(), 1)
        })
    })

    test('once', async (t) => {
        const mockFunction = mock.fn();
        const mockOnce = once(mockFunction);

        await t.test('calls a given function only once', () => {
            mockOnce();
            mockOnce();

            assert.equal(mockFunction.mock.callCount(), 1);
        })
    })

    test('onceAndAfter', async (t) => {
        const mockFirst = mock.fn();
        const mockSecond = mock.fn();
        const onceFirstAndAfterSecond = onceAndAfter(mockFirst, mockSecond);

        await t.test('for the first call only the first given function is called', () => {
            onceFirstAndAfterSecond();
            assert.equal(mockFirst.mock.callCount(), 1);
            assert.equal(mockSecond.mock.callCount(), 0);
        })

        await t.test('for the second call only the second given function is called', () => {
            mockFirst.mock.resetCalls();
            mockSecond.mock.resetCalls();

            onceFirstAndAfterSecond();
            assert.equal(mockFirst.mock.callCount(), 0);
            assert.equal(mockSecond.mock.callCount(), 1);
        })
    })

})
