import Navigation from '../.././components/appbar.jsx'
 import {Container } from '@mui/material'
 import {useSelector,useDispatch} from 'react-redux'
 import {ORDERTAB} from '../.././Slices/cart.js'
 const Orders = () => {
 	const dispatch= useDispatch()
 	const {orders,orderTab}= useSelector(state=> state.cart)
 	return <div>
 			<Navigation mt={20}/>
 			<Container maxWidth='xl'>
 				<div className="">
 					<ul className="flex gap-10  ">
 						{
 							['All','Pending','Completed'].map(item=>{
 								return <li key={item} className={`${ item === orderTab ? ' text-gray-700 border-b-2 border-accent' :'text-gray-400 hover:border-b-2' } cursor-pointer`} 
 									onClick={()=>{
 										dispatch(ORDERTAB(item))
 									}}
 								>{item}</li>
 							})
 						}
 					</ul>
 				</div>
 					<div>	
 						<ul>
 							{ 
 								orders.filter(item=> {
 									if (item.status === orderTab) {
 										return item
 									}else{
 										return item
 									}
 								}).map(item=>{
 									return <li className="" key={item}>
 										{item}
 									</li>
 								})
 							}	
						</ul>			
 					</div>	
 			</Container>
 		</div>
 }
 
 export default Orders 