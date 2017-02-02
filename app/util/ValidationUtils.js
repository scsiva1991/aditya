export function isEmpty(value) {
  return (value === undefined || value === null || value.trim() === '');
}

export function isEmptyObject(value) {
  return (value === undefined || value === null);
}

export function isValidEmail(emailStr) {
  const emailPattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  let isValid = false;
  if (!isEmpty(emailStr) && emailPattern.test(emailStr)) {
    isValid = true;
  }
  return isValid;
}
