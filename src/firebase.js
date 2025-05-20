import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyBGE1RZAffQR4OvjhsxtuvdTbNg-dzWbZw",
    authDomain: "todoist-tut-1b144.firebaseapp.com",
    databaseURL: "https://todoist-tut-1b144-default-rtdb.firebaseio.com",
    projectId: "todoist-tut-1b144",
    storageBucket: "todoist-tut-1b144.firebasestorage.app",
    messagingSenderId: "808747683793",
    appId: "1:808747683793:web:57efeb6e416e909c031af0"
});

export { firebaseConfig as firebase };
