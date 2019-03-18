const mongoose = require("mongoose");
// !Important: Making a require multiple times doesn't affect the code length
/**
*   @swagger
 *  definitions:
 *      resource:
 *          properties:
 *              name:
 *                  type: string
 *              permissions:
 *                  type: string
 *                  description: "Which permissions"
 *                  enum:
 *                  - "create"
 *                  - "read"
 *                  - "update"
 *                  - "delete"
*/

const resourceModelSchema = mongoose.Schema(
    {
        name: {type: String},
        permissions: [String]
    },
    { _id: false });

module.exports = resourceModelSchema;
