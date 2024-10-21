 import{ Add,Remove} from '@mui/icons-material'
import {TOGGLEAMOUNT} from '.././Slices/cart.js'
import {useSelector,useDispatch} from 'react-redux'
 const AmountToggler = ({id,value}) => {
 	const dispatch = useDispatch()
 	return (
 		<div className='flex justify-between item-center w-full'>
 			<div  className='bg-accent cursor-pointer hover:bg-red-400 rounded-xl p-1'
 			onClick={()=>dispatch(TOGGLEAMOUNT({id:id, type:'dec'}))}><Remove sx={{
 				color:'#fff'
 			}}/></div>
 			<div className=''>{value}</div>
 			<div  className='bg-accent p-1 cursor-pointer hover:bg-red-400 rounded-xl'
 			onClick={()=>dispatch(TOGGLEAMOUNT({id:id, type:'inc'}))}
 			><Add sx={{
 				color:'#fff'
 			}}/></div>
 		</div>
 	)
 }    
 
 export default AmountToggler