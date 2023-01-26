const multer = require('multer')
const compress = require('compression')
const photoUpload = multer({

    limits: {
        fileSize: 5*1024**2
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files allowed'))
        }

        cb(null, true)
    },
    middleware: compress()
})


module.exports = photoUpload