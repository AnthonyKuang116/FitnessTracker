export function storeCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

export function getCurrentUser() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user;
}

export function clearCurrentUser() {
    localStorage.removeItem('currentUser');
}

export function storeCurrentToken(token) {
    localStorage.setItem('token', JSON.stringify(token));
}

export function getCurrentToken() {
    const token = JSON.parse(localStorage.getItem('token'));
    return token;
}

export function clearCurrentToken() {
    localStorage.removeItem('token');
}