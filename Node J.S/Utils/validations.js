// validation
export function validateEmail(email) {
    return /^[A-Za-z0-9]{2,}@(gmail|012).com$/.test(email);
}
export function validatePassword(password) {
    return /[A-Z]{1,}/.test(password) && /[a-z]{1,}/.test(password) && /[0-9]{1,}/.test(password) && /[!*@$&]{1,}/.test(password);
}