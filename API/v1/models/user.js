const mongoose = require("mongoose");
const imageModel = require("./image");
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
 *      secret:
 *         type: string
 *      registarAt:
 *         type: string
 *      accountStatus:
 *          type: string
 *      nickname:
 *          type: string
 *      profileImage:
 *          type: object
 *          $ref: "#/definitions/image"
 *      contactEmail:
 *          type: string
 *      accessCode:
 *          type: string
 *      accountIdentifier:
 *          type: string
 *      carnet:
 *          type: string
 */

const userSchema = mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    name: {type: String, require:true},
    lastname: {type: String, require:false},
    secret: {type: String, require:true},
    registarAt: {type: Date, default: Date.now},
    accountStatus: { type: Number, require:true},
    nickname: {type: String, require:true},
    profileImage: imageModel,
    emailAddress: {type:String, require:true},
    accessCode: {type:String, require:true},
    accountIdentifier: {type:String, require:true},
    carnet: {type:String, require:true}
});

module.exports = mongoose.model("user", userSchema);
