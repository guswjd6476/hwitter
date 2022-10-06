import { dbService, storageService } from "fbase";
import React, { useEffect, useState, useRef} from "react";
import Hweet from "components/Hweet";
import HweetFactory from "components/HweetFactory";

const Home = ({userObj}) => {
    
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
    return(
        <div>
            <HweetFactory userObj={userObj}/>
            <div>
                {hweets.map((hweet) => (
                    <Hweet key={hweet.id} hweetObj={hweet} isOwner={hweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
    )
}


export default Home