import assert from 'node:assert/strict';
import { test, mock } from 'node:test';
import { fileWriter } from './fileWriter.mjs';
import { logger } from './logger.mjs';

test("info is written in log file", () => {
    mock.method(fileWriter, "appendTo", () => { });

    logger.info("ceci est une info");

    assert.equal(fileWriter.appendTo.mock.calls.length, 1);

    const [fileName, message] = fileWriter.appendTo.mock.calls[0].arguments
    assert.equal(fileName, "log.txt");
    assert.equal(message, `${new Date().toISOString()} : ceci est une info\n`);
});