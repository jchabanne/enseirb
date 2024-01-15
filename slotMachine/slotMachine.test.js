import { test } from "node:test";
import assert from "node:assert";
import { slotMachine } from "./slotMachine.js";

test("gain is bet x2 if the two first symbols are the same", function () {
  const result = ["+", "+", "1"];

  const gain = slotMachine(5, result);

  assert.equal(gain, 10);
});

test("gain is bet x2 if the two last symbols are the same", function () {
  const result = [".", "+", "+"];

  const gain = slotMachine(10, result);

  assert.equal(gain, 20);
});

test("gain is bet x5 if all the symbols are the same", function () {
  const result = ["?", "?", "?"];

  const gain = slotMachine(20, result);

  assert.equal(gain, 100);
});

test("gain is bet x20 if all symbols are jackpot", function () {
  const result = ["$", "$", "$"];

  const gain = slotMachine(10, result);

  assert.equal(gain, 200);
});

test("gain is 0 if no symbol pattern", function () {
  const result = ["+", ".", "+"];

  const gain = slotMachine(5, result);

  assert.equal(gain, 0);
});
