var mongoose = require('mongoose');

var mongoosedb = mongoose.createConnection(process.env.IP, "blahblah");
mongoosedb.on('error', console.error.bind(console, 'connection error:')); 



var Listing = new mongoose.Schema({
    ListingURL: String
});


var Item = mongoose.Schema({ 
    SearchWord: String, 
    MinPrice: Number, 
    MaxPrice: Number,
    Listings: [Listing]
});


var UserSchema = new mongoose.Schema({
    Username: String, 
    Password: String, 
    Items: [Item]
});


module.exports = mongoose.model('User', UserSchema);
