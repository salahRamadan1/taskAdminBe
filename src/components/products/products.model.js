const { Schema, Types, SchemaTypes, model } = require("mongoose");
const schema = new Schema({
  // اسم المنتج
  productName: {
    type: String,
    required: [true, "product is required"],
    trim: true,
  },
  productTitle: {
    type: String,
 
    trim: true,
  },
  // سعر النهائي للبيع
  productPriceFinal: {
    type: Number,
    default: 1,
  },
  userId:{
    type:Types.ObjectId,
    ref:'User'
  },
  product_Pic:{
    type:String
  }
});

schema.post("init", (doc) => {
  doc.product_Pic = `http://localhost:3000/` + doc.product_Pic;
});
module.exports = model("product", schema);
