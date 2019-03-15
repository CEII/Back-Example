const express = require("express");
const router = express.Router();
const swaggerJSDoc = require("swagger-jsdoc");

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
app.get("/json", (req, res, next)=> {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});

module.exports = router;
