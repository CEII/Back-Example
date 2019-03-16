const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");


app.use(morgan("dev"));

//Routes used in the API
const userRoutes = require("./API/v1/routes/user");
const swaggerRoutes = require("./API/v1/routes/swagger");

// Creates a public route for access to documents in the "public" folder
app.use(express.static(path.join(__dirname, "public")));


//tell mongoose to use es6 implementation of promises
mongoose.Promise = global.Promise;
//Connection to database
mongoose.connect(
    process.env.MONGOOSE_CONN,
    {useNewUrlParser: true })
    .then(answer=>{
        console.log("Successfully connected to database");
    })
    .catch(err=>{
        console.log("Not connected to database " + err);
    });

//Accepts url bodies that are simple
app.use(bodyParser.urlencoded({extended: false}));
//Enables the read of jsons
app.use(bodyParser.json());

//Stops some CORS problems
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === "OPTIONS"){
        res.header(
            "Access-Control-Allow-Methods",
            "PUT, POST, PATCH, DELETE, GET"
        );
        return res.status(200).json({});
    }
    next();
});


// Active endpoints for the API
app.use("/API/v1/users", userRoutes);
app.use("/API/v1/swagger", swaggerRoutes);

module.exports = app;