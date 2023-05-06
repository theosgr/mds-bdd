import moment from "moment"

function validatePhoneFormat (phone) {
  const phoneNumberRegex = /^(0|\+33|0033)\d{9}$/
  return phoneNumberRegex.test(phone);
  }
  
function validateDateFormat (date) {
  const dateFormat = "YYYY-MM-DD"
  return moment(date, dateFormat, true).isValid();
}

function validateEmailFormat (email) {
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return regexEmail.test(email);
}

export default { validatePhoneFormat, validateDateFormat, validateEmailFormat }