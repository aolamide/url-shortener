const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));

    mongoose.connection.on('error', err => {
        console.log(`DB connection error: ${err.message}`)
    });
}

module.exports = {connect};