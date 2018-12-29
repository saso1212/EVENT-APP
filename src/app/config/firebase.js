import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig={
    apiKey: "AIzaSyCGRcouQBVdIJlHAGr2pNmjllnI1zWmsZ4",
    authDomain: "revents-d5dca.firebaseapp.com",
    databaseURL: "https://revents-d5dca.firebaseio.com",
    projectId: "revents-d5dca",
    storageBucket: "revents-d5dca.appspot.com",
    messagingSenderId: "953234997206"
}

firebase.initializeApp(firebaseConfig);
const firestore=firebase.firestore();
const settings = { timestampsInSnapshots: true};
  firestore.settings(settings);

export default firebase;
