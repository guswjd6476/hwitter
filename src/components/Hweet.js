import React, { useState } from "react";
import { dbService, storageService } from "fbase";

const Hweet = ({ hweetObj, isOwner }) => {
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
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newHweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Hweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{hweetObj.text}</h4>
          {hweetObj.attachmentUrl && <img src={hweetObj.attachmentUrl} width="100px" height="100px" />}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Hweet</button>
              <button onClick={toggleEditing}>Edit Hweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Hweet