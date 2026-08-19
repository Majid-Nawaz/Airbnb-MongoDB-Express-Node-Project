const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({ //use new here as we create new instance of mongoose's schema class
    title:{
        type:String,
        // required: true
    },
    description:{
        type:String,
    },
    image:{
        filename: {type: String},
        url : {type: String,
        default: "A URL",
        set: (value)=>value ==="" ? "A URL": value,
        }
    },
    price:{
        type: Number,
        default: 1
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    }
});

let Listing = mongoose.model("Listing", listingSchema); // never use new here as model is a function and not a class
module.exports = Listing;