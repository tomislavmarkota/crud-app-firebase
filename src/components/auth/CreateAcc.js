import React, {useRef, useState } from 'react'
import { useAuth } from './auth-context/AuthProvider'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';


export default function CreateAcc() {
  const { createAcc } = useAuth();
  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();
  const navigate = useNavigate();
  const [txt, setTxt] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const num = new RegExp('(?=.*[0-9])');
    const specialChar = new RegExp('(?=.*[!#$+-])');
    const minLength = new RegExp('(?=.{6,})');
    
    if(txt.match(num) && txt.match(minLength) && txt.match(specialChar)){
      if(passRef.current.value === confirmPassRef.current.value){
        try{ await
          createAcc(emailRef.current.value, passRef.current.value)
          navigate("/dashboard");
        }catch(err){
          console.log(err)
        }
      }else{
        alert("Enter correct password in the confirm password field")
      }
      
    }else{ 
      alert("Your password must be atleast 6 characters long including a number and special character !,#,$,+,-")
    }
  }

  const handleChange = (e) => {
    setTxt(e.target.value);  
         
  }


  return (
    <div className='align-center'>
      <div className='auth-card'>
        <h1>Create an account</h1>
        <form onSubmit={handleSubmit}>
          <input ref={emailRef} type="email" placeholder="Enter your email" required/>
          <input onChange={handleChange} ref={passRef} type="text" placeholder="Enter your password" required/>
          <input ref={confirmPassRef} type="password" placeholder="Confirm your password" required/>
          <input type="submit"/>
        </form> 
        <span>Already have an account ? <Link to="/login">Login</Link></span>
      </div>
    </div> 
  )
}
