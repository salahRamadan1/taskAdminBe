const OrderModel = require("./order.model");
const { createTryAndCatch } = require("../../utils/catchError");
const AppError = require("../../utils/AppError");
// user
// add order
exports.addOrder = createTryAndCatch(async (req, res, next) => {
  req.body.userId = req.id;
  let isOrder = await OrderModel.findOne({
    userId: req.id,
    productOrder: req.body.productOrder,
  });
  if (isOrder) return next(new AppError(`you are ordered`, 201));
  let Order = new OrderModel(req.body);
  await Order.save();
  res.status(200).json({ message: "success", Order });
});
// order for user
exports.getOrder = createTryAndCatch(async (req, res, next) => {
  let Order = await OrderModel.find({ userId: req.id  , done:null}).populate(
    "productOrder userId",
    "-__v -_id -confirmEmail -email -password"
  );
  if (Order.length == 0)
    return res.status(200).json({ message: "you do not have any order" });
  res.status(200).json({ message: "success", Order });
});
// update order count
exports.updateOrder = createTryAndCatch(async (req, res, next) => {
  let order = await OrderModel.findOne({
    userId: req.id,
    _id: req.body.productOrder,
  }).populate("productOrder", "productPriceFinal");
  if (!order) return next(new AppError("order not found", 201));
  let total = order.productOrder.productPriceFinal * order.count;
  let isOrder = await OrderModel.findOneAndUpdate(
    { userId: req.id, _id: req.body.productOrder },
    { count: req.body.count, price: total },
    { new: true }
  );
  (await total) * 1;
  res.status(200).json({ message: "success", isOrder });
});
// add order to buy
exports.updateOrderToBuy = createTryAndCatch(async (req, res, next) => {
  let order = await OrderModel.findOne({
    userId: req.id,
    _id: req.body.productOrder,
  });
  if (!order) return next(new AppError("order not found", 201));
  let isOrder = await OrderModel.findOneAndUpdate(
    { userId: req.id, _id: req.body.productOrder },
    { done: false },
    { new: true }
  );
  res.status(200).json({ message: "success", isOrder });
});
// done order
exports.doneOrder = createTryAndCatch(async (req, res, next) => {
  let Order = await OrderModel.findByIdAndUpdate(
    req.body._id,
    { done: true, manDopBoolean: true },
    { new: true }   
  );
  res.status(200).json({ message: "success", Order });
});
// delete
exports.deleteOrder = createTryAndCatch(async (req, res, next) => {
  let Order = await OrderModel.findOneAndDelete(req.body._id);
  res.status(200).json({ message: "success", Order });
});
exports.getOrderPru = createTryAndCatch(async (req, res, next) => {
  let Order = await OrderModel.findOne({
    userId: req.id,
    done: false,
  }).populate(
    "productOrder userId",
    "-__v -_id -confirmEmail -email -password"
  );
  if(!Order) res.status(200).json({ message: " you do not have any order to done" });
  res.status(200).json({ message: "success", Order });
});
// owner
//   order for owner not until buy***********************************
exports.getOrderForOwnerNotBuyUntilNow = createTryAndCatch(
  async (req, res, next) => {
    let Order = await OrderModel.find({
      done: false,
      manDopBoolean: true,
    }).populate(
      "productOrder userId",
      "-__v -_id -confirmEmail -email -password"
    );
    if (Order.length == 0)
      return res.status(201).json({ message: "لا يوجد منتجات", Order });

    res.status(200).json({ message: "success", Order });
  }
);

//order for owner buy
exports.getOrderForOwnerBuy = createTryAndCatch(async (req, res, next) => {
  let Order = await OrderModel.find({ doneMony: false, done: true }).populate(
    "productOrder userId",
    "-__v -_id -confirmEmail -email -password"
  );
  if (Order.length == 0)
    return res.status(201).json({ message: "لا يوجد منتجات", Order });
  res.status(200).json({ message: "success", Order });
});
// mony
// update mony
exports.updateMony = createTryAndCatch(async (req, res, next) => {
  let Order = await OrderModel.findByIdAndUpdate(
    req.body._id,
    { doneMony: true },
    { new: true }
  );
  res.status(200).json({ message: "success", Order });
});
// get order done mony
exports.doneMony = createTryAndCatch(async (req, res, next) => {
  let Order = await OrderModel.find({ doneMony: true }).populate(
    "productOrder userId",
    "-__v -_id -confirmEmail -email -password"
  );
  if (Order.length == 0)
    return res.status(201).json({ message: "لا يوجد منتجات", Order });
  res.status(200).json({ message: "success", Order });
});
// get order not  done mony
exports.notDoneMony = createTryAndCatch(async (req, res, next) => {
  let mony = await OrderModel.find({ doneMony: false });
  res.status(200).json({ message: "success", mony });
});
// delete order from owner
exports.deleteDoneMony = createTryAndCatch(async (req, res, next) => {
  let mony = await OrderModel.deleteMany({
    doneMony: true,
    done: true,
    manDopBoolean: true,
  });
  res.status(200).json({ message: "success", mony });
});
// sending  manDop
exports.manDop = createTryAndCatch(async (req, res, next) => {
  let Order = await OrderModel.findByIdAndUpdate(
    req.body._id,
    { manDop: req.body.manDop, manDopBoolean: false },
    { new: true }
  );
  res.status(200).json({ message: "success", Order });
});
// get order to sending manDop
exports.getSendingManDop = createTryAndCatch(async (req, res, next) => {
  let Order = await OrderModel.find({ manDopBoolean: false }).populate(
    "productOrder userId",
    "-__v -_id -confirmEmail -email -password"
  );

  if (Order.length == 0)
    res.status(200).json({ message: "لا يوجد اوردرات", Order });
  res.status(200).json({ message: "success", Order });
});
