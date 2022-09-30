import { dbService } from "fbase";
import React, { useState } from "react";

const Home = () => {
    const [hweet, setHweet] = useState()
    const onSubmit = async (event)=> {
        event.preventDefault()
        await dbService.collection("hweet").add({
            hweet,
            createdAt : Date.now()
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
        </div>
    )
}


export default Home