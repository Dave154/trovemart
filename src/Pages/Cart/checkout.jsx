 import {useEffect} from 'react'
 import Navigation from '../.././components/appbar.jsx'
  import {Container ,Button} from '@mui/material'
 import {useSelector,useDispatch} from 'react-redux'
 import {ORDERTAB,TOGGLEDROP,GETTOTAL,PACKAGING} from '../.././Slices/cart.js'
 import Lazy from '../.././components/lazyload.jsx'
 import {ArrowDropDown} from '@mui/icons-material'
 import {useNavigate} from 'react-router-dom'

 const CheckOut = () => {
 	const navigate = useNavigate()
 	const dispatch= useDispatch()
 	const { cartList , amount, subtotal,total,packaging,drop} = useSelector((state) => state.cart)
 			
 			useEffect(()=>{
 				cartList.length <1 && navigate('/cart')
 				dispatch(GETTOTAL())
 			},[packaging])
 	return (
 		<div>
 			<Navigation mt={20}/>
 			<section className='flex flex-col-reverse md:flex-row'>
 				<article className='bg-white h-full w-full px-4'>
 					<div>
 					<form action="">
 						<div className='grid gap-2 py-5'>	
 						<label htmlFor="Contact" className='font-bold text-xl'>Contact</label>
 						<input placeholder='Phone Contact' id='contact' type="text"  className='rounded-xl border-2 p-3'/>
 						</div>
 					</form>
 					<div className='flex gap-2'>
 						<input type="checkbox" className='before:bg-white' id='packaging' onChange={(e)=>dispatch(PACKAGING(e.target.checked))}/>
                        <label htmlFor="packaging">Request Packaging for an extra ₦{1000}</label>
 					</div>
 					<div className='py-5'>
 						<div className="flex justify-between items-center">
 							<p className="">SubTotal</p>
 							<p className="">₦ {subtotal}</p>
 						</div>
 						<div className={`flex justify-between ${!packaging.bool && 'hidden'} items-center py-3`}>
 							<p className=""> Packaging</p>
 							<p className="">₦ {packaging.value}</p>
 						</div>
 						<div className="flex justify-between items-center pt-7 font-bold text-xl">
 							<p className="">Total</p>
 							<p className=""> <span className='text-sm text-gray-400 pr-3'>NGN</span> ₦{total}</p>
 						</div>
 						<div className='flex justify-center pt-11'>
 							
 					<Button variant='contained' sx={{
 						background:'#E51E54',
 						width:'100%',
 						py:'.8rem'
 					}} >
 						Complete Order
 					</Button>
 						</div>
 					</div>
 					</div>
 				</article>
 				<article className='px-4'>
 				  <div className='flex justify-between '>	
 					<p className='text-sm text-gray-400 hidden md:block'>Order Summary</p>
 					<p className='md:hidden text-sm text-gray-400' onClick={()=>dispatch(TOGGLEDROP())}>	Show Order Summary <ArrowDropDown/> </p>
 					<p className='text-xl font-extrabold'>₦ {total}</p>
 				  </div>
 					<div className={`grid gap-6  ${drop ? ' h-full py-2': 'h-0'} overflow-hidden `}>
 						{
 							cartList.map(item=>{
 								const {id,name,image,price,amount} =item 
 									return <div key={id} className=" flex items-center justify-between">
 										<div className='flex gap-4 items-center'>
 											<div className=" relative">
 											   <div className="w-16 rounded-xl overflow-hidden">	
 												<Lazy src={image} variant='rectangular' width={65} height={60} />
 											   </div>
 												<p className="absolute -top-2 bg-gray-400 w-4 h-4 -right-2 rounded-full grid place-content-center">
 													{amount}
 													</p>
 											</div>
 											<p>{name}</p>
 										</div>
 										<div>
 											<p> ₦{price}</p>
 										</div>
 									</div>
 							})
 						}
{/*
 					<div className='py-5'>
 						<div className="flex justify-between items-center">
 							<p className="">SubTotal</p>
 							<p className="">₦ {subtotal}</p>
 						</div>
 						<div className={`flex justify-between ${!packaging && 'hidden'} items-center py-3`}>
 							<p className=""> Packaging</p>
 							<p className="">₦ {packaging}</p>
 						</div>
 						<div className="flex justify-between items-center pt-7 font-bold text-xl">
 							<p className="">Total</p>
 							<p className=""> <span className='text-sm text-gray-400 pr-3'>NGN</span> ₦{total}</p>
 						</div>
 					</div>*/}
 					</div>
 				</article>
 			</section>
 		</div>
 	)
 }
 
 export default CheckOut