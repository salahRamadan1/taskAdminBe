var jwt = require("jsonwebtoken");
exports.auth = async (req, res, next) => {
  let { token } = req.headers;
  jwt.verify(token, process.env.secretToken, function (err, decoded) {
    if (err) {
      res.status(401).json({ message: err });
    } else {
      req.id = decoded.userId;
      next();
    }
  });
};
