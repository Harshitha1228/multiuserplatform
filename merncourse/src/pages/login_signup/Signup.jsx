import React, {useState} from 'react';
import { Link, Navigate } from "react-router-dom";


const Signup = () => {
  const [username, setusername] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const onSubmit = async(e) => {
    e.preventDefault()
    try {
      const sendSign = await fetch (`http://localhost:3000/user/signup`,{
        method:"POST",
        headers:{
          'content-Type':"application/json"
        },
        body:JSON.stringify({username,email,password})
      })
      const response = await sendSign.json();

      if(sendSign.ok){
        alert("Registration successful");
        Navigate("/")
        console.log(response)
      }else{
        alert("Registration failed");
      }

    }catch (error){
     console.log(error);
    }
  }

    return (
      <div>
      <div>
        <h1>Signup</h1>
        <div>
          <input type="Username" 
          name="Username" 
          id="" 
          placeholder="Username" 
          onChange={(e) => setusername(e.target.value)}/>
          <input 
          type="email" 
          name="email" 
          id="" 
          placeholder="Email" 
          onChange={(e) => setemail(e.target.value)}/>
          <input 
          type="password" 
          name="password" 
          id=""
          placeholder="password" 
          onChange={(e) => setpassword(e.target.value)}/>
          <button onClick = {onSubmit} >submit</button>
        </div>
      <div>
        <p>
           Already a user?<Link to="/Login">Login</Link>
         </p>
      </div>
      </div>
    </div>
    )};

export default Signup;