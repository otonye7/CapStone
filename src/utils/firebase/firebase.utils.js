import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD3eBOqWPytr6ovjhMDJEGsD7eRwzC8NUw",
    authDomain: "capstone-a7495.firebaseapp.com",
    projectId: "capstone-a7495",
    storageBucket: "capstone-a7495.appspot.com",
    messagingSenderId: "184375082920",
    appId: "1:184375082920:web:c36bb5aa92c472c94b679d"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
      prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
      const userDocRef = doc(db, 'users', userAuth.uid);
      const userSnapshot = await getDoc(userDocRef);
      if(!userSnapshot.exists()){
          const { displayName, email } = userAuth;
          const createdAt = new Date();
          try {
              await setDoc(userDocRef, {
                  displayName,
                  email,
                  createdAt
              })
          } catch (error){
              console.log(error.message)
          }
      }
      return userDocRef
  }