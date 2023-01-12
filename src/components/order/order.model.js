const { Schema, Types, SchemaTypes, model } = require("mongoose");
// cart
const schema = new Schema({
  productOrder: {
    type: Types.ObjectId,
    ref: "product",
  },
  userId: {
    type: Types.ObjectId,
    ref: "User",
  },
  count:{
    type:Number,
    default:1
  },
  price:{
    type:Number,
  },
 
  done: {
    type: SchemaTypes.Boolean,
  },  
  doneMony:{
    type: SchemaTypes.Boolean,
    default: false,
  },
   manDop:{
    type:String
   },
   manDopBoolean:{
    type: SchemaTypes.Boolean, 
    default:true
   }

},{timestamps:true});
module.exports = model("order", schema);
