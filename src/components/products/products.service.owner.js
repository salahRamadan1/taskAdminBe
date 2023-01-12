const ProductModel = require("./products.model");
const { createTryAndCatch } = require("../../utils/catchError");
const AppError = require("../../utils/AppError");
//addProduct
exports.addProduct = createTryAndCatch(async (req, res, next) => {
 
  req.body.product_Pic = req.file?.filename;
  let Product = new ProductModel(req.body);
  await Product.save();
  res.status(200).json({ message: "success", Product });
});
// deleteProduct
exports.deleteProduct = createTryAndCatch(async (req, res, next) => {
  let Product = await ProductModel.findOneAndDelete(req.body._id);

  res.status(200).json({ message: "success", Product });
});
// update Price
exports.updateOriginalFinal = createTryAndCatch(async (req, res, next) => {
  let isProd = await ProductModel.findByIdAndUpdate(req.body._id, req.body);
  if (!isProd) return next(new AppError(" Product not found", 201));
  let product = await isProd.save();
  res.status(200).json({ message: "success", product });
});
exports.getProduct = createTryAndCatch(async (req, res, next) => {
  let isProd = await ProductModel.find({ userId: req.id });

  if (!isProd) return next(new AppError("Product not found", 201));
  res.status(200).json({ message: "success", isProd });
});
