import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import Hweet from "components/Hweet";

const Home = ({userObj}) => {
    const [hweet, setHweet] = useState()
    const [hweets, setHweets] = useState([])
    useEffect(() => {
        dbService.collection("hweet").onSnapshot((snapshot) => {
          const nweetArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setHweets(nweetArray);
        });
      }, []);
    const onSubmit = async (event)=> {
        event.preventDefault()
        await dbService.collection("hweet").add({
            text:hweet,
            createdAt : Date.now(),
            creatorId : userObj.uid,
        })
        setHweet("")
    }
    const onChange = (event) => {
        const {
            target : {value}
        } = event
        setHweet(value)
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input value={hweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}/>
                <input type="submit" value="hweet"/>
            </form>
            <div>
                {hweets.map((hweet) => (
                    <Hweet key={hweet.id} hweetObj={hweet} isOwner={hweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
    )
}


export default Home