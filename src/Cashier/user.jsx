 import {useEffect,useState} from 'react'
 import {useParams,useNavigate} from 'react-router-dom'
 import { useDispatch, useSelector } from 'react-redux'
 import { db } from '../.././firebase.js'
 import {Skeleton,Button,Modal,Pagination} from '@mui/material'
 import { doc, getDoc } from "firebase/firestore";
import {ArrowBack,Delete,Add,RemoveCircle} from "@mui/icons-material"
 import {USER,SETUSERORDERS} from '.././Slices/cashier.js'
import { isAfter, isBefore, parseISO, format, subDays,isValid,parse,isSameDay} from 'date-fns';
import UserOrderModal from './userOrderModal.jsx'
 const User = () => {
	const {userId}=useParams()
	const dispatch=useDispatch()
	const navigate=useNavigate()
	const {user,userOrdersOpen}=useSelector(state=>state.cashier)

	 const today = new Date();
  const sevenDaysAgo = subDays(today, 7);
 const defaultStart = isValid(sevenDaysAgo) ? format(sevenDaysAgo, 'yyyy-MM-dd') : '';
  const defaultEnd = isValid(today) ? format(today, 'yyyy-MM-dd') : '';

	const [startDate, setStartDate] = useState(defaultStart);
	const [endDate, setEndDate] = useState(defaultEnd);
	const [filteredData, setFilteredData] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
 	const list=[
 		'name','email','orderNo','limit','phone'
 		]


 	 const getUser = async () => {
         try {
    		 const res = await getDoc(doc(db, "users", userId))
    		 const orders= await getDoc(doc(db, "orders", userId))
    		 const merged= Object.assign({}, res.data(), orders.data());
			 dispatch(USER(merged))
         } catch (err) {
             console.error(err);
         }
     };
 	useEffect(()=>{
		dispatch(USER(null))
 		getUser()
 	},[])

  useEffect(() => {
    if (startDate && endDate) {
      const start = parseISO(startDate);
      const end = parseISO(endDate);
      const filtered = user?.orders.filter(item => {
      	const itemDate =   	new Date(item.timeStamp)
          return isAfter(itemDate, start) &&  (isBefore(itemDate, endDate) || isSameDay(itemDate, endDate));
      });
      setFilteredData(filtered);
      setCurrentPage(1);
    } else {
      setFilteredData(user?.orders);
    }
  }, [startDate, endDate, user]);

  const paginatedData = filteredData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const pageCount = Math.ceil(filteredData?.length / itemsPerPage);
  const handleNextPage = () => {
    if (currentPage * itemsPerPage < filteredData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
 	return (
 		<div className=' grid gap-2'>
 			<article>
 				<div className="flex gap-2 items-center">
 				<i className='border border-red-100 p-1 rounded cursor-pointer hover:bg-red-100 '><ArrowBack 
 					sx={{
 						color:'#E51E54'
 					}}
 					onClick={()=>{
 						navigate('/C-A-S-H-I-E-R/usermanagement')
 					}}
 				/></i>
 				{
 				user ?
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
 							<p>{user.orders[0]?.timeStamp}</p>:
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
 			{
 				userOrdersOpen &&
 			<UserOrderModal/>
 			}

 				<div className="border rounded ">
 				   <div className="flex justify-between px-4 py-2">
 					<h2 className='font-bold p-2'> 
 						Order History
 					</h2>
 					<div className='flex items-center gap-4 bg-white p-2 rounded-xl '>
 						<input type="date" className='shadow rounded-xl p-2  cursor-pointer'  value={startDate} max={endDate || undefined} onChange={(e) => setStartDate(e.target.value)} />
     				    <p>-To-</p>
     				    <input type="date"  className='shadow rounded-xl p-2 cursor-pointer' value={endDate} min={startDate || undefined} onChange={(e) => setEndDate(e.target.value)} />
 					</div>
 				   </div>
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
 								filteredData ?
 									paginatedData.map(item=>{
 										const {contactNo,order,orderId,timeStamp,status}=item
 										return <div className="flex justify-between p-4 text-center border-b cursor-pointer hover:bg-gray-100" key={orderId}
 										onClick={()=>{
 											dispatch(SETUSERORDERS(order))
 										}}
 										>
 											<p className='basis-[30%] text-left truncate max-w-[80%]'>{orderId}</p>
 											<p className='basis-[20%]'>{contactNo}</p>
 											<p className='basis-[20%]'>{timeStamp.split(',')[0]}</p>
 											<p className='basis-[20%] font-semibold'>₦ {order.total}</p>
 											<p className={`basis-[10%] rounded-xl w-fit italic capitalize text-gray-900 ${ status==='pending' && 'bg-yellow-200 '}  ${ status==='completed' && 'bg-green-200 '}  ${ status==='cancelled' && 'bg-red-200 '}`}>{status}</p>
 										</div>
 									})
 								 :
 								 <div>
 								 	{
 								 		Array(10).fill(0).map((item,index)=>{
 								 			return <div className="flex justify-between p-4 gap-10" key={index}>
 								 				<Skeleton variant="text"  fontSize='large' width='30%'/>
 								 				<Skeleton variant="text" fontSize='large'  width='20%' />
 								 				<Skeleton variant="text"  fontSize='large' width='20%'/>
 								 				<Skeleton variant="text"  fontSize='large' width='20%'/>	
 								 				<Skeleton variant="text"  fontSize='large' width='10%'/>
 								 			</div>
 								 			
 								 		})
 								 }
 								 </div>
 							}

 							{
 								pageCount > 1 &&
 							<div className="flex justify-end  p-2 ">
			 					<Pagination count={pageCount} page={currentPage} 
			 					sx={{
			 						bgcolor:'white',
			 						borderRadius:'3rem',
			 						padding:'.3rem'
			 					}}
			 					onChange={(e,value)=>{
			                    if(value){
			                   		setCurrentPage(value)
			                    }else{
			                        setCurrentPage(1)
			                    }
			                  }} />
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