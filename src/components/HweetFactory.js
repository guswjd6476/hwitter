import React, {useState, useRef} from "react";
import { dbService, storageService } from "fbase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadString} from "@firebase/storage";
import { addDoc, collection} from "firebase/firestore"

const HweetFactory = ({userObj}) =>{
    const [hweet, setHweet] = useState()
    const [attachment, setAttachment] = useState("")
    const onSubmit = async (event)=> {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = ref(storageService, `${userObj.uid}/${v4()}`);
            const uploadFile = await uploadString(attachmentRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(uploadFile.ref);
        }
        const hweetObj = {
            text : hweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
            };
            await addDoc(collection(dbService, "hweet"), hweetObj);
            setHweet("");
            setAttachment("");
        // await dbService.collection("hweet").add({
        //     text:hweet,
        //     createdAt : Date.now(),
        //     creatorId : userObj.uid,
        // })
        // setHweet("")
    }
    const onChange = (event) => {
        const {
            target : {value}
        } = event
        setHweet(value)
    }
    const onChangeFile = (event) =>{
        const {
            target: {files},
        } = event;
        const theFile = files[0]
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
              } = finishedEvent;
            setAttachment(result)
        }
        reader.readAsDataURL(theFile)
    }
    const onClearAttachment = () => {
        setAttachment("");
        fileInput.current.value = "";
    }
    const fileInput = useRef();
    return (
            <form className="new_hweet" onSubmit={onSubmit}>
                 <div className="inputbox">
                    <input value={hweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}/>
                </div>
                <div className="btn_wrap">    
                    <div className="filebox btn_sub">파일첨부
                        <input className="fileinput" type="file" accept="image/*" onChange={onChangeFile}  ref={fileInput}/>
                    </div>
                    <div >    
                        <input className="btn_sub" type="submit" value="hweet"/>
                    </div>
                </div>    
                {attachment && (
                    <div className="attachbox">
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
            </form>
    )
}

export default HweetFactory