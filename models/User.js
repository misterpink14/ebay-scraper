var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/ebay');

var mongoosedb = mongoose.createConnection(process.env.IP, "blahblah");
mongoosedb.on('error', console.error.bind(console, 'connection error:')); 



var Listing = new mongoose.Schema({
    ListingURL: String
});


// var Listing = mongoose.model('Listing', ListingSchema);


var Item = mongoose.Schema(
    { 
        SearchWord: String, 
        MinPrice: Number, 
        MaxPrice: Number,
        Listings: [Listing]
    }
);


var UserSchema = new mongoose.Schema({
    Username: String, 
    Password: String, 
    Items: [Item]
});


module.exports = mongoose.model('User', UserSchema);


/*

var Item = mongoose.model(
    'Item', 
    { 
        SearchWord: String, 
        MinPrice: Number, 
        MaxPrice: Number 
    });

var ListingSchema = new mongoose.Schema({
    Username: String,
    Itemname: String,
    ListingURL: String
});

var Listing = mongoose.model('Listing', ListingSchema);

var UserSchema = new mongoose.Schema({
    Username: String, 
    Password: String, 
    Items: [Item],
    Listings: [Listing]
});


module.exports = mongoose.model('User', UserSchema);


*/