import React, {createContext, useContext, useEffect, useState} from 'react';
import { signInWithPopup ,GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../Firebase/Firebase";

const authContext = createContext();

export function UserAuthContextProvider({children}) {

    const [user, setUser] = useState({});

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function doSignOut() {
       return signOut(auth);
    }

    function googleSignIn() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth ,provider);        
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }



    useEffect(() => {
      const unSub = onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser);
      });
    
      return () => {
        unSub();
      }
    }, [])
    

    const values = {
        user,
        signUp,
        login,
        doSignOut,
        googleSignIn,
        resetPassword
    }


    
    return (
        <authContext.Provider value={values}>
            {children}
        </authContext.Provider>
    )
}

export function useUserAuth() {
    return useContext(authContext);
}