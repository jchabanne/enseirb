function getEvenNumbers(numbers) {
  return numbers.filter(isEvenNumber);
}

function isEvenNumber(number) {
  return number % 2 === 0;
}
