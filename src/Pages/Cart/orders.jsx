import Navigation from '../.././components/appbar.jsx'
import {useEffect} from 'react'
 import {Container,Button} from '@mui/material'
 import {MoreVert,Circle,Done,Error,ReportOutlined} from '@mui/icons-material'
 import {useSelector,useDispatch} from 'react-redux'
 import {ORDERTAB,OPENORDERMODAL} from '../.././Slices/cart.js'
import Footer from '../.././components/footer.jsx'
import OrderModal from './orderModal.jsx'
 const Orders = () => {
 	const dispatch= useDispatch()
 	const {currentUser}=useSelector(state=> state.auth)
 	const {orders,orderTab,orderModal,loading,error}= useSelector(state=> state.cart)
 	const orderList= orders.filter(item=> {
 									if (item.status === orderTab.toLowerCase()) {
 										return item
 									}else if (orderTab ==='All'){
 										return item
 									}
 								})
 	return <div>
 			<Navigation mt={20}/>
 			<Container maxWidth='xl' className='hidden-scroll' sx={{
 				minHeight:'90vh',
 			}} >
 				<div className="">
 					<ul className="flex gap-10  overflow-auto horizontal-scroll">
 						{
 							['All','Pending','Completed','Cancelled','Abandoned'].map(item=>{
 								return <li key={item} className={`${ item === orderTab ? ' text-gray-700 border-b-2 border-accent' :'text-gray-400 hover:border-b-2' } cursor-pointer`} 
 									onClick={()=>{
 										dispatch(ORDERTAB(item))

 									}}
 								>{item}</li>
 							})
 						}
 					</ul>
 				</div>
 					<div className='overflow-auto'>
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
 							
 							sx={{
 								color:'#E51E54'
 							}}
 								>
 								Try Again
 							</Button>
 							</div>  
 						}	
 						{ (orderList.length < 1 && !error && !loading )&&
								<p className="text-gray-800 font-extralight">Nothing Here</p>
 						}
 						</div>
 						<ul className='grid gap-5 mt-5 '>
 							{ 
 								orderList.map(item=>{
 									const {orderId,qr,timeStamp,order,status}=item

 									return  <li className="flex gap-4 justify-between cursor-pointer hover:bg-gray-200 p-2 rounded-2xl" key={orderId} onClick={()=>{
 										dispatch(OPENORDERMODAL(orderId))
 									}}>

 									<div className="md:flex w-1/2 justify-between">
 										<p className='truncate max-w-32 md:max-w-48 '>{orderId}</p>	
 										<p>{timeStamp}</p>
 									</div>
 									<div className="">
 									   <p>₦ {order.total}</p>
 										<div className={`${status === 'pending' && 'bg-orange-300'} ${status === 'completed' && 'bg-green-300'} ${status === 'cancelled' && 'bg-red-300'} ${status === 'abandoned' && 'bg-yellow-300'}  flex gap-1 items-center p-1 rounded-xl font-extralight text-gray-800 text-xs`}>
 									    <i>
 									    	{
 									    		status === 'pending' && <Circle sx={{
 									    			fontSize:'.8rem',
 									    			color:'rgb(255, 172, 28)'
 									    			
 									    		}}
 									    		/>
 									    	}
 									    	{
 									    		status === 'completed' && <Done sx={{
 									    			fontSize:'.8rem',
 									    			color:'rgb(2, 48, 32)'
 									    			
 									    		}}
 									    		/>
 									    	}
											{
 									    		status === 'cancelled' && <Error sx={{
 									    			fontSize:'.8rem',
 									    			color:'red'
 									    			
 									    		}}
 									    		/>
 									    	}
 									    	{
 									    		status === 'abandoned' && <ReportOutlined sx={{
 									    			fontSize:'1rem',
 									    			
 									    			
 									    		}}
 									    		/>
 									    	}

 									    </i>
 										<p>
 										{status}
 										</p>
 										</div>
 									</div>
 									</li> 
 								}) 
 							}	
						</ul>			
 					</div>	
 			</Container>
 			<Footer/>
 		</div>
 }
 
 export default Orders 