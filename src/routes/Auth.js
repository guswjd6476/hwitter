import React, { useState } from "react";
import { authService, firebaseInstance } from "../fbase";


const Auth = ()=> {
    const onSocailClick = async(event) => {
        const {target:{name}} = event
        let provider
        if(name ==="google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider()
        }else if (name ==="github"){
            provider = new firebaseInstance.auth.GithubAuthProvider()
        }
        await authService.signInWithPopup(provider)
        
    }

    return (
    <div>
        
        <div>
            <button name="google" onClick={onSocailClick}>구글로 </button> 
            <button name="github" onClick={onSocailClick}>깃허브로</button>
        </div>
    </div>
    )
}
export default Auth