const userModel = require("../../models/user");

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
    let resManager = res;
    let data = req.body;
    const userBody = {
        name: data.name,
        lastname: data.lastname,
        secret: data.secret,
        accountStatus: data.accountStatus,
        nickname: data.nickname,
        profileImage: {
            completeURL: "uploads\\"+req.file.filename,
            alternativeText:  req.body.nickname+" profile image",
            type:  req.file.mimetype,
            name:  req.file.filename
        },
        emailAddress: data.emailAddress,
        accessCode: data.accessCode,
        accountIdentifier: data.accountIdentifier,
        carnet: data.carnet
    };
    const newUser = new userModel(userBody);
    newUser.save()
        .then( (result) =>{
            resManager.status(201).json({
                userData: newUser,
                message: "User record created"
            })
        }).catch(err =>{
        /*res.status(422).json({
            message: "Record had a conflict",
        });*/
            resManager.status(500).json({
                message: err.message
            });
        });
    return resManager;
};
