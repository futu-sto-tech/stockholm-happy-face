const moment = require("moment");

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
  const startOfWeek = moment().startOf("week");
  const endOfWeek = moment().endOf("week");

  const entriesPromise = controller.entries({
    fromDate: startOfWeek,
    toDate: endOfWeek
  });
  const usersPromise = userController.users();

  const [entries, users] = await Promise.all([entriesPromise, usersPromise]);

  const entryMap = entries.reduce((obj, item) => {
    const jsonItem = item.toJSON();
    obj[jsonItem.user.id] = jsonItem;
    return obj;
  }, {});

  const jsonUsers = users.map(user => {
    const jsonUser = user.toJSON();
    jsonUser.entry = entryMap[jsonUser.id];
    return jsonUser;
  });

  res.json({ users: jsonUsers });
};
