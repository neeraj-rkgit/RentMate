const express=require("express");
const app=express();
const mongoose=require("mongoose");

const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require('ejs-mate')  ;

const listings=require("./routes/listing.js");
const reviews = require("./routes/review.js");
//const ExpressError = require("./utils/ExpressError.js");


// connecting with the database
//const MONGO_URL="mongodb://127.0.0.1:27017/test/wanderlust";

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req,res)=>{
    res.send("Hi, i am root")
})


app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews)


// app.all("*", (req,res,next)=>{
//     next(new ExpressError(404, 'Page not Found!'));
// })



app.use((err,req,res,next)=>{
    let {statusCode=500, message="Something went wrong"}=err;
    res.status(statusCode).render("error.ejs", {message});
    //res.status(statusCode).send(message);
    
})

app.listen(8080, ()=>{
    console.log("Listening on port no-8080");
})

