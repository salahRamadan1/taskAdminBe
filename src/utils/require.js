exports.allReq = (app) => {
  app.use("/Products", require("../components/products/products.Api"));
  app.use("/users", require("../components/user/user.Api"));
  app.use("/orders", require("../components/order/order.api"));
};
