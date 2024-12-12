import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";


const Login = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const navigate = useNavigate();

  const onSubmit = async(e) => {
    e.preventDefault()
    try {
      const sendSign = await fetch (`http://localhost:3000/user/login`,{
        method:"POST",
        headers:{
          'content-Type':"application/json",
        },
        body:JSON.stringify({email,password}),
      });
      const response = await sendSign.json();

      if(sendSign.ok){
        alert("Login successful");
        navigate("/home")
        localStorage.setItem("token",response.token);
        console.log(response)
      }else{
        alert("User not found");
      }

    }catch (error){
     console.log(error);
    }
  }


  return (
    <div className = {style.hello}>
    <div className = {style.full}> 
      <div className={style.wrapper} >
        <h1 >Login</h1>
        <div className={style.input}>
        <input
         type="Email" 
         name="Email" 
         id="" 
         placeholder="Email" 
         onChange={(e) => setemail(e.target.value)}/>
        <i className = "style.bx bxs-email"></i>
        </div> 
        <div className={style.input}>
        <input 
        type="Password" 
        name="Password" 
        id="" 
        placeholder="Password" 
         onChange={(e) => setpassword(e.target.value)}/>
        <i className = "style.bx bxs-lock-alt"></i>
        </div>
        <button onClick = {onSubmit} className = {style.btn}>Login</button>
        <div className = {style.signup}>
          <p>Create an account? <Link to="/Signup">Signup</Link>
          </p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login;
 