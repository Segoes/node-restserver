const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const _ = require('underscore');
const Client = require('../models/client');


// Requests
app.get('/client', function(req, res) {

    let from = Number(req.query.from) || 0;
    let to = Number(req.query.limit);

    Client.find({}, 'name email role') // Properties to show
        .skip(from)
        .limit(to)
        .exec((err, clients) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Client.count({}, (err, count) => {
                res.json({
                    ok: true,
                    clients,
                    count
                })
            });

        })

});

app.post('/client', function(req, res) {
    let body = req.body;

    let client = new client({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, salt),
        role: body.role
    });

    client.save((err, clientDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            client: clientDB
        });

    });

});

app.put('/client/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'state']);

    client.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, clientDB) => {


        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            client: clientDB
        });
    })
});

app.delete('/client/:id', function(req, res) {
    let id = req.params.id;

    client.findByIdAndUpdate(id, { state: false }, { new: true }, (err, clientDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            client: clientDB
        });
    });


    // User.findByIdAndRemove(id, (err, userDeleted) => {
    //     if (err || !userDeleted) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         })
    //     }

    //     res.json({
    //         ok: true,
    //         user: userDeleted
    //     })
    // });
});

module.exports = app;