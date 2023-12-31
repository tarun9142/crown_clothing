import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider , createUserWithEmailAndPassword} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBRAbTWuSRa-p2OvrdGllrZfqK04OTxwzI",
    authDomain: "crownclothing-dbs.firebaseapp.com",
    projectId: "crownclothing-dbs",
    storageBucket: "crownclothing-dbs.appspot.com",
    messagingSenderId: "701794381452",
    appId: "1:701794381452:web:5a9df679b287ede99855a9"
};

const FirebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth(FirebaseApp);
export const signinWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth,additionalInfo)=>{
    if(!userAuth)return;
    const userDocRef = doc(db, "users", userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists())
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInfo
            })
        }catch(err){
            console.log("error creating user ",err);
        }
    }
    return userDocRef;
}

export const createAuthUserWithEmailPassword = async (email,password)=>{
    if(!email || !password) return;
    return createUserWithEmailAndPassword(auth,email,password);
}

