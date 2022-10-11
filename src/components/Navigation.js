import React from "react";
import {Link} from "react-router-dom"

const Navigation = ({userObj}) => 
<header>
    <nav>
        <ul className="navi">
            <li>
                <Link to="/">
                    <span className="box40">
                        <img src={process.env.PUBLIC_URL + `/img/home.png`}  alt="homelogo" />
                    </span>    
                    <span className="h_btn">Home</span>
                </Link>
            </li>
            <li>
                <Link to="/profile">
                    <span className="box40">
                        <img src={process.env.PUBLIC_URL + `/img/profile.png`}  alt="homelogo" />
                    </span>
                   <span className="h_btn">{userObj.displayName}</span>
                </Link>
            </li>
        </ul>
    </nav>
</header>

export default Navigation