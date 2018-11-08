const { EntryController } = require("./controller");
const { UserController } = require("../user/controller");

const controller = new EntryController();
const userController = new UserController();

exports.getEntry = async (req, res) => {
  const entryId = req.params.id;
  const entryObj = await controller.entry(entryId);
  res.json({ entry: entryObj.toJSON() });
};

exports.getEntries = async (req, res) => {
  const userName = req.query.userName;
  const entryObjs = await controller.entries({ userName });
  res.json({ entries: entryObjs.map(entry => entry.toJSON()) });
};

exports.postEntry = async (req, res) => {
  const { userId, link, text } = req.body;
  const userObj = await userController.user(userId);
  const entryObj = await controller.newEntry(userObj, link, text);
  res.json({ entry: entryObj.toJSON() });
};

exports.deleteEntry = async (req, res) => {
  const entryId = req.params.id;
  const entryObj = await controller.deleteEntry(entryId);
  res.json({ entry: entryObj.toJSON() });
};

exports.getLatestWeek = async (req, res) => {
  const startOfWeek = moment()
    .week()
    .day("Monday")
    .startOf("day");
  const endOfWeek = moment(startOfWeek).add("7", "days");
};
