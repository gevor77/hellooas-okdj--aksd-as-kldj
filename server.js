const express = require('express');
const PORT = 3007;
const router = require('./route/routes');
const middleware = require('./middleware/middleware');
const app = express();
const jwt = require('jsonwebtoken');

require('./db/db');
app.use(express.json());
// app.use(cookieParser());
app.listen(PORT, () => {
    console.log('Port 3007 started');
});

app.use(middleware);
app.use(router);

