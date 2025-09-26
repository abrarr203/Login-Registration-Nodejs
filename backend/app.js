import express from 'express';
const app = express();

import { PORT, SERVER_URL } from './configs/env.js';
import databaseConnection from './database/db.js';
import cookieParser from 'cookie-parser';
import { setupRoutes } from './routers/index.route.js';


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.use(express.static('public'));

setupRoutes(app);

app.get('/', (req, res) => {
    res.render('landing');
});

app.listen(PORT, async () => {
    console.log(SERVER_URL+""+PORT);

    await databaseConnection();
})