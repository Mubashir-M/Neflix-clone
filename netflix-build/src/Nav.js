import React from 'react';
import'./Nav.css'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
function Nav() {
const [show, setShow] = useState(false);
const history = useHistory();

const transitionNavBar = () => {
  if (window.scrollY > 100){
    setShow(true);
  } else {
    setShow(false);
  }
}

useEffect(()=> {
  window.addEventListener("scroll", transitionNavBar);
  return () => window.removeEventListener ("scroll", transitionNavBar);
},[])

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className = "nav__contents">
        <img 
          className="nav__logo" 
          src = "https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" 
          alt="netflix-logo"
          onClick = {() => history.push("/")}
        />
        <img 
          className="nav__avatar" 
          src ="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
          alt="avatar"
          onClick = {() => history.push("/profile")}
        />
      </div>
    </div>
  );
}

export default Nav;