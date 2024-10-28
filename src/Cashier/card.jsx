 import { PersonOutlined, Timer,Warning,DoneAll ,ErrorOutlined} from '@mui/icons-material'
 import { Button } from '@mui/material'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate,useParams} from 'react-router'
 import { SETCONFIRMMODAL,SETLOADING,SETERROR} from '.././Slices/cashier.js'
  import { doc, getDoc,updateDoc } from "firebase/firestore";
 import { db } from '../.././firebase.js'
 import {useGlobe} from './context.jsx'
 const Card = ({ item }) => {
 	const {updateOrderByOrderId,getInitials,recover}=useGlobe()
 	const navigate= useNavigate()
 	const {orderTab} =useSelector(state=>state.cashier) 
     const { order, status, timeStamp,userName,orderId,userId} = item

    const initials=getInitials(userName)
  

     return (
     	<div className='bg-white rounded-3xl shadow-sm p-3 max-w-[20rem] grid  overflow-hidden'>
			<div className='grid gap-2 mb-2'>
				<div className='flex justify-between'>
					<div className='flex gap-2 items-center'>
						<span className='block rounded-xl grid place-content-center w-12 h-12 bg-[#f18ea9]'>
							<p className='font-semibold'>{initials}</p>
						</span>
						<div>
							<p>{userName}</p>
						</div>
					</div>
					<div className={`flex gap-2 items-center  ${status === 'pending' && 'bg-[rgba(255,204,0,.5)]'}  ${status === 'abandoned' && 'bg-[rgba(255,99,71,.5)]'}  ${status === 'cancelled' && 'bg-[rgba(128,128,128,.5)]'}  ${status === 'completed' && 'bg-[rgb(34,139,34,.5)]'} h-fit rounded-3xl px-2 py-1 text-sm`}>

						
						<i>
						{
						status === 'pending' &&
						<Timer sx={{
							fontSize:'1rem'
						}}/> }
						{ status === 'abandoned'&&
						<Warning sx={{
							fontSize:'1rem'
						}}/>
						}
						{ status === 'completed'&&
						<DoneAll sx={{
							fontSize:'1rem'
						}}/>
						}
						{ status === 'cancelled'&&
						<ErrorOutlined sx={{
							fontSize:'1rem'
						}}/>
						}
						</i> 

						

						<p>{status}</p>
					</div>
				</div>
				<div className='flex justify-between'>
				{
					timeStamp.split(',').map(item=>{
						return <p key={item}>{item}</p>
					})
				}
					
				</div>
			<hr/>
			</div>

			<div>
				<div className="flex justify-between text-sm text-gray-500">
					<p className="basis-2/6">Item</p>
					<p className="">Qty</p>
					<p className="">Price</p>
				</div>
				<ul className='grid gap-1 pt-2 relative h-24'>
				{
					order.orderlist.slice(0,3).map((item,index)=>{
						return <li className="flex justify-between font-semibold text-sm " key={index}>
						  	<p className='basis-2/6 truncate max-w-24'>
						  		{item.name}
						  	</p>
						  	<p>{item.amount}</p>
						  	<p>₦ {item.price}</p>
						  </li>	
					})
				}
				 { order.orderlist.length >3 &&
				 	<p className="text-xs text-center"
				 	>
				 	+{order.orderlist.length-3}more
				 	</p>
				 }
				</ul>
			<hr/>
			</div>
			<div className=''>
				<div>
					<div className="flex justify-between my-2 font-semibold">
						<p>
							Total
						</p>
						<p>₦ {order.total}</p>		
					</div>
				</div>
				<div className="flex justify-center gap-10">
					<Button variant='outlined' onClick={()=>{
						navigate(orderId)
					}} sx={{
						borderColor:'#E51E54',
						borderRadius:'10px',
						color:'#E51E54'
					}}>
						See Details
					</Button>
					{
						status === 'abandoned' &&
					<Button variant='contained'
					onClick={()=>recover(orderId,userId)}
					 sx={{
						bgcolor:'#E51E54',
						borderRadius:'10px'
					}}>
					  {
					  	 <p>Recover</p>
					  }
					</Button>
					}
				</div>
			</div> 			
 		</div>
     )
 }

 export default Card