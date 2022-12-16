import secureLocalStorage from "react-secure-storage";

class NoTokenError extends Error {
    constructor(...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NoTokenError);
        }

        this.name = "NoTokenError";
        this.date = new Date();
    }
}

function fetchToken() {
    const token = secureLocalStorage.getItem("token");

    if (token === null)
        throw new NoTokenError();

    return token;
};

function updateToken(token) {
    secureLocalStorage.setItem("token", token);
}

export { fetchToken, updateToken };