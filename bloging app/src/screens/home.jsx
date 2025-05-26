import React, { useState,useEffect } from "react";
import { use } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged ,signOut } from "firebase/auth";
import { Firestore ,collection,query,where    ,getFirestore ,getDocs, doc  } from "firebase/firestore";
import { app } from "../config-files/firebase";
import '../index.css'
import myImage from '../assets/logo.jpeg'

function Home() {


    const db = getFirestore(app);
    // checked if user is login//
const [userimage,setImage]= useState('')
const [username,setName]= useState('')
const [post,setAllpost]= useState([])


    const auth = getAuth();
       onAuthStateChanged(auth, async(user) => {
       if (user) {
    
       const uid = user.uid;
      console.log(uid)
      let users=await getdata()
    
    

      if(users && users.image && users.fullname){
        setName(users.fullname)
        setImage(users.image)
      }
   
    
      
      
    
     } else {
    
    }
     });
     useEffect(()=>{
     let checkuser = onAuthStateChanged(auth, (user) => {
         if (user) {
             const uid = user.uid;
             console.log(uid);
             alluser()
         
             
     
     
     
         } else {
             console.log('no user error ')
         }
         return checkuser
     })
     },[])
    const navigate=useNavigate()
// logout function    
    function logout() {
        signOut(auth).then(() => {
        navigate('/')
   })
   .catch((error) => {
  
})
}
// get data from

async function getdata() {
    
    let user=null


    const q = query( collection(db, "user"), where("uid", "==",auth.currentUser.uid ));

     const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  user=doc.data()
  
  
});
  return user     
}
    
    getdata()

     const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
let emptyarray=[]
   async function alluser() {
  

const querySnapshot = await getDocs(collection(db, "blogs"));
querySnapshot.forEach((doc) => {
  


  // console.log(doc.id, " => ", doc.data());
  emptyarray.push({...doc.data(),docid:doc.id})
  console.log(emptyarray)
})


setAllpost(emptyarray)
  }
  



    return(
        <div>
           
            
             <nav className="navbar">
      <div className="navbar-logo"><div className="name"  id="special">
        <img src={myImage} alt=""  width="180px" id="logo-images"/><Link to="blogs" className="link" >Blogs</Link>{userimage && <img src={userimage} className="bhem"/>} </div></div>

      <div className={`navbar-links ${isOpen ? 'open' : ''}`} >
         <Link to="blogs" className="link" >Blogs</Link>
          
        
        {/* <button></button> */}
         <Link to="blogs" className="ancher" >Blogs</Link>
        <button onClick={logout} >log out</button>

        
     
      </div>
      <div className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </div>
    </nav>
    <div className="body">
      {post? post.map((item,index)=>{
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
                        
                          <h1>{item.head}</h1>
                        {/* <h6>{item.postdate}</h6> */}
                        </div>

                       <div>
                         <p>{item.description}</p>
                        <img src={item.image} alt=""  className="img"/>
                       </div>


                    </div>)

      }):<h1></h1>}
    </div>
            <div  className="footer">
              <h1>img</h1>
              <p>all right reserved .privacy policy  </p>
              <p>made by muhammad mustaqeem</p>
            </div>

        </div>
    )
    
}

export default Home