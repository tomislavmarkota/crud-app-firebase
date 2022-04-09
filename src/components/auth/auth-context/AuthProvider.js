import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, {useContext, useEffect, useState} from 'react'
import { auth } from '../../firebase'


const AuthContext = React.createContext();

export const useAuth = () => {return useContext(AuthContext)};


export default function AuthProvider({children}) {
  const [currentUser, setUser] = useState();
  
  const createAcc = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  
  const login = (email, password) => {
    return  signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth);
  }
  
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      setUser(user);
    })
    return unsub;
  }, [])
  

  const value = {
    createAcc,
    login,
    logout,
    currentUser
  }

  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
