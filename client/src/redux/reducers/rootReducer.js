const initialState = {
    loading : false,
    cartItems : []
}

const rootReducer = (state=initialState,action)=>{
    switch(action.type){
        case "ADD_TO_CART":{
            return {
                ...state,
                cartItems : [...state.cartItems,action.payload]
            }
        }
        case "UPDATE_CART":{
            return{
                ...state,
                cartItems : state.cartItems.map((item)=>item._id === action.payload._id ? {...item,quantity : action.payload.quantity} : item) 
            }
        }
        case "UPDATE_CART_DEC":{
            return{
                ...state,
                cartItems : state.cartItems.map((item)=>item._id === action.payload._id ? {...item,quantity : action.payload.quantity}: item)
            }
        }
        case "DELETE_CART_ITEM" : {
            return{
                ...state,
                cartItems : state.cartItems.filter((item)=>{
                    return item._id !== action.payload._id
                })
            }
        }
        case "SHOW_LOADING":{
            return{
                ...state,
                loading : true
            }
        }
        case "HIDE_LOADING":{
            return{
                ...state,
                loading : false
            }
        }
        default : return state
    }
}

export default rootReducer