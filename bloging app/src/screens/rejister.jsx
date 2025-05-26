import React, { useRef } from "react";
import { createUserWithEmailAndPassword ,getAuth} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../config-files/firebase";
import '../index.css'
import { Link } from "react-router-dom";

import { getFirestore,addDoc,collection } from "firebase/firestore";
function Rejister() {
    let email=useRef()
    let password=useRef()
    let fullname=useRef()

    const naviagte=useNavigate()
    const db = getFirestore(app)
    const auth = getAuth(app);

    let profileImage=" "

    //  picture upload //


function hanlecloud(){
  
    window.cloudinary.openUploadWidget(
      {
        cloudName: "dosgchkzy", // yahan apna cloud name daal
        uploadPreset: "bloging", // yahan upload preset daal (unsigned hona chahiye)
        sources: ["local", "url", "camera"],
        
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Uploaded file URL: ", result.info.secure_url);
           profileImage=result.info.secure_url
        } })
}
// let image=" "
    function userRejister() {


        console.log(email.current.value)
           console.log(password.current.value)

             
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then(async (userCredential) => {
          
          const user = userCredential.user;
          console.log(user)

            const docRef = await addDoc(collection(db, "user"), {
      fullname: fullname.current.value ,
      email:email.current.value,
      uid:user.uid,
      image:profileImage,
      


      });
      console.log(docRef)

          
          naviagte('/')

          
          
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode)
        
        //   console.log(errorMessage)
          // ..
        });



    }




    return(


       <div className="main-div">
         <div >
            <h1>User Rejister</h1>
            <input type="text" autocomplete="off" name="text" class="input" placeholder="Username"ref={fullname}></input>
            {/* <input type="text" placeholder="enter a name " ref={fullname} /> */}
            <br />
            <br />
            <input type="email" autocomplete="off" name="text" class="input" placeholder="Emial"ref={email}></input>

            {/* <input type="email"  placeholder="enter a email" ref={email}/> */}
            <br /><br />
            {/* <input type="password" autocomplete="off" name="password" class="input" placeholder="Password"ref={password}></input> */}
<input type="password" name="text" class="osaman" placeholder="Enter your password!" ref={password}></input>
            {/* <input type="password"  placeholder="enter a password" ref={password}/> */}

            <br />
            <br />
            <button alt="upload pic" id="bhai" onClick={hanlecloud}>
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
<br />
            <button alt="process" id="bhai" onClick={userRejister}>
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
              <Link to="/" className="long">have  account .please login in !</Link>
            </div>

        </div>
       </div>
    )
}

export default Rejister