const { connect } = require("mongoose");
module.exports.dbConnect = () => {
  connect(process.env.dbConnection)
    .then(() => {
      console.log("mongoDb is running");
    })
    .catch((err) => console.log(`error in mongoDb ${err}`));
};
