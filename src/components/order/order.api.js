const { auth } = require("../../utils/auth");
const {
  addOrder,
  getOrder,
  doneOrder,
  getOrderForOwnerNotBuyUntilNow,
  getOrderForOwnerBuy,
  deleteOrder,
  updateMony,
  doneMony,
  notDoneMony,
  deleteDoneMony,
  updateOrder,
  updateOrderToBuy,
  manDop,
  getSendingManDop,
  getOrderPru,
} = require("./order.service");

const app = require("express").Router();
// manDop
app.route('/manDop').patch(  manDop).get(getSendingManDop)
// owner
app
  // not sold
  .get("/getOrderForOwner", getOrderForOwnerNotBuyUntilNow)
  // sold
  .get("/getOrderForOwnerBuy", getOrderForOwnerBuy)
  // mony is done
  .get("/doneMony", doneMony)
  // mony do not don
  .get("/notDoneMony", notDoneMony)
  // update mony
  .patch("/updateMony", updateMony)
  .delete("/deleteDoneMony", deleteDoneMony)
// user
app.use(auth);
app
  .route("/")
  .post(addOrder)
  .get(getOrder)
  .patch(doneOrder)
  .delete(deleteOrder);
app
  .patch("/updateOrderCount", updateOrder)
  .patch("/updateOrderToBuy", updateOrderToBuy).get('/getOrderPru',getOrderPru)
  module.exports = app;
