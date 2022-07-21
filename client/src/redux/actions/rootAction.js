export const addToCart = (item)=>{
    console.log(item.name)
    return{
        type : 'ADD_TO_CART',
        payload : {...item,quantity : 1}
    }
}   
export const updateCartByInc = (record)=>{
    console.log(record)
    return{
        type : "UPDATE_CART",
        payload : {...record,quantity : record.quantity + 1}
    }
}
export const updateCartByDec = (record)=>{
    return{
        type : "UPDATE_CART_DEC",
        payload : {...record,quantity : record.quantity - 1}
    }
}
export const deleteCartItem = (record)=>{
    return{
        type : "DELETE_CART_ITEM",
        payload : record
    }
}

export const showLoading = ()=>{
    return{
        type : "SHOW_LOADING"
    }
}
export const hideLoading = ()=>{
    return{
        type : "HIDE_LOADING"
    }
}