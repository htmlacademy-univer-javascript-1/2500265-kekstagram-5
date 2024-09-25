
const checkStringLength = (currentString, limitLength) => (limitLength >= currentString.length);

checkStringLength('check', 6); //true
checkStringLength('check', 5); //true
checkStringLength('check', 4); //false

function checkForPalindrome (currentString) {
  const changedString = currentString.replaceAll(' ', '').toLowerCase();
  let workingString = '';
  for (let i = changedString.length - 1; i >= 0; i--) {
    workingString += changedString[i];
  }

  return changedString === workingString;
}

checkForPalindrome('топот'); //true
checkForPalindrome('Лёша на полке клопа нашёл'); //true
checkForPalindrome('Кекс'); //false
