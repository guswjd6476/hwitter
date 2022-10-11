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
            <div className="hweetbox">
                <form className="profilebox" onSubmit={onSubmit}>
                    <input className="input" onChange={onChange} type="text" placeholder="Display neme" value={newDisplayName} />
                    <input className="btn_sub" type="submit" value="Update" />
                    <button className="btn_sub" onClick={onLogOutClick}>Logout</button>
                </form>
            </div>     
        </>
    )
} 