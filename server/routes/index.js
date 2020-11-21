const express = require('express');
const app = express();

app.use(require('./client'));
app.use(require('./login'));

module.exports = app;