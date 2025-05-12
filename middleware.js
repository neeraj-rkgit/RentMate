const Listing=require("./models/listing");
const ExpressError=require("./utils/ExpressError");
const {listingSchema, reviewSchema}=require("./schema.js")

module.exports.isLoggedIn= (req,res,next) =>{
    console.log(req.body);
    if(!req.isAuthenticated()){
        //redirectUrl save
        req.session.redirectUrl=req.originalUrl;
        req.flash("error", "You must be logged in!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl= (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner= async (req,res,next) =>{
    let {id}= req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You don't have permission perform this action");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
    next();
    }
};

module.exports.validateReview=(req,res,next) =>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else{
    next();
    }
};
