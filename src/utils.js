export const generatePassword = (length) => {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.authToken) {
        return { 'auth-token': user.authToken };
    } else {
        return {};
    }
};