exports.users = [
    {
        name: "alex",
        lastname: "big",
        secret: "hashed1",
        //Active
        accountStatus: 1 ,
        nickname: "AlexBig",
        emailAddress: "0002316@uca.edu.sv",
        resources: [
            {
                name: "users",
                permissions: [ "create", "read", "update", "delete"]
            }
        ]
    },
    {
        name: "alex1",
        lastname: "big2",
        secret: "hashed1",
        //Active
        accountStatus: 1 ,
        nickname: "AlexBig",
        emailAddress: "0002316@uca.edu.sv",
        carnet: "0002317",
        profileImage: {
            completeURL: "https://url/image123.net",
            alternativeText: "imagetext",
            type: "png",
            name: "image123"
        },
        resources: [
            {
                name: "users",
                permissions: [ "create", "read", "update", "delete"]
            }
        ]
    },
    {
        name: "alex3",
        lastname: "big4",
        secret: "hashed1",
        //Active
        accountStatus: 0 ,
        nickname: "AlexBig",
        emailAddress: "0002316@uca.edu.sv",
        carnet: "0002317",
        profileImage: {
            completeURL: "https://url/image123.net",
            alternativeText: "imagetext",
            type: "jpg",
            name: "image123"
        },
        resources: [
            {
                name: "users",
                permissions: [ "create", "read", "update", "delete"]
            }
        ]
    },
];
