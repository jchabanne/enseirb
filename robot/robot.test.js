import { test } from "node:test";
import assert from "node:assert";
import { parseRobotCommand } from "./robot.js";

test("0X123 code generates 'move forward' command", function () {
  const commands = parseRobotCommand("0X123");

  assert.equal(commands.length, 1);
  assert.equal(commands[0].name, "moveForward");
});

test("0X789 code generates 'move backward' command", function () {
  const commands = parseRobotCommand("0X789");

  assert.equal(commands.length, 1);
  assert.equal(commands[0].name, "moveBackward");
});

test("0XABC code generates 'stop' command", function () {
  const commands = parseRobotCommand("0XABC");

  assert.equal(commands.length, 1);
  assert.equal(commands[0].name, "stop");
});

test("multiple codes generate command list", function () {
  const commands = parseRobotCommand("0X123,0X123,0XABC");

  assert.equal(commands.length, 3);
  assert.equal(commands[0].name, "moveForward");
  assert.equal(commands[1].name, "moveForward");
  assert.equal(commands[2].name, "stop");
});

test("commands flow is compressed", function () {
  const commands = parseRobotCommand("0X123:3,0XABC");

  assert.equal(commands.length, 4);
  assert.equal(commands[0].name, "moveForward");
  assert.equal(commands[1].name, "moveForward");
  assert.equal(commands[2].name, "moveForward");
  assert.equal(commands[3].name, "stop");
});
