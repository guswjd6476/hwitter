import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { updateProfile } from "@firebase/auth";

const Hweet = ({userObj, hweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newHweet, setHewNweet] = useState(hweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      await dbService.doc(`hweet/${hweetObj.id}`).delete();
      await storageService.refFromURL(hweetObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`hweet/${hweetObj.id}`).update({
      text: newHweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setHewNweet(value);
  };
  return (
    <div className="hweetbox">
       <span className="username">{userObj.displayName}</span>
      {editing ? (
        <>
          <form  onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newHweet}
              required
              onChange={onChange}
            />
            <div className="btn_wrap">
              <input className="btn_sub" type="submit" value="수정" />
              <button className="btn_sub" onClick={toggleEditing}>취소</button>
            </div>  
          </form>
          
        </>
      ) : (
        <>
        {isOwner && (
            <>
              <div className="btn_wrap">
                <button className="mini_btn" onClick={toggleEditing}>
                  <img src={process.env.PUBLIC_URL + `/img/edit.png`} alt="" />
                </button>
                <button className="mini_btn"  onClick={onDeleteClick}>
                  <img src={process.env.PUBLIC_URL + `/img/delet.png`} alt="" />
                </button> 
              </div>
            </>
          )}
          <h4 className="hweet_text">{hweetObj.text}</h4>
          {hweetObj.attachmentUrl && <img src={hweetObj.attachmentUrl} width="100px" height="100px" />}
        </>
      )}
    </div>
  );
};

export default Hweet