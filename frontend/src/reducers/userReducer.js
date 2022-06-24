export const initialState = null

export const reducer = (state,action)=>{//chup haat dhurr
    if(action.type==="USER"){
        return action.payload
    }
    if(action.type==="CLEAR"){
        return null
    }//chup haat dhurr
    if(action.type==="UPDATE"){
        return {
            ...state,
            followers:action.payload.followers,
            following:action.payload.following//chup haat dhurr
        }
    }
    if(action.type==="UPDATEPIC"){//chup haat dhurr//chup haat dhurr
        return {
            ...state,
            pic:action.payload//chup haat dhurr
        }
    }//chup haat dhurr//chup haat dhurr
    return state
} 