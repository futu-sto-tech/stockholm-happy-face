import moment from 'moment'

import { firestore } from '../../firebase'
import Response from './models'

export default class ResponseController {
  constructor() {
    this.userCollection = firestore.collection('users')
    this.collection = firestore.collection('responses')
  }

  static convert(data) {
    return new Response(
      data.link,
      data.text,
      data.userName,
      data.userId,
      data.id,
      moment(data.createdAt)
    )
  }

  async response(id) {
    const doc = await this.collection.doc(id).get()
    const responseData = doc.data()
    const responseObj = ResponseController.convert({ id: doc.id, ...responseData })
    return responseObj
  }

  async responses({ userName, fromDate, toDate }) {
    let query = this.collection

    if (userName) {
      query = query.where('userName', '==', userName)
    }

    if (fromDate && toDate) {
      query = query
        .where('createdAt', '>', +fromDate)
        .where('createdAt', '<', +toDate)
    }

    const snapshot = await query.get()
    let responseObjs = []
    snapshot.forEach(doc =>
      responseObjs.push(ResponseController.convert({ id: doc.id, ...doc.data() })))

    return responseObjs
  }

  async newResponse(userObj, link = null, text = null) {
    const newResponse = new Response(
      link,
      text,
      userObj.name,
      userObj.id,
      null,
      +moment()
    )
    const newData = newResponse.toDynamo()
    newData.userRef = this.userCollection.doc(newResponse.user.id)
    const docRef = await this.collection.add(newData)

    const responseObj = await this.response(docRef.id)
    return responseObj
  }

  async deleteResponse(id) {
    const responseObj = await this.response(id)
    await this.collection.doc(id).delete()
    return responseObj
  }
}
