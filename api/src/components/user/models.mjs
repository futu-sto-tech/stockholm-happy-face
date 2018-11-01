import moment from 'moment'

export const UserRole = Object.freeze({
  STANDARD: 'STANDARD',
  ADMIN: 'ADMIN'
})

/**
 * User class.
 */
export default class User {
  /**
   * @param {string} name - User name
   * @param {string} email - Company email
   * @param {UserRole} role - User role
   * @param {string} avatar - URL to avatar image
   * @param {string} [id] - Database document ID
   * @param {moment} [createdAt] - Date of creation
   * @param {string} [nickname] - Custom nickname
   */
  constructor(name, email, role, avatar, id = null, createdAt = null, nickname = null) {
    this.name = name
    this.email = email
    this.role = role
    this.avatar = avatar

    this.id = id
    this.createdAt = createdAt
    this.nickname = nickname
  }

  /**
   * Convert to JSON serializable object
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      avatar: this.avatar,
      createdAt: this.createdAt,
      nickname: this.nickname
    }
  }

  toDynamo() {
    return {
      name: this.name,
      email: this.email,
      role: this.role,
      avatar: this.avatar,
      createdAt: +this.createdAt,
      nickname: this.nickname
    }
  }
}
