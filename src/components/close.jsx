 import {useEffect} from 'react'
 import { useDispatch, useSelector } from 'react-redux';
import { HANDLEPOPUP } from '.././Slices/appbar.js';

 const Close =({children, Func,condition})=>{
 	const dispatch=useDispatch()
 const { popup } = useSelector((state) => state.appbar);
 	useEffect(() => {
 	dispatch(HANDLEPOPUP(condition))
 		const func =(e)=>{
 				if (e.target.classList.contains('popup')){
 						dispatch(Func())
 				}
 		}
 		document.addEventListener('click',func)
 		return () => {
 			document.removeEventListener('click',func)
 		};
 	}, [condition])

 	return < div className='relative z-20'>
 		{children}
 	</div>
 }
 export default Close