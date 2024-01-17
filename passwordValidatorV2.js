const DEFAULT = {
    minimalLength: 8,
    minimalNumberOfLowerCase: 1,
    minimalNumberOfUpperCase: 1,
    minimalNumberOfDigit: 1,
    specialCharacterRegex: /[^a-zA-Z0-9]/
};

const hasMinimalLength = (password, length = DEFAULT.minimalLength) => password.length >= length;

const containsLowerCase = (password, minimalNumber = DEFAULT.minimalNumberOfLowerCase) =>
    checkRegexMatchesNumber(password, /[a-z]/g, minimalNumber);


const containsAnUpperCase = (password, minimalNumber = DEFAULT.minimalNumberOfUpperCase) =>
    checkRegexMatchesNumber(password, /[A-Z]/g, minimalNumber);

const containsANumber = (password, minimalNumber = DEFAULT.minimalNumberOfDigit) =>
    checkRegexMatchesNumber(password, /[0-9]/g, minimalNumber);

const containsASpecialCharacter = (password, regex = DEFAULT.specialCharacterRegex) => password.match(regex) !== null;

function checkRegexMatchesNumber(password, regex, minimalMatchesNumber) {
    const matches = password.match(regex);
    return matches !== null && matches.length >= minimalMatchesNumber;
}

function validatePassword(password, option) {
    return hasMinimalLength(password, option.minimalLength)
           && containsLowerCase(password, option.minimalNumberOfLowerCase)
           && containsAnUpperCase(password, option.minimalNumberOfUpperCase)
           && containsANumber(password, option.minimalNumberOfDigit)
           && containsASpecialCharacter(password, option.specialCharacterRegex);
}

console.log("LENGTH");
console.log(validatePassword("aZ1*bcdefg", {minimalLength: 10}));
console.log(validatePassword("aZ1*bcdef", {minimalLength: 10}));

console.log("Number of lower case");
console.log(validatePassword("aZ1*BCDe", {minimalNumberOfLowerCase: 2}));
console.log(validatePassword("aZ1*BCDE", {minimalNumberOfLowerCase: 2}));

console.log("Number of upper case");
console.log(validatePassword("Az1*bcdE", {minimalNumberOfUpperCase: 2}));
console.log(validatePassword("Az1*bcde", {minimalNumberOfUpperCase: 2}));

console.log("Number of digit");
console.log(validatePassword("aZ12*bcd", {minimalNumberOfDigit: 2}));
console.log(validatePassword("aZ1*bcde", {minimalNumberOfDigit: 2}));

console.log("Special character regex");
console.log(validatePassword("aZ1*bcde", {specialCharacterRegex: /[*,-]/}));
console.log(validatePassword("aZ1*bcde", {specialCharacterRegex: /[-,']/}));
