import {useNavigate} from 'react-router-dom'
import logo from '.././assets/trove.svg'
  
 const Logo = ({scroll,show}) => {
 	const navigate = useNavigate()
 	return (
 		 <div className='flex items-center gap-3 cursor-pointer' onClick={()=>{
          navigate('/')
        } }>
          <span className="logo w-10">
            <img src={logo} alt="logo"/>
          </span>
          <h2 className={`text-accent  md:visible font-extrabold ${scroll ? 'text-base' : 'text-xl' } ${show ? 'visible' :'invisible'}`}>trovemart</h2>
        </div>
 	)
 }
 
 export default Logo