import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCovXD_U2I9z_qs-G-R50G8SOfjRzXZHDQ',
  authDomain: 'movie-explore-8170b.firebaseapp.com',
  projectId: 'movie-explore-8170b',
  storageBucket: 'movie-explore-8170b.appspot.com',
  messagingSenderId: '716413718113',
  appId: '1:716413718113:web:9bc6bdc04b9255e56d6420',
  measurementId: 'G-STP6D5EGDC'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

export default app
