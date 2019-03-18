const express = require("express");
const router = express.Router();
const actionsGET = require("../controllers/user/get");
const actionPOST = require("../controllers/user/post");
// const uploadImage = require("../middleware/uploadImage"); uploadImage.upload.single("profileImage");

//General description of the whole route
/**
 *   @swagger
 *   tags:
 *      name: users
 *      description: All the users that have an active rol inside the management of the API
 *
 */

//GET routes
router.get("/", actionsGET.allUsers);
router.get("/:idUser", actionsGET.oneUser);
//POST routes
router.post("/", actionPOST.insertUser);
router.post("/login", actionPOST.requestToken);


module.exports = router;
