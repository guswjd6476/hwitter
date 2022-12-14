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
        <div className="contain">
          <div className="auth_contain">
              <HweetFactory userObj={userObj}/>
              <div>
                  {hweets.map((hweet) => (
                      <Hweet key={hweet.id} userObj={userObj} hweetObj={hweet} isOwner={hweet.creatorId === userObj.uid}/>
                  ))}
              </div>
          </div>
        </div>
    )
}


export default Home