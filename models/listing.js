const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  // image: {
  //   type: String,
  //   default:
  //     "https://images.unsplash.com/photo-1628624747295-ea5e7fc3d76f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   set: (v) =>
  //     v === " "
  //       ? "https://images.unsplash.com/photo-1628624747295-ea5e7fc3d76f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  //       : v,
  // },

  // image:{
  //   filename: {
  //   type: String,
  //   default: 'listing image'
  //   },
  //   url: {
  //   type: String,
  //   default:"https://images.unsplash.com/photo-1628624747295-ea5e7fc3d76f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   set: (v) => v === ""?"https://images.unsplash.com/photo-1628624747295-ea5e7fc3d76f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v,
  //   }
  //   },

  image: {
    filename: String,
    url: String
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Review"
    }
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  }
});

listingSchema.post("findOneAndDelete", async(listing)=>{
  if(listing){
    await Review.deleteMany({_id: {$in: listing.reviews}});
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;