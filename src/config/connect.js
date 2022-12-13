const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect(
      process.env.database_url ||
        "mongodb+srv://hoangphan:Ke1ZdPsc5I50NE0x@cluster0.sxtlxbo.mongodb.net/final-project?retryWrites=true&w=majority"
    )
    .then(() => console.log("========= connect successfully ========="))
    .catch((err) => console.log("--------- connect fail ---------" + err));
};

module.exports = connect;
