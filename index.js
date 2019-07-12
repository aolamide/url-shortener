const express = require('express');
const dotenv = require('dotenv');
const urlRoutes = require('./routes/url');
const mongoose = require('mongoose');

dotenv.config();
const app = express();

app.use(express.json({ extented: false }));
app.use('/', urlRoutes);

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
.then(() => console.log('DB connected'))
.catch(err => console.log(err));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});


app.listen(process.env.PORT, () => console.log('server is up and running'));