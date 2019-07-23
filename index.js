const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

//configure dotenv
dotenv.config();

//initiate express app
const app = express();

//Conect to database
db.connect();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes'));
app.use('/new', require('./routes/url'));


const PORT = process.env.PORT || 3000;
//listen for app
app.listen(PORT, () => console.log(`Server is up and running on ${PORT}`));