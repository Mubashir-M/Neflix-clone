import firebase from 'firebase';


const firebaseConfig = {
  /// firebaseconfig
  
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth }
export default db;