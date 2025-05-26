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
    

            {/* <input type="email"  placeholder="enter a email" ref={email}/> */}
            {/* <br /><br /> */}
            <input type="email"  name="text" class="input" placeholder="Username"ref={email}></input>
<br /><br />

            {/* <input type="password"  placeholder="enter a password" ref={password}/> */}
            {/* <input type="pasword"  name="text"  placeholder="password"ref={password}></input> */}
<input type="password" name="text" class="osaman" placeholder="Enter your password!" ref={password}></input>



            <br />
            <br />
               <button alt="process" id="bhai" onClick={loginPage}>
  <i>c</i>
  <i>l</i>
  <i>i</i>
  <i>c</i>
  <i>k</i>
  <i>-</i>
  <i>m</i>
  <i>e</i>
  {/* <i>c</i> */}
  {/* <i></i> */}
</button>
            <div>
              <Link to="rejister" className="long">dont have aacount .please signIn !</Link>
            </div>
           </div>

        </div>
    )
}

export default Login