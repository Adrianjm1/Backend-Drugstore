const jwt = require('jsonwebtoken');

let validToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, 'token-SEED', (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    ok: false,
                    message: 'Token no valido'
                }
            })
        }

        req.usuario = decoded.usuario; //Es como si se abriese una sesión nueva, a ese atributo req.usuario se le pasarán todos los datos del decode.usuario
        next();

    });

}

module.exports = {
    validToken
}