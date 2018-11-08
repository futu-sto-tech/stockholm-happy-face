const moment = require("moment");

const { firestore } = require("../../firebase");
const { Entry } = require("./models");

class EntryController {
  constructor() {
    this.userCollection = firestore.collection("users");
    this.collection = firestore.collection("entries");
  }

  static convert(data) {
    return new Entry(
      data.link,
      data.text,
      data.userName,
      data.userId,
      data.id,
      moment(data.createdAt)
    );
  }

  async entry(id) {
    const doc = await this.collection.doc(id).get();
    const entryData = doc.data();
    const entryObj = EntryController.convert({ id: doc.id, ...entryData });
    return entryObj;
  }

  async entries({ userName, fromDate, toDate }) {
    let query = this.collection;

    if (userName) {
      query = query.where("userName", "==", userName);
    }

    if (fromDate && toDate) {
      query = query
        .where("createdAt", ">", +fromDate)
        .where("createdAt", "<", +toDate);
    }

    const snapshot = await query.get();
    let entryObjs = [];
    snapshot.forEach(doc =>
      entryObjs.push(EntryController.convert({ id: doc.id, ...doc.data() }))
    );

    return entryObjs;
  }

  async newEntry(userObj, link = null, text = null) {
    const newEntry = new Entry(
      link,
      text,
      userObj.name,
      userObj.id,
      null,
      +moment()
    );
    const newData = newEntry.toDynamo();
    newData.userRef = this.userCollection.doc(newEntry.user.id);
    const docRef = await this.collection.add(newData);

    const entryObj = await this.entry(docRef.id);
    return entryObj;
  }

  async deleteEntry(id) {
    const entryObj = await this.entry(id);
    await this.collection.doc(id).delete();
    return entryObj;
  }
}

module.exports = { EntryController };
