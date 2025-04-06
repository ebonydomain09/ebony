const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req,res,cb) {
        cb(null,path.join(__dirname, '/public'))
    },
    filename: function(req,file,cb) {
        console.log(file);
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({
    storage: storage,
})

module.exports = upload