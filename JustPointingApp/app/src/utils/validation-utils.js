export const validateEmail = (email) => {
    var regex = new RegExp("^[a-zA-Z0-9]+.*@[a-zA-Z0-9]+[.][a-zA-Z]+");
    if (email) {
        return regex.test(email);
    }
    return false;
};
