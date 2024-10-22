import Navigation from '../.././components/appbar.jsx'
import {useEffect} from 'react'
 import {Container,Button} from '@mui/material'
 import {MoreVert} from '@mui/icons-material'
 import {useSelector,useDispatch} from 'react-redux'
 import {ORDERTAB,OPENORDERMODAL,getOrders} from '../.././Slices/cart.js'
import OrderModal from './orderModal.jsx'
 const Orders = () => {
 	const dispatch= useDispatch()
 	const {currentUser}=useSelector(state=> state.auth)
 	const {orders,orderTab,orderModal,loading,error}= useSelector(state=> state.cart)
 	useEffect(()=>{
 		dispatch(getOrders(currentUser.uid))
 	},[])
 	return <div>
 			<Navigation mt={20}/>
 			<Container maxWidth='xl' sx={{
 				height:'90vh'
 			}} >
 				<div className="">
 					<ul className="flex gap-10  ">
 						{
 							['All','Pending','Completed','Cancelled'].map(item=>{
 								return <li key={item} className={`${ item === orderTab ? ' text-gray-700 border-b-2 border-accent' :'text-gray-400 hover:border-b-2' } cursor-pointer`} 
 									onClick={()=>{
 										dispatch(ORDERTAB(item))

 									}}
 								>{item}</li>
 							})
 						}
 					</ul>
 				</div>
 					<div className=''>
 						<OrderModal/>
 						<div className='absolute top-1/2 left-1/2 -translate-x-1/2'>
 						{
 							loading && 
 						<div className="loader"></div>
 						}
 						{
 							error && <div className="grid items-center gap-2">
 							<p className="font-extralight font-mono">Something went wrong</p>	
 							<Button variant="text"
 							 onClick={()=>dispatch(getOrders())}
 							sx={{
 								color:'#E51E54'
 							}}
 								>
 								Try Again
 							</Button>
 							</div>  
 						}	
 						</div>
 						<ul className='grid gap-5 mt-5'>
 							{ 
 								orders.filter(item=> {
 									if (item.status === orderTab.toLowerCase()) {
 										return item
 									}else if (orderTab ==='All'){
 										return item
 									}
 								}).map(item=>{
 									const {orderId,qr,timeStamp,order,status}=item
 									return <li className="flex gap-4 justify-between cursor-pointer hover:bg-gray-200 p-2 rounded-2xl" key={orderId} onClick={()=>{
 										dispatch(OPENORDERMODAL(orderId))
 									}}>

 									<div className="md:flex w-1/2 justify-between">
 										<p className='truncate max-w-32 md:max-w-48 '>{orderId}</p>	
 										<p>{timeStamp}</p>
 									</div>
 									<div className="">
 									   <p>₦ {order.total}</p>
 										<p>{status}</p>
 									</div>
 									</li> 
 								})
 							}	
						</ul>			
 					</div>	
 			</Container>
 		</div>
 }
 
 export default Orders 