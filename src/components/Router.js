import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";
import HweetFactory from "./HweetFactory";

const AppRouter =  ({ refreshUser, isLoggedIn, userObj }) => {
    return(
        <Router>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <Switch>
                {isLoggedIn ? (
                <> 
                    <Route exact path="/" base="/">
                        <Home userObj={userObj} refreshUser={refreshUser} />
                    </Route> 
                    <Route exact path="/profile" base="/">
                        <Profile userObj={userObj} refreshUser={refreshUser}/>
                    </Route> 
                    <Redirect from="*" to="/" />
                </> ) : (
                <>
                    <Route exact path="/" base="/"> <Auth /></Route>
                    <Redirect from="*" to="/" />
                </>
            )}
            </Switch>
        </Router>
    )
}

export default AppRouter