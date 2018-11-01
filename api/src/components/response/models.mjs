export default class Response {
  /**
   * @param {string} link - URL to linked image/gif
   * @param {string} text - String of smileys
   * @param {string} userName - Name of submitting response
   * @param {string} userId - User ID
   * @param {string} [id] - Response database ID
   * @param {moment} [createdAt] - Date of creation
   */
  constructor(link, text, userName, userId, id = null, createdAt = null) {
    this.link = link;
    this.text = text;
    this.user = {
      id: userId,
      name: userName
    };
    this.id = id;
    this.createdAt = createdAt;
  }

  toJSON() {
    return {
      id: this.id,
      link: this.link,
      text: this.text,
      user: this.user,
      createdAt: this.createdAt,
      week: this.createdAt.week()
    };
  }

  toDynamo() {
    return {
      link: this.link,
      text: this.text,
      userId: this.user.id,
      userName: this.user.name,
      createdAt: +this.createdAt
    }
  }
}
