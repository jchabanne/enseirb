const COMMAND = {
  "0X123": "moveForward",
  "0X789": "moveBackward",
  "0XABC": "stop",
};

export function parseRobotCommand(commandFlow) {
  return commandFlow.split(",").flatMap((instruction) => {
    const [code, occurrence] = instruction.split(":");
    const command = { name: COMMAND[code] };
    return occurrence ? new Array(Number(occurrence)).fill(command) : command;
  });
}
