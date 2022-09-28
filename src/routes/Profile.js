import React from "react";
import { useHistory } from 'react-router-dom';
import { authService } from "../fbase";

export default()=> {
    let navigate = useHistory()
    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    };
    return (
        <>
            <button onClick={onLogOutClick}>Logout</button>
        </>
    )
} 