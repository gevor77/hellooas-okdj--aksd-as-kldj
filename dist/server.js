import express from 'express';
import router from './src/route/routes.js';
import './src/db/db.js';
const PORT = 3007;
const app = express();
app.use(express.json());
app.use(router);
app.listen(PORT);
