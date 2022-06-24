import React,{useState,useContext,} from 'react'//this is change email window definition
import {Link,useHistory} from 'react-router-dom'//here the email ids are taken from user history
import M from 'materialize-css'
const Reset  = ()=>{
    const history = useHistory()
    const [email,setEmail] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid email",classes:"#c62828 red darken-3"})//checking for the pattern related to usual email paradigm
            return
        }
        fetch('/change-email',{//the fetch file to store onject related to change email id
            method:"post",//we declared method as post
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({//we are stringify ing json object
                email//here we are storing email ids
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})//exception condition
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})//else condition checking
               history.push('/signin')
           }
        }).catch(err=>{
            console.log(err)//printing the undesired error in console
        })
    }//defining of the change email id card
   return (
      <div className="mycard">
          <div className="card auth-card input-field">
            <h2>BD-WT Reels</h2>
            <input
            type="text"
            placeholder="Enter your previous email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <button className="btn #64b5f6 blue darken-1"
            onClick={()=>PostData()}
            >
               Change Email
            </button>
            
    
        </div>
      </div>
   )
}


export default Reset