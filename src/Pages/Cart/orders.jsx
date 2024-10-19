import Navigation from '../.././components/appbar.jsx'
import {useEffect} from 'react'
 import {Container} from '@mui/material'
 import {MoreVert} from '@mui/icons-material'
 import {useSelector,useDispatch} from 'react-redux'
 import {ORDERTAB,OPENORDERMODAL} from '../.././Slices/cart.js'
import OrderModal from './orderModal.jsx'
 const Orders = () => {
 	const dispatch= useDispatch()
 	const {orders,orderTab,orderModal}= useSelector(state=> state.cart)


 	return <div>
 			<Navigation mt={20}/>
 			<Container maxWidth='xl'>
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
 						<ul className='grid gap-5 mt-5'>
 							{ 
 								orders.filter(item=> {
 									if (item.status === orderTab.toLowerCase()) {
 										return item
 									}else if (orderTab ==='All'){
 										return item
 									}
 								}).map(item=>{
 									const {orderId,qr,timeStamp,orderItem,status,total}=item
 									return <li className="flex gap-4 justify-between cursor-pointer hover:bg-gray-200 p-2 rounded-2xl" key={orderId} onClick={()=>{
 										dispatch(OPENORDERMODAL(orderId))
 									}}>

 									<div className="md:flex w-1/2 justify-between">
 										<p className='truncate max-w-32 md:max-w-48 '>{orderId}</p>	
 										<p>{timeStamp}</p>
 									</div>
 									<div className="">
 									   <p>₦ {total}</p>
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