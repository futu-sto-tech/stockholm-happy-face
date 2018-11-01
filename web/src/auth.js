import firebase from "firebase/app";
import "firebase/auth";

import publicRuntimeConfig from "./config";
import User from "./models/user";

var config = {
  apiKey: publicRuntimeConfig.API_KEY,
  authDomain: publicRuntimeConfig.AUTH_DOMAIN
};
!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

const provider = new firebase.auth.GoogleAuthProvider();

/**
 * Sign in the user using Firebase and Google Sign-in
 * @returns {User} - User object
 */
export const signIn = async () => {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  const result = await firebase.auth().signInWithPopup(provider);
  const { displayName, email, photoURL } = result.user;
  return new User(displayName, email, photoURL);
};

export const getCurrentUser = () => {
  const currentUserData = firebase.auth().currentUser;
  if (currentUserData) {
    const { displayName, email, photoURL } = currentUserData;
    return new User(displayName, email, photoURL);
  }
};

export default firebase;
