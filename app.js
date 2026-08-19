//Step 1: Setup basic server and mongo db connection
//Step 2: Make a model and initialize database, in models and dbinit directories
//Step 3: CRUD operations on model


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const template = require("ejs");
const port = 8080;
const ourModelListing = require("./models/listing.js"); // required model so that we can perform crud operations on it
const path = require("path"); //for joiniing paths so that express knows about views and public
const methodOverride = require("method-override"); //for coverting method from post to put/delete by using ?_method=put in forms
const ejsMate = require("ejs-mate"); // for setting ejs's engine to ejs-mate so that we can use layout() function in templates for boilerplate(repetitive code)

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Tells Express where your template files are located
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate); // set the ejs engine to ejs mate using ejs-mate import/require
app.use(express.static(path.join(__dirname, "public")));//specifying public as a dirctory for static file serving, also using path.join at the same time

main()
    .then(()=>{
        console.log("Succesfull connection with db established")
    })
    .catch((err)=>{
        console.log(err);
    });

async function main (){
    await mongoose.connect("mongodb://127.0.0.1:27017/Airbnb");
};

//Read route
app.get("/listings", async (req, res)=>{
    console.log(1);
    let allListings = await ourModelListing.find();
    res.render("templates/index.ejs", {allListings});
});



//Create route
app.get("/listings/new", (req, res)=>{
    console.log(3);
    res.render("templates/new.ejs");
});

app.post("/listings", async (req, res)=>{
    console.log(4);
    let {details} = req.body;
    let newListing = new ourModelListing({...details}); //since details object contains the key value pairs that we need to send, so we destructure details
    

    let saved = await newListing.save();
    // console.log(saved);
    res.redirect("/listings"); 
    
});

//Show(details) route
app.get("/listings/:id", async (req, res)=>{
    let {id} = req.params;
    console.log(2);
    let listingDetail = await ourModelListing.findById(id);
    res.render("templates/detailedListing.ejs", {listingDetail});
});

//Update route
app.get("/listings/:id/edit", async (req, res)=>{
    let {id} = req.params;
    console.log(5);
    let updateListing = await ourModelListing.findById(id);
    res.render("templates/edit.ejs", {updateListing});

});

app.patch("/listings/:id", async (req, res)=>{
    console.log(6);
    let {id} = req.params;
    let {details} = req.body;
    let updatedListing = await ourModelListing.findByIdAndUpdate(id, {...details}, {runValidators: true, new: true});
    res.redirect(`/listings/${id}`); // Always remember that redirect takes the string as a route, you can declare params here in order for them to recieve arguments.
});

//Delete route
app.delete("/listings/:id", async (req, res)=>{
    let {id} = req.params;
    console.log(7);
     await ourModelListing.findByIdAndDelete(id);
     res.redirect("/listings"); 
});
   






app.get("/", (req, res)=>{
    res.send("Succesfull access");
})

app.listen(port, ()=>{
    console.log("Listening on port 8080");
});