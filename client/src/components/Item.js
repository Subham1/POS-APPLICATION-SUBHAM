import { Button } from 'antd'
import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { addToCart } from '../redux/actions/rootAction'
const Item = (props) => {
  const {item} = props
  const dispatch = useDispatch()
  const addItemToCart = (e)=>{
    dispatch(addToCart(item))
  }
  return (
    <div className='item'>
        <h4 className='name'> {item.name}</h4>
        <img src={item.image} alt={item.name} height="100" width="100"/>
        <h4 className='price'><b>Price : </b>{item.price} $/-</h4>
        <div className='d-flex justify-content-end'>
            <Button onClick={addItemToCart}>Add To Cart</Button>
        </div>
    </div>
  )
}

export default Item