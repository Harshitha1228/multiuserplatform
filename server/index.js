const express = require("express");
const cors = require("cors");
// const Signup = require("../server/model.signup");
const UserRoute = require("../server/Routes/userRoutes");
const {default: mongoose} = require("mongoose");
const app = express();

mongoose
    .connect("mongodb://localhost:27017")
    .then(()=>console.log("mongodb connected successfully"))
    .catch((error)=> console.log(error));
    
app.use(express.json());

const corsOptions = {
    origin:["http://localhost:5173","http://localhost:5174"],
    methods : ["POST" , "GET"],
    allowedHeaders:["Content-Type","Authorization"],
    credentials: true
};

app.use(cors(corsOptions));

app.get("/",(req,res) => {
    res.send("Hello world");
});

app.use("/user",UserRoute);


app.listen(3000,() => {
    console.log("Server is running");
});