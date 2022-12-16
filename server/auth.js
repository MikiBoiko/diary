const jwt = require('jsonwebtoken');

function login(reason, password) {
    if (password === process.env.DIARY_PASSWORD) {
        const token = jwt.sign({ reason }, process.env.TOKEN_KEY, { expiresIn: '3h' });
        return (
            {
                message: 'Logged in.',
                token
            }
        );
    }
    else return (
        {
            message: 'Failed login.',
            token: null
        }
    );
}

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

    if (token === null) {
        res.statusCode = 401;
        return res.json({
            message: "No token."
        });
    }

    jwt.verify(token, process.env.TOKEN_KEY, (err, reason) => {
        if (err) {
            res.statusCode = 401;
            return res.json({
                message: "Failed token verification."
            });
        }
        req.reason = reason;
        next();
    });
}

module.exports = { login, authToken };