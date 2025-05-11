import React, { useRef, useState } from "react";

import { onAuthStateChanged,getAuth  } from "firebase/auth";
import { app } from "../config-files/firebase";
// import { Firestore, addDoc} from "firebase/firestore";
import { getFirestore,addDoc,collection } from "firebase/firestore";
import { where,query,getDocs } from "firebase/firestore";

function Blog() {
    const head=useRef()
    const description=useRef()
     const auth = getAuth(app);
      const db = getFirestore(app)
    



onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
      getdata()
        



    } else {
        window.location = "login.html"
    }
});
    async function post() {

        console.log(head.current.value)
        console.log(description.current.value)

         
        
                    const docRef = await addDoc(collection(db, "blogs"), {
              head: head.current.value ,
              description:description.current.value,
              uid: auth.currentUser.uid,
              postdate: new Date().toLocaleString(),
              
        
        
              });
              getdata()
              console.log(docRef)
        
    }

let allpost=[]
    async function getdata() {
        allpost.length=0
            
            let user=null
        
        
            const q = query( collection(db, "blogs"), where("uid", "==",auth.currentUser.uid ));
        
             const querySnapshot = await getDocs(q);
        
              querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          user=doc.data()
          allpost.push({...doc.data(),docid: doc.id})
        
        
          console.log(doc.id, " => ", doc.data());
          
        });
          return user 
        
    }
         
console.log(allpost)


    return(

        <div>
            <div>
                <h1>blogs </h1>
                
                <input type="text" placeholder="enter a heading"  ref={head}/>
                <br /><br />

                <input type="text" placeholder="enter a discription"  ref={description}/>
                <br /><br />
                <button onClick={post}>post</button>
                

            </div>
        
        </div>
    )
    
}
export default Blog