const express = require('express');
const app = express();
const index_router = require('./src/routes/index_router.js');

app.use('/', index_router);

// View engine
app.set('views', './src/views');
app.set('view engine', 'pug');


module.exports = app;