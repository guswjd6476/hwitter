import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { updateProfile } from "@firebase/auth";
import { authService, dbService } from "../fbase";

export default({refreshUser, userObj})=> {
    let navigate = useHistory()
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    };
    const onChange = (event) => {
       const { target : {value},
    } = event;
    setNewDisplayName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await updateProfile(authService.currentUser, { displayName: newDisplayName });
            refreshUser();
            }
    }

    const getMyHweets = async() => {
        const hweets = await dbService.collection("hweet").where("creatorId", "==", userObj.uid).orderBy("createdAt").get();
        console.log(hweets.docs.map((doc)=>doc.data()))
    };
    useEffect(()=>{
        getMyHweets()
    },[])
    return (
        <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" placeholder="Display neme" value={newDisplayName} />
                <input type="submit" value="Update profile" />
            </form>
            <button onClick={onLogOutClick}>Logout</button>
        </>
    )
} 