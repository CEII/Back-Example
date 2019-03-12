const mongoose = require("mongoose");
// !Important: Making a require multiple times doesn't affect the code length
/**
*   @swagger
 *  definitions:
 *      image:
 *          properties:
 *              completeURL:
 *                  type: string
 *              alternativeText:
 *                  type: string
 *              imageType:
 *                  type: string
 *              name:
 *                  type: string
*/
const imageSchema = mongoose.Schema(
    {
        completeURL: {type: String, require:true},
        alternativeText: {type: String, require:true},
        type: {type:String, require:true},
        name: {type:String, require:true}
    },
    { _id: false });

module.exports = imageSchema;
