import Lazy from './lazyload.jsx'
import {useState} from 'react'
import{ Button} from '@mui/material'
import {useSelector,useDispatch}  from 'react-redux'
import {CLEARCART,REMOVEITEM,ADDTOCART} from '.././Slices/cart.js'
import AmountToggler from './amountToggler.jsx';
 const Card = ({item,root}) => {
    const dispatch= useDispatch()
    const {id,image,name,price}= item
    const { cartList } = useSelector((state) => state.cart);
  const tpn = cartList.find(card=>{
        if (card.id === id){
            return card
        }
    })
 	return (
 		<li className={`group bg-white hover:shadow-xl hover:scale-105 transition-all flex flex-col justify-center cursor-pointer rounded-md overflow-hidden w-full h-full ${root ? 'w-full max-w-48 min-w-48' :'max-w-[18rem]'}   relative`}>
                 <div className={` w-full h-42 `}>
                  <Lazy src={image} alt='image' variant="rectangular" height='14rem' width='100%'/>
                 </div>
                 <div className='px-3 grid gap-2 flex-grow my-1 h-[71px] bg-red'>
                 <p className='line-clamp-2 text-sm overflow-hidden'>{name}</p>
                 <p className='font-semibold font-poppins text-sm' >₦ {Number(price).toLocaleString()}</p>
                 </div>

                 <div className=' flex justify-center mt-auto p-2'> 
                 {
                    tpn ? <AmountToggler value={tpn?.amount} id={id}/> :
                    <div className='md:invisible group-hover:visible flex items-center justify-center gap-5 w-full'>
                      <Button variant='contained' size='small' sx={{
                        background:'#E51E54',

                     }} 
                        onClick={()=>dispatch(ADDTOCART(item))}>
                         Add to Cart
                     </Button>
                    </div>
                 }
                    
                 </div> 
                 

          </li>
 	)
 }
 
 export default Card