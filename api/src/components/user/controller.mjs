import moment from 'moment'

import { firestore } from '../../firebase'
import { COMPANY_DOMAIN } from '../../config'
import { UNAUTHORIZED_ACCESS, USER_ALREADY_EXISTS } from '../../errors'
import { EntryController } from '../entry'
import User, { UserRole } from './models'

export default class UserController {
  constructor() {
    this.collection = firestore.collection('users')
    this.entryController = new EntryController()
  }

  static convertUser(data) {  
    return new User(
      data.name,
      data.email,
      UserRole[data.role],
      data.avatar,
      data.id,
      moment(data.createdAt),
      data.nickname
    )
  }

  /**
   * Fetch users from the database.
   */
  async users() {
    const documents = await this.collection.get()

    const allUsers = []
    documents.forEach(doc =>
      allUsers.push(UserController.convertUser({ id: doc.id, ...doc.data() })))

    return allUsers
  }

  async user(userId) {
    const docRef = await this.collection.doc(userId).get()
    if (!docRef.exists) return null
    return UserController.convertUser({ id: docRef.id, ...docRef.data() })
  }

  async userByEmail(email) {
    const snapshot = await this.collection.where("email", "==", email).limit(1).get()

    const users = []
    snapshot.forEach(docRef => {
      users.push({ id: docRef.id, ...docRef.data() })
    })

    const userObj = users.length > 0 && UserController.convertUser(users[0])
    if (userObj) {
      const currentEntry = await this.weeklyEntry(userObj)
      userObj.currentEntry = currentEntry
    }

    return userObj
  }

  async weeklyEntry(userObj) {
    const fromDate = moment().startOf('isoWeek')
    const toDate = moment().endOf('isoWeek')

    const entryObjs = await this.entryController.entries({
      userName: userObj.name,
      fromDate,
      toDate
    })
    return entryObjs.length && entryObjs[0]
  }

  async newUser(name, email, avatar) {
    const emailParts = email.split("@", 2)
    const emailDomain = emailParts[emailParts.length - 1]

    if (emailDomain !== COMPANY_DOMAIN) {
      throw { name: UNAUTHORIZED_ACCESS, message: `Email needs to match ${COMPANY_DOMAIN}` }
    }

    const existingUser = await this.userByEmail(email)
    if (existingUser) {
      throw { name: USER_ALREADY_EXISTS, message: 'User already exists' }
    }

    const newUser = new User(
      name,
      email,
      UserRole.STANDARD,
      avatar,
      null,
      moment()
    )
    await this.collection.add(newUser.toDynamo())
    const userObj = await this.userByEmail(email)
    return userObj
  }

  async updateUser(id, fields) {
    await this.collection.doc(id).update(fields)
    const userObj = await this.user(id)
    return userObj
  }
}
