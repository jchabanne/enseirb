const jackpotSymbol = "$";

export function slotMachine(bet, result) {
  const factor = getPatternFactor(result);
  return bet * factor;
}

function getPatternFactor([a, b, c]) {
  if (a === b && a === c) {
    return a === jackpotSymbol ? 20 : 5;
  }
  if (a === b || b === c) {
    return 2;
  }
  return 0;
}
