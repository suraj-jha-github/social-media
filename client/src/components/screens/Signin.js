import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import M from 'materialize-css'
import { UserContext } from "../../App";

const Signin = () => {
  const {state,dispatch}=useContext(UserContext)
  const history =useHistory()
  
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const PostData=()=>{
    if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html:"Invalid email",classes:"#d50000 red accent-4"})
      return
    }
    fetch("/signin",{
      method:"post",
      headers:{
        "Content-Type":"application/json"

      },
      body:JSON.stringify({
        
        password,
        email

      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data)
      if(data.error){
        M.toast({html:data.error,classes:"#d50000 red accent-4"})

      }
      else{
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        dispatch({type:"USER",payload:data.user})
        M.toast({html:"signed in successfully",classes:"#1b5e20 green darken-4"})
        history.push('/')
      }
    }).catch(err=>{
      console.log(err)
    })
  }
  return (
    <div className="my-card" >
      <div className="card auth-card input-field">
        <h2>Social Media</h2>
        <input type="text" placeholder="email" 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        <input type="password" placeholder="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        <button className="btn waves-effect waves-light #880e4f pink darken-4"
        onClick={()=>PostData()}
        >Signin</button>
        <h5 >
        Don't have have an account ?
            <Link to="/signup" >
             <span style={{color:"blue"}} > Click here</span>
            </Link>
        </h5>
      </div>
    </div>
  );
};

export default Signin;
