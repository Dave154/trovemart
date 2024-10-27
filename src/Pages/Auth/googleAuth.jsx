
 import {Button } from '@mui/material'
 import google from '../.././assets/google.svg'
 import { useNavigate } from 'react-router-dom'
 import { useDispatch } from 'react-redux'
 import { LOADING, ERROR } from '../.././Slices/auth.js'
 // 
 import { auth, db } from '../../.././firebase.js'
 import { updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
 import { doc, setDoc ,getDoc} from "firebase/firestore";


 const provider = new GoogleAuthProvider();

 const GooglwAuth = ({type}) => {
 	const dispatch= useDispatch()
 	const navigate = useNavigate()
 	     const googleAuth = async () => {
         dispatch(LOADING(true))
         try {
             const result = await signInWithPopup(auth, provider)
             const credential = GoogleAuthProvider.credentialFromResult(result);
             const token = credential.accessToken;
             const user = result.user;
             const checkUser = await getDoc(doc(db,'users', user.uid))
             if(!checkUser.exists()){
             await setDoc(doc(db, "users", user.uid), {
                 uid: user.uid,
                 displayName: user.displayName,
                 email: user.email,
                 phone:user.phoneNumber
             });
             await setDoc(doc(db, "orders", user.uid), {orders:[]});
             }
             dispatch(LOADING(false))
             navigate('/')
         } catch (error) {
             dispatch(LOADING(false))
             dispatch(ERROR({ bool: true, message: error.code }))
             console.warn(error)
         }
     }
 	return (
 		<div className='w-full flex justify-center'>
			<Button variant='outlined' 
			onClick={()=>googleAuth()}
			sx={{
				borderColor:'#E51E54',
				margin:'0 auto',
				color:'#000'
			}} > 
			<div className='flex gap-3'>
				<span>
				<img src={google} alt="google"/>
			</span>
			<p>
				Sign {type} with Google
			</p>
			</div>
			</Button>
		</div>
 	)
 }
 
 export default GooglwAuth