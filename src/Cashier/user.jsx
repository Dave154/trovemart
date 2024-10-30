 import {useEffect} from 'react'
 import {useParams} from 'react-router-dom'
 import { useDispatch, useSelector } from 'react-redux'
 import { db } from '../.././firebase.js'
 import {Skeleton,Button,Modal} from '@mui/material'
 import { doc, getDoc } from "firebase/firestore";
import {ArrowBack,Delete,Add,RemoveCircle} from "@mui/icons-material"
 import {USER,SETUSERORDERSMODAL,SETUSERORDERS} from '.././Slices/cashier.js'

 const User = () => {

 	const list=[
 		'name','email','orderNo','limit','phone']

 	const {userId}=useParams()
 		const dispatch=useDispatch()
 		const {user,userOrdersOpen}=useSelector(state=>state.cashier)

 	 const getUser = async () => {
         try {
    		 const res = await getDoc(doc(db, "users", userId))
    		 const orders= await getDoc(doc(db, "orders", userId))
    		 const merged= Object.assign({}, res.data(), orders.data());
    		 console.log(merged)
			 dispatch(USER(merged))
         } catch (err) {
             console.error(err);
         }
     };
 	useEffect(()=>{
			 dispatch(USER(null))

 		getUser()
 	},[])
 	return (
 		<div className=' grid gap-2'>
 			<article>
 				<div className="flex gap-2 items-center">
 				<i className='border border-red-100 p-1 rounded'><ArrowBack 
 					sx={{
 						color:'#E51E54'
 					}}
 				/></i>
 				
 				{
 				user?
 				<div>
 				<h2 className='font-semibold text-xl'>{user.displayName}</h2>
 				<span className='flex items-center gap-1'>
 				<p className="font-semibold">UID:</p>
 					<p className='text-sm text-gray-700'>{user.uid}</p>
 				</span>
 				</div>:
 				<div>
 				<Skeleton variant="text" width={100}/>
				<Skeleton variant="text" width={200}/>
 				</div>
 				
 				}
 				</div>
 			</article>



 			<article>
 				<div className="border rounded p-4 grid gap-7">
 				{
 					user ? 
 					<div className='grid gap-2'>
 						<p className='font-bold text-xl'>{user.displayName}</p>
 						<p className='p-1 border border border-gray-300 p-1 rounded w-fit text-xs capitalize ' >{user.status}</p>	
 					</div>:
 					<div className=" grid gap-2">
 						<Skeleton variant="text" fontSize="large" width={100} height={30}/>
 						<Skeleton width={50}/>
 					</div>
 				}

 					<div className=' text-xs flex gap-4 items-center'>
 						<span className="flex gap-2 border border-gray-300 p-1 rounded ">
 							<p className='font-semibold'>Created At :</p>
 							{
 								user ?
 							<p>{user.timeStamp?.toDate().toLocaleString()}</p>:
 							<Skeleton variant="text" fontSize="large" width={100}
 							
 							/>
 							}
 						</span>
 						<span className="flex gap-2 border border-gray-300 p-1 rounded ">
 							<p className='font-semibold'>Last Order :</p>
 							{
 								user ?
 							<p>{user.orders[0].timeStamp}</p>:
 							<Skeleton variant="text" fontSize="large" width={100}
 							
 							/>
 							}
 						</span>
 							<span className="flex gap-2 border border-gray-300 p-1 rounded ">
 							<p className='font-semibold'>Limit:</p>
 							{
 								user ?
 							<p> ₦ {user.limit}</p>:
 							<Skeleton variant="text" fontSize="large" width={100}
 							
 							/>
 							}
 						</span>
 					</div>
 				</div>
 			</article>
 			<article>
 				<div className="border rounded max-w-sm  p-4">
 					<p className='mb-3 font-bold '>Customer Info:</p>
 					<div className='grid gap-2'>
 						{
 							list.map((item,index)=>{
 								return <span className="flex justify-between ">
 									<p className='capitalize basis-[50%]'>{item} :</p>
 									{
 										user ? 
 									<p className='text-gray-600'>
 										{
 											item === 'name'? user.displayName :item ==='email' ?user.email: item === 'orderNo' ? user.orderNo : item=== 'limit' ? user.limit: user.phone
 										}
 									</p> :
 									<Skeleton variant='text' width={100}/>
 									}
 								</span>
 							})
 						}
 					</div>
 				</div>
 			</article>
 			<article className='grid gap-2'>
 			<Modal open={userOrdersOpen}
 			onClose={()=>dispatch(SETUSERORDERSMODAL(false))}
 			>
 				<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded shadow-inner w-64 h-64 shadow-white shadow'>
 					test
 				</div>
 			</Modal>
 				<div className="border rounded ">
 					<h2 className='font-bold p-2'> 
 						Order History
 					</h2>
 					<div>
 						<div className='flex justify-between border-b border-t p-4 text-center font-semibold  text-gray-600'>
 							<p className="basis-[30%] text-left">OrderId</p>
 							<p className="basis-[20%]">Phone</p>
 							<p className="basis-[20%]">Created At</p>
 							<p className="basis-[20%]"> Total</p>
 							<p className="basis-[10%]">Status</p>
 						</div>
 						<div className="">
 							{
 								user ?
 									user.orders.map(item=>{
 										const {contactNo,order,orderId,timeStamp,status}=item
 										return <div className="flex justify-between p-4 text-center border-b cursor-pointer hover:bg-gray-100" key={orderId}
 										onClick={()=>{
 											console.log(item)
 											dispatch(SETUSERORDERS(item))
 										}}
 										>
 											<p className='basis-[30%] text-left truncate max-w-[80%]'>{orderId}</p>
 											<p className='basis-[20%]'>{contactNo}</p>
 											<p className='basis-[20%]'>{timeStamp}</p>
 											<p className='basis-[20%]'>₦ {order.total}</p>
 											<p className='basis-[10%]'>{status}</p>
 										</div>
 									})
 								 :
 								 <div>
 								 	{
 								 		Array(10).fill(0).map((item,index)=>{
 								 			return <div className="flex justify-between p-4" key={index}>
 								 				<Skeleton variant="text"  fontSize='large' width={250}/>
 								 				<Skeleton variant="text" fontSize='large'  width={150}/>
 								 				<Skeleton variant="text"  fontSize='large' width={150}/>
 								 				<Skeleton variant="text"  fontSize='large' width={100}/>	
 								 				<Skeleton variant="text"  fontSize='large' width={50}/>
 								 			</div>
 								 			
 								 		})
 								 }
 								 </div>
 							}
 						</div>

 					</div>
 				</div>
 				<div className=" flex justify-end gap-4">
 					<Button variant='outlined' color='error'>
 					{ user?.status ==='active' ?
 						'Account suspension':
 						'Recover Account'
 					}
 					</Button>
 					<Button variant='contained' color='error'>
 						Delete Account
 					</Button>
 				</div>
 			</article>
 		</div>
 	)
 }
 
 export default User