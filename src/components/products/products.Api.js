const { Upload } = require("../../utils/upload.Img");
const {
  addProduct,
  deleteProduct,
  updateOriginalFinal,
  getProduct,
} = require("./products.service.owner");

const app = require("express").Router();
// app.use(auth)
app
  .route("/")
  .post(Upload("product_Pic"), addProduct)
  .put(updateOriginalFinal)
  .delete(deleteProduct)
  .get(getProduct);

module.exports = app;
