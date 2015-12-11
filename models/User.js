var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/ebay');

var mongoosedb = mongoose.createConnection(process.env.IP, "blahblah");
mongoosedb.on('error', console.error.bind(console, 'connection error:')); 



var Listing = new mongoose.Schema({
    ListingURL: String
});


var ConditionSchema = new mongoose.Schema({
    Value: Number
});


// var Listing = mongoose.model('Listing', ListingSchema);


var Item = mongoose.Schema(
    { 
        SearchWord: String, 
        MinPrice: Number, 
        MaxPrice: Number,
        Currency: {
            type: String,
            default: "USD"
        },
        Shipping: String,
        BestOfferOnly: {
            type: Boolean,
            default: false
        },
        CharityOnly: {
            type: Boolean,
            default: false
        },
        ExcludeAutoPay: {
            type: Boolean,
            default: false
        },
        ExpeditedShippingType: String,
        FeaturedOnly: {
            type: Boolean,
            default: false
        },
        FreeShippingOnly: {
            type: Boolean,
            default: false
        },
        GetItFastOnly: {
            type: Boolean,
            default: false
        },
        ListingType: "String",
        
        Listings: [Listing]
    }
);


var UserSchema = new mongoose.Schema({
    Username: String, 
    Password: String, 
    Items: [Item],
    Listings: [Listing]
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