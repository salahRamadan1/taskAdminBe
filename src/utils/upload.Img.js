const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const AppError = require("./AppError");
module.exports.Upload = (fieldName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads`);
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() + "_" + file.originalname);
    },
  });
  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("image only", 201), false);
    }
  }
  const upload = multer({ storage, fileFilter });

  return upload.single(fieldName);
};
