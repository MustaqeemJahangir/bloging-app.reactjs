import React, { useState } from "react";
import { use } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged ,signOut } from "firebase/auth";
import { Firestore ,collection,query,where    ,getFirestore ,getDocs  } from "firebase/firestore";
import { app } from "../config-files/firebase";
import '../index.css'

function Home() {


    const db = getFirestore(app);
    // checked if user is login//
const [userimage,setImage]= useState('')
const [username,setName]= useState('')

    const auth = getAuth();
       onAuthStateChanged(auth, async(user) => {
       if (user) {
    
       const uid = user.uid;
      console.log(uid)
      let users=await getdata()
      console.log(users)
      console.log(users.image)

      if(users && users.image && users.fullname){
        setName(users.fullname)
        setImage(users.image)
      }
   
    
      
      
    
     } else {
    
    }
     });
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
  console.log(user)


  console.log(doc.id, " => ", doc.data());
  
});
  return user     
}
    
    getdata()

     const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };



    return(
        <div>
           
            
             <nav className="navbar">
      <div className="navbar-logo"><div className="name">
        mysite <Link to="blogs" className="link">Blogs</Link></div></div>

      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
          {userimage ?(
                <img src={userimage} alt=""  width='40px' height='40px'/>
            ):(<p>loading</p>)}
            {username ? <h1>{username}</h1>:<p>..loading</p>}
        
        {/* <button></button> */}
        <button onClick={logout} >log out</button>

        
     
      </div>
      <div className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </div>
    </nav>
            

        </div>
    )
}

export default Home