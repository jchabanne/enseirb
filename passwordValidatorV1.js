const hasAtLeast8Characters = password => password.length >= 8;

const containsALowerCase = password => password.match(/[a-z]/) !== null;

const containsAnUpperCase = password => password.match(/[A-Z]/) !== null;

const containsADigit = password => password.match(/[0-9]/) !== null;

const containsASpecialCharacter = password => password.match(/[^a-zA-Z0-9]/) !== null;

function validatePassword(password) {
    return hasAtLeast8Characters(password)
        && containsALowerCase(password)
        && containsAnUpperCase(password)
        && containsADigit(password)
        && containsASpecialCharacter(password)
}

console.log("Is valid : " + validatePassword("aZ1*bcde"));
console.log("Has at least 8 characters : " + validatePassword("aZ1*bcd"));
console.log("Has lower case : " + validatePassword("AZ1*BCDE"));
console.log("Has upper case : " + validatePassword("az1*bcde"));
console.log("Has digit : " + validatePassword("aZ*bcdef"));
console.log("Has a special character : " + validatePassword("aZ1bcdef"));
