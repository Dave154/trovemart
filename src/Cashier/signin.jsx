import {useSelector,useDispatch} from 'react-redux'
import {SETLOADING,SETCURRENTCASHIER,SETERROR} from '.././Slices/cashier.js'
  import { getDoc, doc } from 'firebase/firestore'
  import {useNavigate} from 'react-router'
 import { db } from '../.././firebase.js'
 const SignIn = () => {

 	const dispatch=useDispatch()
  const navigate = useNavigate()
 	const {loading,error}=useSelector(state=>state.cashier)

 	const handleSubmit =async(e)=>{
 		e.preventDefault()
    dispatch(SETERROR(false))
 		dispatch(SETLOADING(true))
 		const id= e.target[0].value
 		try{
 		 const res = await getDoc(doc(db, "Cashiers", id))
     if(!res.exists()){
           dispatch(SETERROR(true))
     }
 		 dispatch(SETLOADING(false))
     dispatch(SETCURRENTCASHIER(res.data()))
     navigate('/C-A-S-H-I-E-R')
 		}catch(err){
      console.log(err)
 			dispatch(SETLOADING(false))
 		}
 	}
 	return (
 	 
 		<div className='relative h-screen'> 
 		  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

 		  {
 		  	loading ? <div className="loader"></div> :
 			<form action="" onSubmit={handleSubmit} className={`bg-[rgba(250,11,12,.7)] p-5 rounded-xl shadow-xl ${error && 'shake'}`} >
 				<p className='font-semibold text-center pb-4 text-gray-100'>Enter Cahier Id</p>
 				<input type="text" className='border-2 rounded-xl px-2 text-white' autoFocus placeholder='***************' />
 			</form>	
 		  }
 		  </div>
 		</div>
 	)
 }
 
 export default SignIn