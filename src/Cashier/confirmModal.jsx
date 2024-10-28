 import {Modal,Button} from '@mui/material'
  import {LoadingButton} from '@mui/lab/'
 import {useSelector,useDispatch} from 'react-redux'
 import { SETCONFIRMMODAL,SETLOADING,SETERROR,SETALERT} from '.././Slices/cashier.js'
  import { doc, getDoc,updateDoc,serverTimestamp } from "firebase/firestore";
 import { db } from '../.././firebase.js'
 import {useGlobe} from './context.jsx'
 import {useNavigate} from 'react-router'
 const ConfirmModal = ({user,id}) => {
 	const{updateOrderByOrderId}=useGlobe()
 	const dispatch=useDispatch()
 	const navigate =useNavigate()
 	const {confirmModal,loading,currentCashier}=useSelector(state=> state.cashier)


 	const handleConfirm=async()=>{
 			dispatch(SETLOADING(true))
 			try{
 				if(confirmModal.type === 'Confirm'){	
 				await updateDoc(doc(db,'globalOrders',id),{
                    status:'completed',
                    cashier:currentCashier.name,
                    closedAt:serverTimestamp()
             })
			  updateOrderByOrderId(user,id,{ status: 'completed'});
 			dispatch(SETALERT({bool:true,message:'Order has been Confirmed'}))

 				}else{
 					await updateDoc(doc(db,'globalOrders',id),{
                    status:'cancelled',
                    cashier:currentCashier.name,
                    closedAt:serverTimestamp()
             })
			  updateOrderByOrderId(user,id,{ status: 'cancelled'});
 				dispatch(SETALERT({bool:true,message:'Order has been Cancelled'}))
 				}
 				dispatch(SETCONFIRMMODAL({bool:false}))
			   navigate('/C-A-S-H-I-E-R')
			   dispatch(SETLOADING(false))
 			}catch(err){
 				alert(err)
			   dispatch(SETLOADING(false))
			   dispatch(SETERROR(true))
 				 
 			}
 		}
 	return (
 		<Modal open={confirmModal.bool}
 		onClose={()=>dispatch(SETCONFIRMMODAL({bool:false}))}
 		>
 			<div className="bg-white grid place-items-center  gap-10  absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-5 rounded-2xl w-full max-w-md">
 				<p>
 					Are you sure you want to {confirmModal.type} order? 
 				</p>
 				<div className="flex gap-8">
					<Button  variant="outlined" 
					onClick={()=>{
 						dispatch(SETCONFIRMMODAL({bool:false})) 
 					}}>
					  Cancel
					</Button>
 					<LoadingButton variant='contained' loading={loading} onClick={handleConfirm}>
 						Go Ahead
 					</LoadingButton>
 				</div>
 			</div>
 		</Modal>
 	)
 }
 
 export default ConfirmModal