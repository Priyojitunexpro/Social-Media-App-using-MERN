import React,{useState,useContext,} from 'react'//the file to store object asssociated with delete account
import {Link,useHistory,useParams} from 'react-router-dom'
import M from 'materialize-css'
const SignIn  = ()=>{
    const history = useHistory()
    const [password,setPasword] = useState("")
    const {token} = useParams()
    const [isPasswordShown,setIsPasswordShown] = useState(false);
    const togglePassword = () =>{
        setIsPasswordShown(!isPasswordShown);
   }
    console.log(token)
    const PostData = ()=>{
        fetch("/new-password",{//the file to store object asssociated with delete account
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,//the file to store object asssociated with delete account
                token
            })
        }).then(res=>res.json())//the file to store object asssociated with delete account
        .then(data=>{
            console.log(data)
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})//the file to store object asssociated with delete account
           }
           else{

               M.toast({html:data.message,classes:"#43a047 green darken-1"})//the file to store object asssociated with delete account
               history.push('/signin')
           }
        }).catch(err=>{
            console.log(err)//the file to store object asssociated with delete account
        })
    }
   return (
      <div className="mycard">
          <div className="card auth-card input-field">
            <h2>BD-WT Reels</h2>
        
            <input
            type={isPasswordShown ? "text":"password"}
            placeholder="Enter a new password"
            value={password}
            onChange={(e)=>setPasword(e.target.value)}
            />
            <button style={{fontSize:"15px"}} className="btn #64b5f6 blue darken-1" onClick={togglePassword}>
            {isPasswordShown===true?<p style={{fontSize: "15px",marginTop:"0px"}}>Hide Password</p>:<p style={{fontSize: "15px",marginTop:"0px"}}>Show Password</p>} <i style={{fontSize:"15px"}} class="far fa-eye"></i>
          </button>
          <br></br>
          <span style={{ 
            fontWeight: 'bold', 
            color: 'red', 
            marginTop: '15px'
          }}>Your password must have atleast :-
           <ul style={{marginTop:"0px"}}>
           <li>8 characters.</li>
           <li>One lowercase alphabet</li>
           <li>One uppercase alphabet</li>
           <li>One numeric value</li>   
           </ul>
          </span> 
            <button className="btn #64b5f6 blue darken-1"
            onClick={()=>PostData()}
            >
               Update password
            </button>
    
        </div>
      </div>
   )
}


export default SignIn