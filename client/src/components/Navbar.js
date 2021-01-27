import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const history =useHistory()
  const [link, setLink] = useState(true)
  const [isOpen, setOpen] = useState(false)

  const {state,dispatch}=useContext(UserContext)
  const renderList=()=>{
    if(state){
      return[
        <li>
        <Link to="/profile">Profile</Link>
      </li>,
      <li>
        <Link to="/create">CreatePost</Link>
      </li>,
      <li>
        <Link to="/myfollowingpost">MyFollowingPost</Link>
      </li>,
      <li>
         <button className="btn #d50000 red accent-4"
        onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          history.push("/signin")
        }}
        >Logout</button>
      </li>
      ]
    }else{
      return[
        <li>
        <Link to="/signin">Signin</Link>
      </li>,
      <li>
        <Link to="/signup">Signup</Link>
      </li>
      ]
    }
  }
  return (
    <div className="nav" id={link?"h-res":""}>
    <div className="navleft">
    <Link to={state?"/":"/signin"} className="brand-logo left">
    <h1>Social media</h1>
  </Link>
    </div>
    <div className="navright" id={link?"v-res":""}>
      <ul>
        {renderList()}
      </ul>
    </div>
    <div className="burger" onClick={()=>setLink(!link)}>
    <i class="material-icons" toggled={isOpen} toggle={setOpen}>dehaze</i>
    </div>
  </div>
  );
};

export default Navbar;


