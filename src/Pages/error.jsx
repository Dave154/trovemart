 import wave from '.././assets/wave.svg'
 import trove from '.././assets/trove.svg'
 import {useNavigate} from 'react-router-dom'
 import {ArrowBack} from '@mui/icons-material'
 import Logo from '.././components/logo.jsx'
 const ErrorComponent = () => {
 	const navigate=useNavigate()
 	return (
 		<section className='h-screen'>
 		<div className='fixed bottom-0 w-full'>
 		<img src={wave} alt=""/>
 		</div>
 		<div className="fixed">
 			<Logo/>
 		</div>
 		<div className='h-full bg-white grid place-content-center'>
 		 <div 
 		 	onClick={()=>{
 		 		navigate('/')
 		 	}}
 		 className="rounded-xl relative p-3 bg-white shadow gap-3 cursor-pointer hover:shadow-accent hover:scale-105 transition-all font-bold text-accent flex items-center justify-center">
 		 	<i className='absolute -top-1/2 left-0 w-8 roll'><img src={trove} alt=""/></i>
 		 	<i><ArrowBack/>	</i>
 		 	<p>	Go back home</p>
 		 </div>
 			<p className='font-bold font-extrabold text-9xl text-accent'>404</p>
 			<p className='text-center'>	Page not found <span className='font-extrabold text-accent'>!!!!!!	</span></p>
 		</div>
 		</section>
 	)
 }
 
 export default ErrorComponent