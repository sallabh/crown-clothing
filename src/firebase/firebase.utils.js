import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCuVtwvZm9B1cbyBsQa39yWw0g-mxXFakU",
    authDomain: "crown-db-3deba.firebaseapp.com",
    databaseURL: "https://crown-db-3deba.firebaseio.com",
    projectId: "crown-db-3deba",
    storageBucket: "",
    messagingSenderId: "832130415442",
    appId: "1:832130415442:web:e49c102962a82aa6"
  };

export const createUserProfileDocument = async (userAuth,additionalData) => {
	if(!userAuth) return;
	
	const userRef = firestore.doc(`users/${userAuth.uid}`);
	
	const snapShot =  await userRef.get();
	
	if(!snapShot.exists) {
		const { displayName, email} = userAuth;
		const createdAt = new Date();
		
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			})
		} catch (error){
			console.log('error creating user',error.message);
		}
	}
	
	return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider).then(function(result){
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
	console.log(token);
   var user = result.user;
	console.log(user);
	}).catch(function(error) {
	// Handle Errors here.
  var errorCode = error.code;
	console.log(errorCode);
  var errorMessage = error.message;
	// The email of the user's account used.
	console.log(errorMessage);
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
	console.log(email);
  var credential = error.credential;
	console.log(credential);
  // ...
});

export default firebase;