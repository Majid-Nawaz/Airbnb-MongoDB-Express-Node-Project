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
        default: "https://plus.unsplash.com/premium_photo-1661908377130-772731de98f6?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: (value)=>value ==="" ? "https://plus.unsplash.com/premium_photo-1661908377130-772731de98f6?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D": value,
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