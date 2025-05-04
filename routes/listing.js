const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError");
const {listingSchema}=require("../schema.js")
const Listing=require("../models/listing.js");

const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};



// Index Route
router.get("/", async (req,res)=>{     
    const allListings= await Listing.find({});
    res.render("listings/index.ejs", {allListings});
})

//New Route
router.get("/new", (req,res)=>{
    res.render("listings/new.ejs");
})


//Show Route
router.get("/:id" ,wrapAsync( async (req,res)=>{
    let {id}= req.params;
    const listing=await Listing.findById(id.trim()).populate("reviews");
    res.render("listings/show.ejs", {listing});

}))

//Create ROUTE
router.post("/",
    validateListing,
     wrapAsync( async (req,res,next)=>{
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}))

//Edit Route
router.get("/:id/edit", wrapAsync( async (req,res)=>{
    let {id}= req.params;
    const listing=await Listing.findById(id.trim());
    res.render("listings/edit.ejs", {listing});
}))

//Update Route
router.put("/:id",
    validateListing,
    wrapAsync( async (req,res)=>{
    let {id}= req.params;
    await Listing.findByIdAndUpdate(id , {...req.body.listing});
    res.redirect(`/listings/${id}`);
}))

//Delete Route
router.delete("/:id", wrapAsync(async (req,res)=>{
    let {id}= req.params;
    let deetedListing=await Listing.findByIdAndDelete(id);
    console.log(deetedListing);
    res.redirect("/listings");
}))

module.exports=router;

