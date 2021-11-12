const express=require("express");
const cors=require("cors");
const loginRouter=require("./routes/loginRoute");
const registerRouter=require("./routes/registerRoutes");
const app=express();

app.use(cors({
    origin:"http://localhost:3000",
}));

app.use("/login",loginRouter);
app.use("/register",registerRouter);


app.get("/",(req,res)=>{
    res.send("Hello");
})
app.listen(5000,()=>{
    console.log("Server started");
})