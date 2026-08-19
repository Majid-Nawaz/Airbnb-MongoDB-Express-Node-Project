const mongoose = require("mongoose");
const ourModelListing = require("../models/listing.js");
const listings = require("./data.js");


main()
    .then(()=>{
        console.log("successful connection");
    })
    .catch((err)=>{
        console.log(err);
    });

async function main (){
    await mongoose.connect("mongodb://127.0.0.1:27017/Airbnb");
};

//It is very important to use async await on all the mehtods of mongoose that are used for CRUD,
// You cna use promise chaining with .then but see at the end the wrong and correct syntax for using it
async function initDatabase (){
    await ourModelListing.deleteMany({});

    await ourModelListing.insertMany(listings);
    
};
initDatabase();

/*Why your above async/await version worksThe await keyword pauses the execution of your initDatabase function until the database finishes that specific line.

The example below is false .then syntax and fails to insert data because JavaScript executes all three operations simultaneously rather than waiting for each one to finish.
ourModelListing.deleteMany({}).then((res)=>{console.log(res)});

ourModelListing.insertMany(listings).then((res)=>{console.log(res)});

ourModelListing.find().countDocuments().then((res)=>{console.log(res)});
*/

/*
To make the .then() version work exactly like your async/await code, you must chain them sequentially by returning the next operation inside the callback.
ourModelListing.deleteMany({})
  .then((res) => {
    console.log("Deleted:", res);
    // Return the next promise so JavaScript waits for it
    return ourModelListing.insertMany(listings); 
  })
  .then((res) => {
    console.log("Inserted:", res);
    // Return the next promise again
    return ourModelListing.find().countDocuments(); 
  })
  .then((count) => {
    console.log("Final Count:", count); 
  })
  .catch((err) => {
    console.error("An error occurred somewhere in the chain:", err);
  });

*/


    