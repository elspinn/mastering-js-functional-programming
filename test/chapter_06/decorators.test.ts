import {describe, test, mock, afterEach} from "node:test";
import assert from 'node:assert';
import {withPerformance} from "../../src/chapter_06/decorators";

describe('withPerformance', () => {
        const mockFunction = mock.fn();
        const mockLogger = mock.fn();
        const mockTimer = mock.fn(() => 100);
        const mockWithPerformance = withPerformance(mockFunction, mockLogger, mockTimer);

    test('calls a wrapped function', () => {
        mockWithPerformance();
        assert.equal(mockFunction.mock.callCount(), 1)
    })

    test('calls a given timer function', () => {
        mockTimer.mock.resetCalls();
        mockWithPerformance();
        assert.equal(mockTimer.mock.callCount(), 2)
    })

    test('calls a given logger function', () => {
        mockLogger.mock.resetCalls();
        mockWithPerformance();
        assert.equal(mockLogger.mock.callCount(), 1)
    })
})