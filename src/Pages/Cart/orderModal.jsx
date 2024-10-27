 import {Modal} from '@mui/material'
 import {useState,useEffect} from 'react'
 import {ContentCopy,Autorenew,CheckCircle,ErrorOutline,Close,ReportOutlined} from '@mui/icons-material'
 import {useDispatch,useSelector} from 'react-redux'
 import {CLOSEORDERMODAL} from '../.././Slices/cart.js'
 const OrderModal = () => {
    const dispatch=useDispatch()
 	const [copied,setCopied] = useState(false)
    const {orderModal,orders}= useSelector(state=> state.cart)
    const {orderId,qr,timeStamp,orderItem,status,order}=orderModal
 	

 	useEffect(()=>{
 		const time= setTimeout(()=>{
 		setCopied(false)
 		},1000)
 		return ()=> clearTimeout(time)
 	})
   
 	return (
 			<Modal
             open={orderModal&& true}
             onClose={()=>dispatch(CLOSEORDERMODAL())}
             >
 				<div className="bg-white grid place-items-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 px-5 rounded-2xl w-full max-w-screen-sm">
                <i className='absolute top-3 right-3' onClick={()=>dispatch(CLOSEORDERMODAL())}><Close/></i>
 			    <p className={`bg-gray-200 p-1 absolute rounded-xl ${copied ? 'block' : 'hidden'} `}>Copied</p>
 					<p className="text-xl font-semibold pt-3">Order Details</p>
                	 <div className='w-64'>  
                        <img src={qr} alt=""/>
                    </div> 
                    <p className={` text-xl ${status==='pending' && 'text-gray-300'}  ${status==='completed' && 'text-green-300'} ${status==='abandoned' && 'text-yellow-500'}  ${status==='cancelled' && 'text-red-400'} `}>
                    {
                        status=== 'pending' && <Autorenew/>
                    }
                    {
                        status==='completed' && <CheckCircle/>
                    }
                    {
                        status ==='cancelled' &&<ErrorOutline/>
                    }
                    {
                        status ==='abandoned' &&<ReportOutlined/>
                    }
                    {status}
                    </p>
                    <div className='w-full py-10'>
                    	<div className='flex justify-between'>
                    		<p className="">Order Amount</p>
                    		<p className="font-poppins font-semibold ">₦ {order?.total}</p>
                    	</div>
                    	<div className="flex justify-between py-2">
                    		<p>Order Id</p>
                    		<p className='max-w-40 relative'>{orderId} <i className='absolute -right-4 top-0 cursor-pointer' onClick={()=>{
                    			navigator.clipboard.writeText(orderId)
                                setCopied(true)
                    		}}><ContentCopy sx={{
                    			color:'#E51E54',
                    			fontSize:'1rem'
                    		}} /></i></p>
                    	</div>
                    	<div className="flex justify-between">
                    		<p>Order Date</p>
                    		<p>{timeStamp}</p>
                    	</div>
                    </div>
 				</div>
 			</Modal>
 	
 	)
 }
 
 export default OrderModal