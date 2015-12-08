var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/ebay');

var mongoosedb = mongoose.createConnection(process.env.IP, "blahblah");
mongoosedb.on('error', console.error.bind(console, 'connection error:')); 

var Item = mongoose.model('Item', { SearchWord: String, MinPrice: Number, MaxPrice: Number });

var UserSchema = new mongoose.Schema({
    Username: String, 
    Password: String, 
    Items: [Item] 
});

module.exports = mongoose.model('User', UserSchema);