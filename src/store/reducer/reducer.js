import myActions from "../constant/constant";

const mainState= {
        userlogin : ''
   }

export default(state = mainState, action) =>{
    switch(action.type){

        
        case myActions.userlogin:
        return({
            ...state,
            userlogin : action.payload
        })
        default:
    }
    return state
}