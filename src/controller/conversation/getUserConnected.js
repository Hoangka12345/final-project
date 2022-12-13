const { default: mongoose } = require('mongoose');
const { msgErrDatabase, msgSucces, msgErrNoInfo } = require('../../constants');
const userModel = require('../../models/user.model');
const ObjectId = mongoose.Types.ObjectId
const getUserConnect = async (req, res) => {
    const id = req.id
    try {
        const test = await userModel.aggregate([
            { $match: { _id: ObjectId(id) } },
            {
                // ------- join conversation ----------
                $lookup: {
                    from: 'conversations',
                    let: { 'id': '$_id' },
                    pipeline: [
                        { $match: { $expr: { $in: ['$$id', "$userId"] } } },
                        // ------ unwind userId, get userId of receiver and join to user table --------
                        { $unwind: '$userId' },
                        { $match: { $expr: { $ne: ['$userId', ObjectId(id)] } } },
                        {
                            $lookup: {
                                from: "users",
                                let: { userId: '$userId' },
                                as: 'user',
                                pipeline: [
                                    { $match: { $expr: { $eq: ['$_id', "$$userId"] } } },
                                    { $project: { username: 1, avatar: 1, role: 1, } }
                                ]
                            }
                        },
                        // ------ merge user to conversation ---------
                        { $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$user", 0] }, "$$ROOT"] } } },
                        { $project: { user: 0 } },
                        // ------ sort by message last ----------
                        {
                            $sort: {
                                updatedAt: -1
                            }
                        }
                    ],
                    as: 'conversation'
                }
            }, { $project: { username: 1, avatar: 1, role: 1, conversation: 1 } }
        ]).exec()
        if (!test[0])
            return res.status(204).send({ ...msgErrNoInfo })
        res.status(200).send({ ...msgSucces, test })

    } catch (err) {
        res.status(500).send({ ...msgErrDatabase, err })

    }
}

// {
//     $project: {
//         receiverId: {
//             $filter: {
//                 input: '$userId',
//                 as: 'userId',
//                 cond: { $ne: ['$$userId', ObjectId(id)] }
//             }
//         }, messages: 1
//     }
// },
module.exports = {
    getUserConnect
};
