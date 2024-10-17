import Lazy from './lazyload.jsx'
import {useState} from 'react'
import{ Button} from '@mui/material'
import {useSelector,useDispatch}  from 'react-redux'
import {CLEARCART,REMOVEITEM,ADDTOCART} from '.././Slices/cart.js'
import AmountToggler from './amountToggler.jsx';
 const Card = ({item}) => {
    const dispatch= useDispatch()
    const {id,image,name,price}= item
    const { cartList } = useSelector((state) => state.cart);


  const tpn = cartList.find(card=>{
        if (card.id === id){
            return card
        }
    })
 	return (
 		<li className=' bg-white shadow-md  justify-center rounded-xl overflow-hidden w-full max-w-sm h-fit relative'>
                 <div className=' w-full h-36 '>
                  <Lazy src={image} alt='image' variant="rectangular" height='100%'
                  />
                 </div>
                 <div className='p-3 grid gap-2'>
                 <p>{name}</p>
                 <p className='font-bold' >₦ {price}</p>
                 </div>

                 <div className='flex justify-center p-4'>  
                 {
                    tpn ? <AmountToggler value={tpn?.amount} id={id}/> :
                      <Button variant='contained' sx={{
                        background:'#E51E54'
                     }} 
                        onClick={()=>dispatch(ADDTOCART(item) )}
                     >
                         Add to Cart
                     </Button>
                 }
                    
                 </div> 
                 

          </li>
 	)
 }
 
 export default Card


  // onClick={()=>dispatch(SETCURRENTPRODUCT(item))} 