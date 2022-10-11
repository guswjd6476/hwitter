import React from "react";
import { authService, firebaseInstance } from "../fbase";
import AuthForm from "components/AuthForm";

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
    <div className="contain">    
        <div className="auth_contain">
            <AuthForm/>
            <div className="btn_social_wrap">
                <button className="btn_social" name="google" onClick={onSocailClick}>구글로 </button> 
                <button className="btn_social" name="github" onClick={onSocailClick}>깃허브로</button>
            </div>
        </div>
    </div>
    )
}
export default Auth