const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
var bodyParser = require('body-parser')
require("dotenv").config();
const loginRouter=require("./routes/loginRoute");
const registerRouter=require("./routes/registerRoutes");
const app=express();

app.use(cors({
    origin:"http://localhost:3000",
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
const dbUri=process.env.dbUri;
mongoose.connect(dbUri).then((res)=>{
    console.log("Database Connection Successfull");
}).catch((err)=>{
    console.log(err);
});

app.use("/login",loginRouter);
app.use("/register",registerRouter);


app.get("/",(req,res)=>{
    res.send("Hello");
})
app.listen(5000,()=>{
    console.log("Server started");
})