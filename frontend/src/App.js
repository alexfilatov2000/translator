import React from "react";
import "./App.css"
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Login from "./components/auth/login";
import Register from "./components/auth/register";
import RegisterVerify from "./components/auth/registerVerify";
import Toolbar from "./components/toolbar/toolbar";
import NotFound from "./components/utils/notfound";
import Home from "./components/home/home";
import Profile from "./components/home/Profile"
import Settings from "./components/users/settings";
import {RouteClient} from "./components/utils/route";

function App(){
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Toolbar/>}/>
                </Routes>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route exact path="/login" element={<Login/>}/>
                    <Route exact path="/register" element={<Register/>}/>
                    <Route exact path="/verify-email/:token" element={<RegisterVerify/>}/>
                    <Route exact path="/settings" element={<Settings/>}/>
                    <RouteClient exact path="/profile" element={<Profile/>}/>
                    <Route exact path="/404" element={<NotFound/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
