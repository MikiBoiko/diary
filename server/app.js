require('dotenv').config();

const auth = require('./auth')
const database = require('./database');

const express = require('express');
const cors = require('cors');
const app = express();

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

app.use(cors({
    origin: 'http://localhost:3335',
    optionsSuccessStatus: 200
}));

app.get('/', auth.authToken, (req, res) => {
    console.log(`[CONNE] ${new Date()} : ${req.ip}`);

    res.json({
        message: "Welcome back!"
    });
});

app.post('/access', express.urlencoded({ extended: true }), (req, res) => {
    const reason = req.body.reason;
    const password = req.body.password;

    console.log(`[LOGIN] ${new Date()} : ${reason}`);

    const login = auth.login(reason, password);

    if (login.token === null)
        res.statusCode = 401;

    res.json(login);
});

app.get('/date', auth.authToken, (req, res) => {
    const date = req.query.date;
    console.log(`[DATEG] ${new Date()} : ${ date }`);

    database.query({ text: 'SELECT id, message, timestamp FROM Entries WHERE date = $1 ORDER BY timestamp ASC', values: [date] })
        .then((result) => {
            res.json(result.rows);
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
});

app.post('/entry', auth.authToken, express.urlencoded({ extended: true }), (req, res) => {
    const message = req.body.message;
    const date = req.body.date;
    const timestamp = new Date();

    console.log(`[ENTRY] ${new Date()} : Adding entry to ${ date }`);

    database.query({
        text: 'INSERT INTO Entries (message, date, timestamp) VALUES($1, $2, $3)',
        values: [message, date, timestamp]
    })
        .then(() => {
            res.statusCode = 201;
            res.json({
                message: "Entry created.",
                message,
                date,
                timestamp
            });
        })
        .catch((err) => {
            console.error(err)
            res.sendStatus(500);
        });
});

app.delete('/entry', auth.authToken, (req, res) => {
    const id = req.query.id;

    console.log(`[ENTRY] ${new Date()} : Deleting entry to ${ id }`);

    database.query({
        text: 'DELETE FROM Entries WHERE id = $1',
        values: [id]
    })
        .then((response) => {
            console.log(response)
            res.statusCode = 200;
            res.json({
                message: "Entry deleted."
            });
        })
        .catch((err) => {
            console.error(err)
            res.sendStatus(500);
        });
});

app.listen(port, hostname, (err) => {
    if (err) console.error(err);
    else console.log(`Listening on ${hostname}:${port}`);
});