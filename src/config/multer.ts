import multer, { Options } from "multer";
import path from "path";

export default {
    storage: multer.diskStorage({
        destination: path.join(__dirname, "..", "..", "uploads"),
        filename(req, file, callback) {
            const id = req.params.id;
            const extensao = path.extname(file.originalname);
            callback(null, `${id}${extensao}`);
        },
    }),

    fileFilter: (req, file, cb) => {
        const mimeType = ["image/png", "image/jpeg", "image/gif", "image/jpg"]

        if(!mimeType.includes(file.mimetype)) {
            return cb(null, false);
        }

        cb(null, true);
    },
} as Options;