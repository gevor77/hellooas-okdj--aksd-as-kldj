const mongoose = require('mongoose');

(function(){
    mongoose.set('debug', true);
    mongoose.connect('mongodb://127.0.0.1:27017/authentication', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((result) => {
        console.log('Connection Established')
    }).catch((error) => {console.log(error)})
})()

mongoose.set('debug', true);