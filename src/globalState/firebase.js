import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDzRyptCKNybRhY0aTCTUbyfl_DPEf_GdU',
	authDomain: 'keyspace-2020.firebaseapp.com',
	databaseURL: 'https://keyspace-2020.firebaseio.com',
	projectId: 'keyspace-2020',
	storageBucket: 'keyspace-2020.appspot.com',
	messagingSenderId: '558633008183',
	appId: '1:558633008183:web:9b26b47f39babf43fa93b2',
	measurementId: 'G-68BLJGV8NW',
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export default firebase;
