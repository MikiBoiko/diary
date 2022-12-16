import axios from "axios";
import { fetchToken, updateToken } from "./storage";

class FailedTokenError extends Error {
    constructor(...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, FailedTokenError);
        }

        this.name = "FailedTokenError";
        this.date = new Date();
    }
}

class FailedLoginError extends Error {
    constructor(...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, FailedLoginError);
        }

        this.name = "FailedLoginError";
        this.date = new Date();
    }
}

async function getConnection() {
    const token = fetchToken();

    const response = await axios({
        method: 'GET',
        url: 'http://localhost:3334/',
        headers: {
            "authorization": `bearer ${token}`
        }
    });

    if (response.status === 401)
        throw new FailedTokenError();

    return response.data;
}

async function postLogin(reason, password) {
    const form = new URLSearchParams();
    form.append("reason", reason);
    form.append("password", password);

    const response = await axios({
        method: 'POST',
        url: 'http://localhost:3334/access',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: form,
    });

    if (response.status === 401)
        throw new FailedLoginError();

    const { message, token } = response.data;

    updateToken(token);

    return { message: message };
}

async function getDate(date) {
    const token = fetchToken();

    const response = await axios({
        method: 'GET',
        url: `http://localhost:3334/date/`,
        headers: {
            "authorization": `bearer ${token}`
        },
        params: {
            date: date
        }
    });

    if (response.status === 401)
        throw new FailedTokenError();

    return response.data;
};

async function postEntry(date, message) {
    const token = fetchToken();

    const form = new URLSearchParams();
    form.append("date", date);
    form.append("message", message);

    const response = await axios({
        method: 'POST',
        url: 'http://localhost:3334/entry',
        headers: { 
            'content-type': 'application/x-www-form-urlencoded',
            "authorization": `bearer ${token}` 
        },
        data: form,
    });

    if (response.status === 401)
        throw new FailedLoginError();

        return response.data;
}

async function deleteEntry(id) {
    const token = fetchToken();

    const response = await axios({
        method: 'DELETE',
        url: 'http://localhost:3334/entry',
        headers: {
            "authorization": `bearer ${token}`
        },
        params: {
            id: id
        }
    });

    if (response.status === 401)
        throw new FailedTokenError();

    return response.data;
}
/*
async function updateEntry(id) {
    const token = fetchToken();

    const response = await axios({
        method: 'UPDATE',
        url: 'http://localhost:3334/entry',
        headers: {
            "authorization": `bearer ${token}`
        },
        params: {
            id: id
        }
    });

    if (response.status === 401)
        throw new FailedTokenError();

    return response.data;
}
*/
export { getConnection, postLogin, getDate, postEntry, deleteEntry };