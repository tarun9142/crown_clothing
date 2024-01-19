import { createContext, useState , useEffect } from "react";
import { onAuthStateChangedListener } from "../utils/firebase.utils";
import { createUserDocumentFromAuth } from "../utils/firebase.utils";

export const UserContext = createContext({
    currentUser : null,
    setCurrentUser : ()=>null
});

export const UserProvider = ({children})=>{
    const [currentUser,setCurrentUser] = useState(null);
    const value = {currentUser,setCurrentUser};

    useEffect(()=>{
        const unsubsscribe = onAuthStateChangedListener((user)=>{
            if(user){
                createUserDocumentFromAuth(user)
            }
            setCurrentUser(user)
        });
        return unsubsscribe;
    },[])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}