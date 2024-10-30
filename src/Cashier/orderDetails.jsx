import {ArrowBack,Delete,Add,RemoveCircle} from "@mui/icons-material"
import {Button} from '@mui/material'
import {useParams,useNavigate,useLocation} from 'react-router'
import {useDispatch,useSelector} from 'react-redux'
import { SETISEDIT,EDITORDER,SETORDER,GETTOTAL,SETLOADING,SETERROR,SETCONFIRMMODAL,REMOVEITEM,SETISADD,SETPACKAGING,EXCEEDEDLIMIT,SETALERT} from '.././Slices/cashier.js'
import {useRef,useState,useEffect} from 'react'
 import { doc, getDoc,updateDoc } from "firebase/firestore";
 import { db } from '../.././firebase.js'
 import  ConfirmModal from './confirmModal.jsx'
 import Addtocart from './Addtocart.jsx'
 import {useGlobe} from './context.jsx'
 const OrderDetails = () => {
 	const {updateOrderByOrderId,recover,getOrder}=useGlobe()
 	const dispatch= useDispatch()
 	const navigate=useNavigate()
  const location = useLocation();
 	const {isEdit,orderDetails,subtotal,total,packaging,error,isAdd,loading} =useSelector(state=>state.cashier)
   const {products} =useSelector(state=>state.products)
 	const {id}=useParams()

   

 useEffect(()=>{
 		getOrder(id)
 },[id])
  useEffect(() => {
    return () => {
      if (location.pathname) {
       dispatch(SETISEDIT(false))
      }
    };
  }, [location.pathname]);

 useEffect(()=>{
 	if(orderDetails.order){
 	dispatch(GETTOTAL())
 	}
 },[orderDetails,packaging])




  
 		const handleEdit=async(e)=>{
 			e.preventDefault()
         if(orderDetails.limit >= total){
            dispatch(SETISEDIT(false))
         dispatch(SETLOADING(true))
         try{
            await updateDoc(doc(db,'globalOrders',orderDetails.orderId),{
                     ['order'+'.subtotal']:subtotal,
                     ['order'+'.total']:total,
                     ['order'+'.orderlist']:orderDetails.order.orderlist,
                     ['order'+'.packaging']:packaging

             })
            updateOrderByOrderId( 
            orderDetails.userId,orderDetails.orderId ,
           {  
                 order:{
                  subtotal:subtotal,
                  total:total,
                  orderlist:orderDetails.order.orderlist,
                  packaging:packaging
                 }
                 } 
         );
            dispatch(SETLOADING(false))
            dispatch(SETALERT({bool:true,message:'Changes Saved!'}))
         }catch(err){
            dispatch(SETLOADING(false))
            dispatch(SETERROR(true))
             
         }
         }else{
             dispatch(SETALERT({bool:true,message:'Order Limit Exceeded!'}))
         }

 			
 		}
 	return <div>
       <Addtocart/>	
 			{
 				error ? <div className="absolute top-1/2 left-1/2 grid place-content-center -translate-x-1/2 -translate-y-1/2"
 				>	
 					<p>	Something went wrong</p>
 					<Button variant="contained" sx={{
 						bgcolor:'#E51E54'
 					}}
 					onClick={()=>{
 						getOrder()
 					}}
 					>
 						Try again
 					</Button>
 				</div>	: <div>	
     <div className="flex justify-between"
     >
 		<div className="flex gap-3">
 			<i className='cursor-pointer hover:bg-red-200 rounded h-fit p-2 transition-all' onClick={()=>{
 				navigate('/C-A-S-H-I-E-R')
 			}}><ArrowBack sx={{
 				color:'#E51E54'
 			}} /></i>
 		 <div className=''>
 			<div>
 			<p className='text-xs  text-accent'>Order/OrderDetails</p>
 			<h3 className='font-bold '>Order #{id}</h3>
 			</div>
         <div className="flex gap-2">
 			<p className="p-1 bg-gray-300 rounded font-semibold w-fit text-xs my-3"
 			>Placed on: {orderDetails.timeStamp}</p>
         <p className="p-1 bg-gray-300 rounded font-semibold w-fit text-xs my-3 capitalize"
         >Status: {orderDetails.status}</p> 
         <p className="p-1 bg-gray-300 rounded font-semibold w-fit text-xs my-3 capitalize"
         >Limit: <span className="font-bold text-gray-700">₦{orderDetails.limit?.toLocaleString()}</span> </p> 
         </div>
 		 </div>			
 		</div>
 		  <div className="cursor-pointer"
         onClick={()=>{
            navigate(`/C-A-S-H-I-E-R/usermanagement/${orderDetails.userId}`)
         }}
        >
     	  <p className="font-bold">{orderDetails.userName}</p>
 		  	<p>{orderDetails.contactNo}</p>
 		  </div>
     </div>
 		<form className='grid gap-4' onSubmit={handleEdit}>
 	     
 		 <div className="rounded-xl border-2 ">
 		    <div className='flex justify-between items-center p-2'>	
 		      <p className='font-bold '>Items Ordered</p>
            {
               orderDetails.status === 'pending' &&
 		      <div className='flex gap-4 items-center'>
 		 	 <button type='submit' className="border-2 w-fit p-2 rounded-xl bg-accent hover:bg-white hover:text-gray-700 cursor-pointer text-white ">
 		 	 	Apply Changes
 		 	 </button>
 		      <p className='border-2 p-1 px-4 rounded-xl cursor-pointer hover:bg-accent hover:text-white transition-all'
 		      	onClick={()=>{
 		      		dispatch(SETISEDIT(true))
 		      	}}
 		      > { isEdit ? 'Editing.....' : 'Edit'}</p>
 		  </div>
            }
 		    </div>
 		      <hr/>
 		 	 <div className='flex justify-between p-2 text-center font-semibold'>	
 		 	 	<p className='basis-[40%] text-left'>Item Name</p>
 		 	 	<p className='basis-[20%]'>Amount</p>
 		 	 	<p className='basis-[20%]'>Price</p>
 		 	 	<p className='basis-[20%]'>Total</p>
            {
               isEdit && 
            <i className="cursor-pointer hover:bg-red-100 px-4 rounded"
            onClick={()=>{
               dispatch(SETISADD(true))
            }}
            ><Add/></i>
            }
 		 	 </div>	
 		 	 <ul className="">
 		 	{
 		 		orderDetails.order?.orderlist.map((item,i)=>{
 		 			return <li key={i}>
 		 			  <div className='flex justify-between p-2 text-center items-center'>	
                        <p className='basis-[40%] text-left'>{item.name}</p>
                        <input type="number" className='text-center bg-transparent basis-[20%] ' disabled={!isEdit} value={item.amount} onChange={(e)=>dispatch(EDITORDER({id:item.id,amount:e.target.value}))}/>
                        <p className="text-center bg-transparent basis-[20%]">₦ {Number(item.price).toLocaleString()}</p>
                        <p  className='text-center bg-transparent basis-[20%] '> ₦ {(item.amount* item.price).toLocaleString()}</p>
                        {
                        	isEdit &&
                        <i className='cursor-pointer hover:bg-red-100 px-4 rounded ' 
                        onClick={()=>{
                           dispatch(REMOVEITEM(item.id))
                        }}
                        >	

                        <Delete sx={{
                        	color:'#E51E54'
                        }}/></i>	
                        }
 		 			  </div>
                        <hr/>
 		 			</li>
 		 		})
 		 	}	
 		 	 <div className='flex justify-between font-semibold py-3'>
 		 	 	<p className='basis-[60%] text-right'>Subtotal</p>
 		 	 	<p className='basis-[20%] text-center'>₦ {subtotal.toLocaleString()}</p>
 		 	 </div>
 		 	 
 		 	 
 		 	 <div className={`flex justify-between font-semibold pb-3 ${!packaging.bool && 'line-through text-gray-400'}`}>
 		 	 	<p className='basis-[60%] text-right'>Packaging</p>
 		 	 	<div className='basis-[12.5%] text-center flex justify-between'>
            <p>
            ₦{(1000).toLocaleString()}
            </p>
            {
               isEdit &&
            <i className="cursor-pointer hover:bg-red-100 px-4 rounded "
            onClick={()=>{
            dispatch(SETPACKAGING(!packaging.bool))
         }
            }
            ><RemoveCircle 
            sx={{
               color:'#E51E54'
            }}
            /></i>
               
            }
            </div>
 		 	 </div>
 		 	 
 		 	 <div className='flex justify-between font-semibold'>
 		 	 	<p className='basis-[60%] text-right'>Total</p>
 		 	 	<p className='basis-[20%] text-center'>₦ {total.toLocaleString()}</p>
 		 	 </div>
 		 	 </ul>
 		 </div>
 		  
 		</form>
 		<ConfirmModal user={orderDetails.userId} id={orderDetails.orderId}/>
 		<div className=" my-6 flex gap-6  justify-end">
       {
         orderDetails.status ==='pending' &&
 			<Button variant="outlined"
 			sx={{
 				borderColor:'#E51E54',
 				color:'#E51E54'
 			}}
 			onClick={()=>{
 				dispatch(SETCONFIRMMODAL({type:'Confirm',bool:true})) 
 			}}
 			>
 				Confirm Order
 			</Button>
       }
       {
          (orderDetails.status ==='pending' || orderDetails.status ==='abandoned' ) &&
 			<Button variant="contained"
 			sx={{
 				bgcolor:'#E51E54'
 			}}
 			onClick={()=>{
            if(orderDetails.status ==='abandoned'){
                recover(orderDetails.orderId,orderDetails.userId)
            }else{
 				dispatch(SETCONFIRMMODAL({type:'Cancel',bool:true})) 
            }
 			}}
 			>
         {orderDetails.status ==='pending' ?
 				'Cancel Order' : 'Recover'
         }
 			</Button>
       }
 		</div>
 		</div>

 			}
 	</div>	
 	
 	
 }
 
 export default OrderDetails