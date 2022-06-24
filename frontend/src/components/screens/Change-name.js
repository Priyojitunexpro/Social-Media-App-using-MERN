import React,{useState,useContext,} from 'react'//this is the name change window 
import {useHistory} from 'react-router-dom'//we are importing use history
import {UserContext} from '../../App'
import M from 'materialize-css'
const Reset  = ()=>{
    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
    const [email,setEmail] = useState("")
    const [name,setName] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid email",classes:"#c62828 red darken-3"})//here we have given regular expression pattern
            return
        }
        fetch('/change-name',{//here we are fetch the new name entered by the user through keyboard
            method:"post",
            headers:{
                "Content-Type":"application/json"//header is application.json
            },
            body:JSON.stringify({//we are stringifying the json object
                name,//name is strored here
                email//email is stored here
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
               M.toast({html: "Sign in again to confirm it was you.",classes:"#43a047 green darken-1"})
           }
        }).catch(err=>{
            console.log(err)
        })
    }
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
            placeholder="Enter your new name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
            <button className="btn #64b5f6 blue darken-1"
            onClick={()=>PostData()}
            >
               Change Name
            </button>
            
    
        </div>
      </div>
   )
}


export default Reset