import React,{useState,useContext,} from 'react'//this is delete account window
import {Link,useHistory} from 'react-router-dom'//here we are collecting data from user history
import M from 'materialize-css'
import {UserContext} from '../../App'
const Reset  = ()=>{
    const history = useHistory()
    const [email,setEmail] = useState("")
    const[password,setPasword] = useState("")
    const {state,dispatch} = useContext(UserContext)
    const [isPasswordShown,setIsPasswordShown] = useState(false);
    const togglePassword = () =>{
        setIsPasswordShown(!isPasswordShown);
   }
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid email",classes:"#c62828 red darken-3"})//we are checking regular expression patterns
            return
        }
        fetch('/delete-account',{//the file to store object asssociated with delete account
            method:"post",//method as post
            headers:{
                "Content-Type":"application/json"//the header is of type application.json
            },
            body:JSON.stringify({//we are stringify ing json object
                email,//here we are storing the email id
                password//here we are storing the pasword
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               localStorage.clear()
               dispatch({type:"CLEAR"})
               history.push('/signin')
           }
        })
        .catch(err=>{
            console.log(err)//printing the undesired error in console
        })
    }
   return (
      <div className="mycard">
          <div className="card auth-card input-field">
            <h2>BD-WT Reels</h2>
            <input
            type="text"
            placeholder="Enter your email id"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            type={isPasswordShown ? "text":"password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>setPasword(e.target.value)}
            />
            <button style={{fontSize:"15px"}} className="btn #64b5f6 blue darken-1" onClick={togglePassword}>
            {isPasswordShown===true?<p style={{fontSize: "15px",marginTop:"0px"}}>Hide Password</p>:<p style={{fontSize: "15px",marginTop:"0px"}}>Show Password</p>} <i style={{fontSize:"15px"}} class="far fa-eye"></i>
          </button>
          <br></br>
          <br></br>
            <button className="btn #c62828 red darken-3"
            onClick={()=>PostData()}
            >
               Delete My Account
            </button>
            
    
        </div>
      </div>
   )
}


export default Reset