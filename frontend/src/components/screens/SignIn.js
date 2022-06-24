import React,{useState,useContext}  from 'react'//the file to store object asssociated with delete account
import {Link,useHistory} from 'react-router-dom'//the file to store object asssociated with delete account
import {UserContext} from '../../App'//the file to store object asssociated with delete account
import M from 'materialize-css'//the file to store object asssociated with delete account
import '../../App.css'//the file to store object asssociated with delete account
const SignIn = () => {
    const {state,dispatch} = useContext(UserContext)//the file to store object asssociated with delete account
    const history = useHistory()
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const [isPasswordShown,setIsPasswordShown] = useState(false);
    const togglePassword = () =>{
        setIsPasswordShown(!isPasswordShown);//the file to store object asssociated with delete account
   }
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid email",classes:"#c62828 red darken-3"})//the file to store object asssociated with delete account
            return
        }
        fetch("/signin",{
            method:"post",//the file to store object asssociated with delete account//the file to store object asssociated with delete account
            headers:{
                "Content-Type":"application/json"//the file to store object asssociated with delete account
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())//the file to store object asssociated with delete account
        .then(data=>{
            console.log(data)
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{//the file to store object asssociated with delete account
               localStorage.setItem("jwt",data.token)
               localStorage.setItem("user",JSON.stringify(data.user))//the file to store object asssociated with delete account
               dispatch({type:"USER",payload:data.user})
               M.toast({html:"Signed In successfully",classes:"#43a047 green darken-1"})//the file to store object asssociated with delete account
               history.push('/')
           }
        }).catch(err=>{//the file to store object asssociated with delete account
            console.log(err)
        })
    }
    return (
        <div className="mycard">
          <div className="card auth-card input-field">
            <h2>BD-WT Reels</h2>
            <input
            type="text"
            placeholder="Your Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            type={isPasswordShown ? "text":"password"}
            placeholder="Your password"
            value={password}
            onChange={(e)=>setPasword(e.target.value)}
            />
            <button style={{fontSize:"15px"}} className="btn #64b5f6 blue darken-1" onClick={togglePassword}>
            {isPasswordShown===true?<p style={{fontSize: "15px",marginTop:"0px"}}>Hide Password</p>:<p style={{fontSize: "15px",marginTop:"0px"}}>Show Password</p>} <i style={{fontSize:"15px"}} class="far fa-eye"></i>
          </button>
          <br></br>
          <br></br>
            <button className="btn #64b5f6 blue darken-1"
            onClick={()=>PostData()}
            >
                Login
            </button>
            <h5>
                <Link to="/signup">Don't have an account ?</Link>
            </h5>
            <h6>
                <Link to="/reset">Forgot password ?</Link>
            </h6>
    
        </div>
      </div>
    )
}

export default SignIn
