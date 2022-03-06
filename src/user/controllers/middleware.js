const jwt = require('jsonwebtoken');

let validToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, 'token-SEED', (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                message: 'No-auth-token'
            })
        }

        req.usuario = decoded.usuario; //Es como si se abriese una sesión nueva, a ese atributo req.usuario se le pasarán todos los datos del decode.usuario
        next();

    });

}

let checkToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, 'token-SEED', (err, decoded) => {

        if (err) {
            return res.send({
                ok: false,
                message: 'No-auth-token'
            })
        }

        next();

    });

}

module.exports = {
    validToken,
    checkToken
}