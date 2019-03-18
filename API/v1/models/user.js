const mongoose = require("mongoose");
const imageModel = require("./image");
const resourceModel = require("./resource")
const shortid = require("shortid");
/**
 * @swagger
 * definitions:
 *   users:
 *     properties:
 *      name:
 *         type: string
 *      lastname:
 *         type: string
 *      carnet:
 *          type: string
 *      emailAddress:
 *          type: string
 *      secret:
 *         type: string
 *      registarAt:
 *         type: string
 *      accountStatus:
 *          type: integer
 *      nickname:
 *          type: string
 *      profileImage:
 *          type: object
 *          $ref: "#/definitions/image"
 *      resources:
 *          type: array
 *          items:
 *              $ref: "#/definitions/resource"
 */

const userSchema = mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    name: {type: String, require:true},
    lastname: {type: String, require:false},
    carnet: {type:String, require:true},
    emailAddress: {type:String, require:true},
    secret: {type: String, require:true},
    registarAt: {type: Date, default: Date.now},
    accountStatus: { type: Number, require:true},
    nickname: {type: String, require:true},
    profileImage: imageModel,
    resources: [resourceModel]
});

module.exports = mongoose.model("user", userSchema);
