import React, { useEffect, useRef, useState } from "react";

import { onAuthStateChanged,getAuth ,signOut } from "firebase/auth";
import { app } from "../config-files/firebase";
// import { Firestore, addDoc} from "firebase/firestore";
import { getFirestore,addDoc,collection } from "firebase/firestore";
import { where,query,getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import  '../index.css'

function Blog() {
    const head=useRef()
    const description=useRef()
     const auth = getAuth(app);
      const db = getFirestore(app)
      const [allpost,setAllpost]=useState([])
      const navigate=useNavigate()
    
useEffect(()=>{
let checkuser = onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
        getdata()
    
        



    } else {
        console.log('no user error ')
    }
    return checkuser
})
},[])

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

    async function post() {


        console.log(head.current.value)
        console.log(description.current.value)

         
        
                    const docRef = await addDoc(collection(db, "blogs"), {
              head: head.current.value ,
              description:description.current.value,
              uid: auth.currentUser.uid,
              image:profileImage,
              postdate: new Date().toLocaleString(),
              
        
        
              });
              getdata()
              console.log(docRef)
        
    }
   async function getdata() {
let post=[]

        
            const q = query( collection(db, "blogs"), where("uid", "==",auth.currentUser.uid ));
        
             const querySnapshot = await getDocs(q);
        
              querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.data())
          post.push({...doc.data(),docid:doc.id})
          setAllpost(post)
        
        
       console.log(post) 
        //   console.log(doc.id, " => ", doc.data());
          
        });
        
    }


    useEffect(()=>{
        getdata()
    },[])
    function logout() {
        signOut(auth).then(() => {
        navigate('/')
   })
   .catch((error) => {
  
})
}
 const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };




    return(

        <div>
              <nav className="navbar">
                  <div className="navbar-logo"><div className="name">
                    mysite <Link to="/home" className="link">Home</Link></div></div>
            
                  <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
                      
                    
                    {/* <button></button> */}
                    <button onClick={logout} >log out</button>
            
                    
                 
                  </div>
                  <div className="navbar-toggle" onClick={toggleMenu}>
                    ☰
                  </div>
                </nav>
            <div>
               <br />
               <br />

                
                <input type="text" placeholder="enter a heading"  ref={head}/>
                <br /><br />

                <input type="text" placeholder="enter a discription"  ref={description}/>
                <br /><br />
                <button onClick={hanlecloud}>upload-pic</button>
                <br />
                <br />

                <button onClick={post}>post</button>
                

            </div>
            
            <div>
                {allpost ? allpost.map((item,index)=>{
                    return(<div key={index}>
                        <h1>{item.head}</h1>
                        <p>{item.description}</p>
                        <img src={item.image} alt=""  width='300px'/>


                    </div>)
                }):<h1></h1>}
            </div>
        
        </div>
    )
    
}
export default Blog