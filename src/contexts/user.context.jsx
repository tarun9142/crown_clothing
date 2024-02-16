import { createContext , useEffect, useReducer } from "react";
import { onAuthStateChangedListener } from "../utils/firebase.utils";
import { createUserDocumentFromAuth } from "../utils/firebase.utils";

export const UserContext = createContext({
    currentUser : null,
    setCurrentUser : ()=>null
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER:"SET_CURRENT_USER"
}
const userReducer = (state,action)=>{
    const {type, payload} = action;
    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return{
                ...state,
                currentUser : payload
            } 
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}

const INITIAL_STATE = {
    currentUser : null
}
export const UserProvider = ({children})=>{

    const [{currentUser }, dispatch] = useReducer(userReducer,INITIAL_STATE)
    
    const setCurrentUser = (user)=>{
        dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user})
    }

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