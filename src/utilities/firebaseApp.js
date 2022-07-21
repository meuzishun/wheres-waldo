import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCkDUn5Z6gvSm-r9yb4UbKNBMxfAlOyUrk',
  authDomain: 'whereswaldo-ea81f.firebaseapp.com',
  projectId: 'whereswaldo-ea81f',
  storageBucket: 'whereswaldo-ea81f.appspot.com',
  messagingSenderId: '462284750954',
  appId: '1:462284750954:web:256577b4667fcb2b190a13',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
