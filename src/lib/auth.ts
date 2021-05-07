import { auth, Firebase as firebase } from "./firebase"

export const login = async () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  return await firebase.auth().signInWithPopup(provider)
}

export const listenAuthState = (dispatch: any) => {
  return 
}