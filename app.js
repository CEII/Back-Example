const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const swaggerJSDoc = require("swagger-jsdoc");

app.use(morgan("dev"));

//Routes used in the API
const userRoutes = require("./API/v1/routes/user");

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

// General definition of a Swagger document
const swaggerDefinition = {
    info: {
        title: "CEII portal API",
        version: "1.0.0",
        description: "General description of all the routes inside the API",
    },
    host: "db.ceii.com.sv:52138",
    basePath: "/API/v1",
    schemes: ["https" , "http"],
    securityDefinitions:{
        Authorization: {
            type: "apiKey",
            name: "Authorization",
            in: "header"
        }
    }
};
// Options for Swagger
const options = {
    // Imports the swaggerDefinition ^
    swaggerDefinition: swaggerDefinition,
    // Which places will it read
    apis: ["./API/v1/controllers/**/*.js","./API/v1/models/*.js", "./API/v1/routes/*.js"],// pass all in array
};
// Initialize the Swagger document
const swaggerSpec = swaggerJSDoc(options);

// This route returns a json that the index.html of Swagger readsr
app.get("/v1/swagger.json", (req, res, next)=> {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});

// Active endpoints for the API
app.use("/API/v1/users", userRoutes);

module.exports = app;
