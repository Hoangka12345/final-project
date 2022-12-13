const { msgErrDatabase, msgSucces, msgErrMissInfo } = require("../../constants");
const feedbackModel = require("../../models/feedback.model");
const { showTourDetail } = require("../../commonFunc");

const showFeedback = async (req, res) => {
  const id = req.params.id;
  const { feedbackPrepare } = showTourDetail(id);

  try {
    const feedback = await feedbackPrepare.exec();
    res.status(200).send({ ...msgSucces, tour, feedback });
  } catch (error) {
    res.status(500).send({ ...msgErrDatabase, error });
  }
};

module.exports = { showFeedback };
