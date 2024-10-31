import React from 'react'
 import { useDispatch, useSelector } from 'react-redux'
 import {Skeleton,Button,Modal,Pagination} from '@mui/material'
 import {Close} from '@mui/icons-material'
 import {SETUSERORDERSMODAL} from '.././Slices/cashier.js'
 
const UserOrderModal = () => {
	const dispatch=useDispatch()
	const {userOrdersOpen,userOrders}=useSelector(state=>state.cashier)
	return (
		<Modal open={userOrdersOpen}
 			onClose={()=>dispatch(SETUSERORDERSMODAL(false))}
 			>
 				<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-inner p-4 w-full max-w-screen-md shadow-white shadow'>
 					<i className=" absolute top-2 right-2 cursor-pointer"
 						onClick={()=>dispatch(SETUSERORDERSMODAL(false))}
 					><Close sx={{
 						color:'#E51E54'
 					}}/></i>
 					<p className='font-bold text-center text-2xl py-3'>Order List</p>
 					<div className='flex justify-between border-b my-3'>
 						{
 							['item Name','price','amount','total'].map(item=>{
 								return <p className={`text-gray-400  capitalize font-bold  ${item==='item Name' ?'basis-[40%]':'basis-[20%] text-center' }`}>
 									{item}
 								</p>
 							})
 						}
 					</div>
 					<div className="grid gap-3">
 						{
 							userOrders.orderlist?.map(item=>{
 								const {name,price,amount,image,id}=item
 								return <li className="flex justify-between text-center rounded-xl hover:bg-gray-100 p-2 items-center " key={id}>
 									<p className='basis-[40%] text-left'>	{name}</p>
 									<p className='basis-[20%]'>₦ {price}</p>
 									<p className='basis-[20%]'>{amount}</p>
 									<p className='basis-[20%]'>₦ {price*amount}</p>
 								</li>
 							})
 						}
 					</div>
 					<div className="grid gap-3 justify-end border-t mr-10 py-3">
 						<span className="flex gap-4">
 							<p className='font-bold'>Subtotal:</p>
 							<p>₦ {userOrders.subtotal}</p>
 						</span>
 						<span className={`flex gap-4 ${!userOrders.packaging.bool && 'line-through text-gray-200'}` }>
 							<p className='font-bold'>Packaging:</p>
 							<p>{userOrders.packaging.value}</p>
 						</span>
 						<span className="flex gap-4">
 							<p className='font-bold'>Total:</p>
 							<p>₦ {userOrders.total}</p>
 						</span>
 						
 					</div>
 				</div>
 			</Modal>
	)
}

export default UserOrderModal