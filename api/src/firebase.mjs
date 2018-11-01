import firebase from 'firebase-admin';

import serviceAccount from '../firebase-admin-cert.json';

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});

export const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

export default firebase
