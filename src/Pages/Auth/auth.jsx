import {useEffect} from 'react'
import {Modal,Backdrop} from '@mui/material'
import {ErrorOutline} from '@mui/icons-material'
 import logo from '../.././assets/trove.svg'
 import {useSelector,useDispatch} from 'react-redux'
 import {CURRENTUSER,  ERROR}  from '../.././Slices/auth.js'

 const Auth = ({ children }) => {
        const dispatch= useDispatch()
        const {errorMessage,error,loading}= useSelector(state=>state.auth)
     return (
         <div className='md:grid grid-cols-2 h-screen'>
          <Backdrop sx={{zIndex:'1300'}} open={loading}>
              <div className='loader'></div>
          </Backdrop>
            <Modal
            open={error}
            onClose={()=>dispatch(ERROR({bool:false}))}
            >
                <div className='bg-white border-rose-400 border-2 grid place-items-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-5 rounded-2xl w-full max-w-sm'>
                   <i>
                      <ErrorOutline color='error'/> 
                   </i>
                    <p className=' text-xl p-5' >{errorMessage}</p>
                </div>
            </Modal>
      			{/*<div className='bg-gray-100 md:hidden'>3</div>*/}
      		<div className='bg-white p-2 h-full'>
      		 <div className='flex gap-3 items-center'>
      		 	<span className="logo w-10">
                <img src={logo} alt="logo"/>
              </span>
              <h2 className='text-accent font-bold'>trovemart</h2>
      		 </div>
      		   <div className='bg-white grid place-items-center h-full'>
      				{children}
      		   </div>
      		</div>
  		</div>
     )
 }

 export default Auth