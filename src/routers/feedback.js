const { showFeedback } = require("../controller/feedback/show");
const { addFeedback } = require("../controller/feedback/add");
const { addReply } = require("../controller/feedback/addReply");
const { delFeedback } = require("../controller/feedback/delFeedback");
const { delReply } = require("../controller/feedback/delReply");
const { verify } = require("../verify");

const feedback = require("express")();

feedback.get("/:id", verify, showFeedback);
feedback.post("/add", verify, addFeedback);
feedback.post("/addreply", verify, addReply);
feedback.delete("/delreply/:id", verify, delReply);
feedback.delete("/delfeedback/:id", verify, delFeedback);

module.exports = { feedback };
