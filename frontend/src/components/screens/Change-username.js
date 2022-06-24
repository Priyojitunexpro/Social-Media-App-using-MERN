import React,{useState,useContext,} from 'react'//this is the username change window 
import {Link,useHistory} from 'react-router-dom'//here we are importing user name history
import {UserContext} from '../../App'
import M from 'materialize-css'
const Reset  = ()=>{
    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
    const [email,setEmail] = useState("")
    const [username,setUsername] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid email",classes:"#c62828 red darken-3"})//we are taking into consideration regular expression
            return
        }
        fetch('/change-username',{//the fetch file to store the details related to username change 
            method:"post",//method is posted
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({//here we are stringify ing json object
                username,//username is strored here
                email//email id is stored here
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})//exception condition
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})//else condition checking
               localStorage.clear()
               dispatch({type:"CLEAR"})
               history.push('/signin')
               M.toast({html: "Sign in again to confirm it was you.",classes:"#43a047 green darken-1"})//toasting of M 
           }
        }).catch(err=>{
            console.log(err)//printing the undesired error in console
        })
    }//here we are defining the user name change card
   return (
      <div className="mycard">
          <div className="card auth-card input-field">
            <h2>BD-WT Reels</h2>
            <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            type="text"
            placeholder="Enter your new username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            />
            <button className="btn #64b5f6 blue darken-1"
            onClick={()=>PostData()}
            >
               Change Username
            </button>
            
    
        </div>
      </div>
   )
}


export default Reset