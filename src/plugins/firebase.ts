import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import config from './config';

let app = null;
if (!firebase.apps.length) {
  app = firebase.initializeApp(config);
}

export default firebase