const userModel = require("../../models/user");

/**
 * @swagger
 * paths:
 *  /users:
 *      get:
 *          tags:
 *          - users
 *          summary: Finds all the users and displays them
 *          produces:
 *          - "application/json"
 *          parameters:
 *            - name: Authorization
 *              in: header
 *              description: The authorization must follow the format 'Bearer ****'
 *              required: true
 *              type: string
 *          responses:
 *              '200':
 *               description: Shows all the users information
 *               schema:
 *                  type: object
 *                  properties:
 *                      count:
 *                          type: integer
 *                      userArray:
 *                          type: array
 *                          items:
 *                              $ref: '#/definitions/users'
 *              '401':
 *                  description: You lack the credentials to do this action
 */

exports.allUsers = (req,res,next) =>{
    userModel.find({}).then(docs=>{
        return res.status(200).json({
            count: docs.length,
            users: docs.map(doc =>{
                // Specifies the way the user doc will be presented and what information will be given to the user
                return{
                    _id : doc._id,
                    name : doc.name,
                    lastname : doc.lastname,
                    registarAt : doc.registarAt,
                    accountStatus : doc.accountStatus,
                    nickname : doc.nickname,
                    profileImage : doc.profileImage,
                    contactEmail : doc.contactEmail,
                    accessCode : doc.accessCode,
                    accountIdentifier : doc.accountIdentifier,
                    carnet : doc.carnet
                }
            }),
            message: "All the users",
        });
    })
};
/**
 * @swagger
 * paths:
 *  /users/{idUser}:
 *      get:
 *          tags:
 *          - users
 *          summary: Shows the information of single user in the DB
 *          produces:
 *          - "application/json"
 *          parameters:
 *            - name: Authorization
 *              in: header
 *              description: The authorization must follow the format 'Bearer ****'
 *              required: true
 *              type: string
 *            - name: idUser
 *              in: path
 *              description: Id of the user to find
 *              require: true
 *              type: string
 *          responses:
 *              '200':
 *               description: Show the information of a user
 *               schema:
 *                  type: object
 *                  $ref: '#/definitions/users'
 *              '401':
 *                  description: You lack the credentials to do this action
 *              '404':
 *                  description: User not found
 */

exports.oneUser = (req,res,next) =>{
    const pathId = req.params.idUser;
    //Finds the document
    userModel.find({_id: pathId})
        //Only gets the following fields
        .select("_id name lastname registarAt accountStatus nickname profileImage contactEmail accessCode accountIdentifier carnet")
        .sort({registarAt: -1})
        .then(doc =>{
            if (doc.length>0) {
                return res.status(200).json({
                    userData: doc[0],
                    message: "A single user record",
                });
            }
            return res.status(404).json({
                message: "User record not found",
            });
        });
};
