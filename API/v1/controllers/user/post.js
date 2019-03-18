const userModel = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @swagger
 * paths:
 *  /users:
 *      post:
 *          tags:
 *          - users
 *          summary: Creates a user in the database
 *          produces:
 *          - "application/json"
 *          parameters:
 *            - name: User
 *              in: body
 *              description: User information to be inserted in the DB
 *              required: true
 *              type: object
 *              schema:
 *                  $ref: '#/definitions/users'
 *          responses:
 *              '200':
 *                  description: User record/s added
 *              '422':
 *                  description: User couldn't be added
 */

exports.insertUser= (req, res, next) => {
    //Verify if a user exists with the same email and name
    userModel.find({$or: [
        {emailAddress: req.body.emailAddress},
        {carnet:  req.body.carnet}
    ]})
        .exec()
        .then(user =>{
            //User found with the same carnet or email
            if(user.length>= 1){
                res.status(422).json({
                    message: "Credentials in use",
                });
            }
            else{
                bcrypt.hash(req.body.secret, parseInt(process.env.SALT_ROUNDS), (err,hash)=>{
                    if(err){
                        console.log(err.message);
                        res.status(500).json({
                            message: err.message
                        });
                    }
                    else{
                        const userBody = {
                            name: req.body.name,
                            lastname: req.body.lastname,
                            secret: hash,
                            accountStatus: req.body.accountStatus,
                            nickname: req.body.nickname,
                            emailAddress: req.body.emailAddress,
                            resources: req.body.resources,
                            carnet: req.body.carnet
                        };
                        const newUser = new userModel(userBody);
                        newUser.save()
                            .then((result) =>{
                                res.status(201).json({
                                    userData: newUser,
                                    message: "User record created"
                                })
                            }).catch(err =>{
                                /*res.status(422).json({
                                    message: "Record had a conflict",
                                });*/
                                res.status(500).json({
                                    message: err.message
                                });
                            });
                    }
                });
            }
        });

};


/**
 * @swagger
 * paths:
 *  /users/login:
 *      post:
 *          tags:
 *          - users
 *          summary: Return a token with the user information
 *          produces:
 *          - "application/json"
 *          parameters:
 *            - name: Credencials
 *              in: body
 *              description: information for the login to work
 *              required: true
 *              schema:
 *                  type: object
 *                  properties:
 *                      emailAddress:
 *                          type: string
 *                          example: 00062816@uca.edu.sv
 *                      secret:
 *                          type: string
 *                          example: 'secretBig'
 *          responses:
 *              '200':
 *                  description: Here is your token
 *                  schema:
 *                     type: object
 *                     properties:
 *                          token:
 *                              type: string
 *              '401':
 *                  description: Failed login
 */

exports.requestToken = (req,res,next)=>{
    userModel.findOne({emailAddress: req.body.emailAddress}).exec().then(doc =>{
        if(!doc){
            res.status(401).json({
                message: "Authentication failed",
            });
        }
        else{
            bcrypt.compare(req.body.secret, doc.secret, (err, result)=>{
                if(err){
                    res.status(500).json({
                        message: err.message
                    });
                }
                else{
                    if(result){
                        const token = jwt.sign({
                            idUser: doc._id,
                            emailAddress: doc.emailAddress,
                            resources: doc.resources
                        }, process.env.JSON_WEB_TOKEN_SECRET,{
                            expiresIn: "3h"
                        });
                        res.status(200).json({
                            token : token,
                            message: "Here is your token"
                        });
                    }
                    else{
                        res.status(401).json({
                            message: "Authentication failed",
                        });
                    }
                }
            });
        }
    }).catch(err =>{
        res.status(500).json({
            message: err.message
        });
    });
};