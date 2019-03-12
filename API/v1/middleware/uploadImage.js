const multer = require("multer");

//Opciones de multer
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,"./public/uploads/");
    },
    filename: function(req,file, cb){
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb)=>{
    //Will not accept any format that goes beyond jpeg and png
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        cb(null, true);
    }
    else{
        const res = res.status(500).json({message: "Unaccepted image type"});
        cb(res, false);
    }
};
exports.upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
});
