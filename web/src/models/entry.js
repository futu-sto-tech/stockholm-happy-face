export default class Entry {
  constructor(user, text, link, createdAt, week, id = null) {
    this.user = user;
    this.text = text;
    this.link = link;
    this.createdAt = createdAt;
    this.week = week;
    this.id = id;
  }
}
