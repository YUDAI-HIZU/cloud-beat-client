import  Firebase from "firebase/app"
import "firebase/auth"

const config = {
  apiKey: "AIzaSyCQ35LnhgTIB9qJAZvIjVYyvPtU_WImr5A",
  authDomain: "cloud-beat-pro.firebaseapp.com",
  projectId: "cloud-beat-pro",
  storageBucket: "cloud-beat-pro.appspot.com",
  messagingSenderId: "1041574609748",
  appId: "1:1041574609748:web:bf9339233c5bde47bb3ec1",
  measurementId: "G-8QWCNWBQL2"
}

const firebase: Firebase.app.App = Firebase.initializeApp(config)

export default firebase