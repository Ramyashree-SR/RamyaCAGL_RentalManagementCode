const nameRegex = /^[A-Za-z]+$/;
const mobileRegex = /^(\+|\d)[0-9]{9}$/; //([0-9]{11}$)|(^[7-9][0-9]{9}$) Moblie Number which starts from 7/8/9 (Indian Mobile No.) & 11 digit Landline number
const numbersRegex = /^(\+|\d)[0-9]$/;
const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+(\.\w{2,3})$/;
const notAllowSpecialChar = /[^a-zA-Z0-9]/;
const nameWithSpaces = /^[a-zA-Z ]*$/;
const nameWithSpacesAndNumbers = /^[a-zA-Z0-9 ]*$/;
const panCardRegex = /^[A-Z]{3}[G|A|F|C|T|H|P]{1}[A-Z]{1}\d{4}[A-Z]{1}$/;
const gstRegex = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
const pincodeRegex = /^\d{3}\s?\d{3}$/;
const numbersWithSpecialChatracters = /^-?\d+\.\d+$/;
const numbersWithSpecialChatractersAndSeparated = /^-?\d+\.\d+,\s*-?\d+\.\d+$/;
const numberNameWithSpecialCharacters = /^[a-zA-Z0-9 !@#$%^&*()-_+=#]*$/;

export {
  nameRegex,
  mobileRegex,
  emailRegex,
  notAllowSpecialChar,
  nameWithSpaces,
  nameWithSpacesAndNumbers,
  panCardRegex,
  gstRegex,
  numbersRegex,
  pincodeRegex,
  numbersWithSpecialChatracters,
  numbersWithSpecialChatractersAndSeparated,
  numberNameWithSpecialCharacters,
};
