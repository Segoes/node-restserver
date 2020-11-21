const jwt = require('jsonwebtoken');

// Verify token
let verifyToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }

        req.client = decoded.client;
    })

    next();

};

let verifyRole = (req, res, next) => {
    let client = req.client;

    if (client.role !== 'ADMIN_ROLE') {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }
    }

    next();
};


module.exports = {
    verifyToken,
    verifyRole
}