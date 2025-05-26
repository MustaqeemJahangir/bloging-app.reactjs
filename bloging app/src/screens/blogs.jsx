import React, { useEffect, useRef, useState } from "react";
// import './index.html'
import { onAuthStateChanged,getAuth ,signOut } from "firebase/auth";
import { app } from "../config-files/firebase";
// import { Firestore, addDoc} from "firebase/firestore";
import { getFirestore,addDoc,collection } from "firebase/firestore";
import { where,query,getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import  '../index.css'
// import "../assets/logo.jpeg"
import myImage from '../assets/logo.jpeg';
import { doc } from "firebase/firestore/lite";

function Blog() {
    const head=useRef()
    const description=useRef()
     const auth = getAuth(app);
      const db = getFirestore(app)
      const [allpost,setAllpost]=useState([])
      const navigate=useNavigate()
      const [image,setImage]=useState("")
      const [userinfo,setuserinfo]=useState()
    

// let focus=[]
 useEffect(()=>{
  let  hola= async()=>{
      
const q = query(collection(db, "user"), where("uid", "==", auth.currentUser.uid));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  
  setuserinfo(doc.data())
  
});

      
  } 
  hola()
 },[])

  
 console.log(userinfo)
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
  console.log('hello world')
  window.cloudinary.openUploadWidget(
      {
        cloudName: "dosgchkzy",
        uploadPreset: "bloging",
        sources: ["local", "url", "camera"],
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Uploaded file URL: ", result.info.secure_url);
         
          setImage(result.info.secure_url);
         
        }
        
      }
      
    );
 
}

    async function post() {


        console.log(head.current.value)
        console.log(description.current.value)

         
        
                    const docRef = await addDoc(collection(db, "blogs"), {
              head: head.current.value ,
              description:description.current.value,
              uid: auth.currentUser.uid,
              image:image,
              postdate: new Date().toLocaleString(),
              userdata:userinfo
              
        
        
              });
              getdata()
              console.log(docRef)
              head.current.value=""
              description.current.value=""

        
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
                  <div className="navbar-logo"><div className="name" id="special">
                 <img src={myImage} alt="" /> </div></div>
            
                  <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
                      
                    {/* <Link to="/home/blog" className="link">Home</Link> */}
                    {/* <button></button> */}
                     <Link to="/home/" className="ancher" >Home</Link>
                    <button onClick={logout} >log out</button>
            
                    
                 
                  </div>
                  <div className="navbar-toggle" onClick={toggleMenu}>
                    ☰
                  </div>
                </nav>
            <div className="post-head">
               <br />
               {/* <br /> */}

                <div className="post-sub">
                  <h1>make a post</h1>

                
                <input type="text" placeholder="enter a heading"  ref={head}/>
                <br /><br />

                
                <textarea placeholder="enter a discription"  ref={description}></textarea>
                <br /><br />
                <button onClick={hanlecloud}>upload-pic</button>
                <br />
                <br />

                <button onClick={post}>post</button>
                </div>

            </div>
            
            <div className="body">
              
                {allpost ? allpost.map((item,index)=>{
                    return(
                    
                    <div key={index}>
                      {item.userdata && (
  <div className="user-info">
   <div>
 
    <img src={item.userdata.image}   width='20px'/>
    <h4>{item.userdata.fullname}</h4>
   </div>
   <div>
     <h6>{item.postdate}</h6>

   </div>

  
  </div>
)}
                        <div className="date">
                          <h1 className="h1">{item.head}</h1>
                        </div>

                       <div>
                         <p>{item.description}</p>
                        <img src={item.image} className='img'  />
                       </div>
                      


                    </div>)
                }):<h1></h1>}
            </div>
            
        
        </div>
    )
    
}
export default Blog