const express = require("express");
const { dbConnect } = require("./src/dbConnection/connection");
const AppError = require("./src/utils/AppError");
const app = express();
const gloBalErrors = require("./src/utils/globalError");
const cors = require("cors");
const { allReq } = require("./src/utils/require");
app.use(cors());
require("dotenv").config();
const port = process.env.PORT || 3000;
app.use(express.static("uploads"));
app.use(express.json());
allReq(app);
dbConnect();
app.all("*", (req, res, next) => {
  next(
    new AppError(` can't find this route :${req.originalUrl} on server `, 404)
  );
});
app.use(gloBalErrors);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
