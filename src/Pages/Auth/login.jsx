 import Auth from './auth.jsx'
 import { Button } from '@mui/material'
 import google from '../.././assets/google.svg'
 import { Link } from 'react-router-dom'
 import { useSelector, useDispatch } from 'react-redux'
 import { useNavigate } from 'react-router-dom'
 import { auth, db } from '../../.././firebase.js'
 import { signInWithEmailAndPassword, } from "firebase/auth";
 import { doc, setDoc } from "firebase/firestore";

 import { LOADING, ERROR } from '../.././Slices/auth.js'


 const Login = () => {
     const dispatch = useDispatch()
     const navigate = useNavigate()
     const handleSubmit = async (e) => {
         e.preventDefault()
         dispatch(LOADING(true))
         const email = e.target[0].value
         const password = e.target[1].value
         const remember = e.target[2].checked
         try {
             const response = await signInWithEmailAndPassword(auth, email, password)
             navigate('/')
             dispatch(LOADING(false))
             if (remember) {
                localStorage.setItem('user',JSON.stringify(response.user))
             }

         } catch (error) {
             dispatch(LOADING(false))
             console.log(error)
             dispatch(ERROR({ bool: true, message: error.code }))
         }

     }
     return (
         <Auth>
 		<div className='w-full max-w-md p-6 grid gap-5 rounded-2xl'>
		<h2 className='font-bold text-2xl'>Login</h2>
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
				Sign in with Google
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
		 	<label htmlFor="">
			<p>Email </p> 
				<input type="email" placeholder='email' className='border-x-2 border-y-2 rounded-xl p-3 w-full ' required/>
			</label> 
			<label htmlFor="">
			<p>Password </p> 
				<input type="password" autoComplete='current-password' placeholder='*****************' className='border-x-2 border-y-2 rounded-xl p-3 w-full ' required/>
			</label>
			<div className="flex items-center gap-2 ">
				<input type="checkbox" id='t&c' />
				<label htmlFor="t&c">
				 Remember me
				</label>
				
			</div>
			<Button variant='contained'  type='submit' sx={{
				width:'100%',
				background:'#E51E54',
				paddingY:'.4rem',
				borderRadius:'1rem',
				fontSize:'1.1rem'
			}}>
				Log in
			</Button>
		</form>
		<p>Don't have an account? <Link to='/signup' className='text-accent'>Sign up!</Link> </p>
 		</div>
 			</Auth>
     )
 }

 export default Login