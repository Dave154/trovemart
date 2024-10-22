 import Auth from './auth.jsx'
 import { Stepper, Step, StepLabel, Button } from '@mui/material'
 import google from '../.././assets/google.svg'
 import { Link } from 'react-router-dom'
 import { useNavigate } from 'react-router-dom'
 import { useSelector, useDispatch } from 'react-redux'
 import { LOADING, ERROR ,COMPLETE} from '../.././Slices/auth.js'
 // 
 import { auth, db } from '../../.././firebase.js'
 import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
 // import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
 import { doc, setDoc } from "firebase/firestore";
 const steps = ['Create Account', 'Success']

 const SignUp = () => {
     const navigate = useNavigate()
     const dispatch = useDispatch()
     const {currentUser,complete}=useSelector(state=>state.auth)
     const handleSubmit = async (e) => {
         e.preventDefault()
         dispatch(LOADING(true))
         const displayName = e.target[0].value + ' ' + e.target[1].value
         const phone = e.target[2].value
         const email = e.target[3].value
         const password = e.target[4].value

         try {
             const response = await createUserWithEmailAndPassword(auth, email, password)
             await updateProfile(response.user, {
                 displayName,
             })
             await setDoc(doc(db, "users", response.user.uid), {
                 uid: response.user.uid,
                 phone,
                 displayName,
                 email,
             });
             await setDoc(doc(db, "orders", response.user.uid),);
             dispatch(COMPLETE())
             navigate('/login')
             dispatch(LOADING(false))
         } catch (error) {
         	 dispatch(LOADING(false))
         	dispatch(ERROR({bool:true,message: error.code}))
             console.log(error.code, 'error')
         }


     }


     return (
         <Auth>	

 		<div className='w-full max-w-md p-6 grid gap-5 rounded-2xl'>
		<Stepper activeStep={complete? 2 : 1 } alternativeLabel>
	 	 {steps.map((label) => (
	    <Step key={label}>
	      <StepLabel sx={{
	      	svg:{
	      		color:'#E51E54!important'
	      	}
	      }}>{label}</StepLabel>
	    </Step>
		  ))}
		</Stepper>
		<h2 className='font-bold text-2xl'>Get Started</h2>

		<div className='w-full flex justify-center'>
			<Button variant='outlined' sx={{
				borderColor:'#E51E54',
				margin:'0 auto',
				color:'#000'
			}} > 
			<div className='flex gap-3'>
				<span>
				<img src={google} alt="google"/>
			</span>
			<p>
				Sign up with Google
			</p>
			</div>
			</Button>
		</div>
		<div className='flex items-center gap-2'>
		<span className='bg-gray-300 w-full h-[1px]'></span>
		<p>or</p>
		<span className='bg-gray-300 w-full h-[1px]'></span>
		</div>
		<form action="" className='grid gap-4 auth_form' onSubmit={handleSubmit} >
		 <div className='flex justify-between gap-2'>
			<label htmlFor="">
			 
				<p className='pb-3'>Firstname  </p>
				<input type="text" placeholder='Firstname' className='border-x-2 border-y-2 rounded-md p-3 w-full ' required/>
			</label>
			<label htmlFor="">
			   <p className='pb-3'>Lastname </p>
				<input type="text" placeholder='Lastname' className='border-x-2 border-y-2 rounded-md p-3 w-full ' required/>
			</label>
		 </div>
		 	<label htmlFor="">
			<p>Phone Number </p> 
				<input type="text" placeholder='08...' className='border-x-2 rounded-xl p-3 w-full ' required/>
			</label>
		 	<label htmlFor="">
			<p>Email </p> 
				<input type="email" placeholder='Email' className='border-x-2 rounded-xl p-3 w-full ' required/>
			</label> 
			<label htmlFor="">
			<p>Password </p> 
				<input type="password" placeholder='*************' className='border-x-2 rounded-xl p-3 w-full ' required/>
			</label>
			<div className="flex items-center gap-2 ">
				<input type="checkbox" id='t&c' required/>
				<label htmlFor="t&c">
				Accept Terms & Conditions
				</label>
				
			</div>
			<Button variant='contained'  type='submit' sx={{
				width:'100%',
				background:'#E51E54',
				paddingY:'.4rem',
				borderRadius:'1rem',
				fontSize:'1.1rem'
			}}>
				Sign Up
			</Button>
		</form>
		<p>Already have an account? <Link to='/login' className='text-accent'>Log in!</Link> </p>
 		</div>
 		</Auth>
     )
 }

 export default SignUp