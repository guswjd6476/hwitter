import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { updateProfile } from "@firebase/auth";
import { authService } from "../fbase";

function App() {
  const [init, setInit] = useState(false)
  const [userObj, setUserObj] = useState(null)
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
        })
      }else{
        setUserObj(null)
      }
      setInit(true)
    })
  },[])
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
    });
  }
  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj}/> : "Initializing...."}
      <footer>&copy; Hwitter {new Date().getFullYear()}</footer>
    </>
  ); 
}

export default App;
