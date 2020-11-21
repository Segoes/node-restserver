const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Client = require('../models/client');


app.post('/login', (req, res) => {
    let body = req.body;

    Client.findOne({ email: body.email }, (err, clientDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!clientDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Client incorrect'
                }
            })
        }

        if (!bcrypt.compareSync(body.password, clientDB.password)) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Password incorrect'
                }
            })
        }

        let token = jwt.sign({
            client: clientDB,
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            clientDB,
            token: token
        })
    });


});

module.exports = app;