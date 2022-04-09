import React, {useRef} from 'react'
import { useAuth } from './auth-context/AuthProvider'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';


export default function Login() {
  const { login, currentUser } = useAuth();
  const emailRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();

    

  const handleLogin = async (e) => {
    e.preventDefault();
    try{ await 
      login(emailRef.current.value, passRef.current.value)
      navigate("/dashboard");
    }
    catch(err){
      console.log(err);
    }
  }
 

  return (
    <div className='align-center'>
      <div className='auth-card'>
        <h1>Login</h1>
        {currentUser?.email}
        <form onSubmit={handleLogin} >
          <input ref={emailRef}  type="email" placeholder="Enter your email"/>
          <input ref={passRef} type="password" placeholder="Enter your password"/>
          <input type="submit" value="Login"/>
        </form>
        <Link to="/">Create your account here</Link>
      </div>
    </div> 
  )
  
}
