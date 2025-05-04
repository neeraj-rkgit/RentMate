const express=require("express");
const app=express();
const users=require("./routes/user.js")
const posts=require("./routes/post.js")

app.get("/getcookies",(req,res)=>{
    res.cookie("greet", "hello");
    res.send("send you some cookies");
})

app.use("/users", users);
app.use("/posts", posts);

app.get("/", (req,res)=>{
    res.send("Hi, I am root!");
});

app.listen(3000, ()=>{
    console.log("Server is listing to 3000");
});