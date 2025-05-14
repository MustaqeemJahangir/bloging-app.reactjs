import React, { useRef } from "react";

import { signInWithEmailAndPassword,getAuth  } from "firebase/auth";
import { app } from "../config-files/firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../index.css'

function Login() {

    const email=useRef()
    const password=useRef()
    const navigate = useNavigate()

    function loginPage() {

    const auth = getAuth(app);
        

    signInWithEmailAndPassword(auth, email.current.value, password.current.value)

    .then((userCredential) => {
      
   
      const user = userCredential.user;
      console.log(user)
      navigate('/home')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      
    });
        
    }

    return(
          <div className="main-div">
           <div>
             <h1>user login</h1>
            <input type="email"  placeholder="enter a email" ref={email}/>
            <br /><br />

            <input type="password"  placeholder="enter a password" ref={password}/>

            <br />
            <br />
            <button onClick={loginPage}>submit</button>
            <div>
              <Link to="rejister" className="long">dont have aacount so please sign up</Link>
            </div>
           </div>

        </div>
    )
}

export default Login