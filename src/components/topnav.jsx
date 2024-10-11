import logo from '.././assets/trove.svg'
import { Skeleton, Divider,Fab } from '@mui/material'
import { Menu, AccountCircleRounded,ArrowBackIosNewRounded } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux';
import { HANDLESIGN } from '.././Slices/appbar.js';
import { SETCATEGORIES, SETPRODUCTSDISPLAYED, SETPAGINATION } from '.././Slices/products.js';
import { HANDLESCROLL } from '.././Slices/appbar.js';
import { useState,useEffect} from 'react'
import Close from './close.jsx'
const list = [{
        txt: 'Sign Up',
        route: 'signup'
    },
    {
        txt: 'Log In',
        route: 'login'
    },

]
const Topnav = () => {
    const dispatch = useDispatch() 
  let lastScrollTop = 0;  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        dispatch(HANDLESCROLL(true))
      } else {
       dispatch(HANDLESCROLL(false)) 
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



    const { signBar,scroll } = useSelector((state) => state.appbar);
    const { products, mainCategories, currentMain } = useSelector((state) => state.products);
    return <header>
    <nav className='flex justify-between  py-3 items-start'>
        <div className='flex items-center gap-3'>
          <span className="logo w-10">
            <img src={logo} alt="logo"/>
          </span>
          <h2 className="text-accent invisible md:visible font-bold">trovemart</h2>
        </div>
        <div className={`grid place-items-center gap-6 ${scroll && '-translate-y-full hidden'}`}>
          <div className=' gap-2 hidden md:flex '>
          {
            mainCategories ? mainCategories.map((item,index)=>{
             return  <h2 className ={`text-xs p-2 px-4 rounded-2xl cursor-pointer ${item === currentMain[0] && 'bg-gray-200' }  hover:bg-gray-100 `} key={index} onClick={()=>{
              dispatch(SETPRODUCTSDISPLAYED([item,index]))
              dispatch(SETPAGINATION(1))
            } }>
               {item}
               </h2> 
            }): <div className="flex gap-1">
            <Skeleton variant="text" width={100} height={30} /> 
              <Skeleton variant="text" width={100} height={30} />
              <Skeleton variant="text" width={100} height={30} />
               <Skeleton variant="text" width={100} height={30} />
            </div> 

            
          }
          </div>
          
        </div>
        <div className='relative'>
          <div className='flex gap-6 border-2 border-gray-200 rounded-3xl p-1 px-2 cursor-pointer hover:shadow-md' onClick={()=>dispatch(HANDLESIGN())} >
            <i><Menu/></i>
            <i><AccountCircleRounded/></i>
          </div>
          <Close>
                     {
            signBar &&  <div className='shadow-md  absolute z-20 -bottom-100 right-0 rounded mt-2 bg-white'>
            <ul className='w-40'>
              
            {
              list.map((item,index)=>{
                const {txt,route}=item
                return <li key={index} className='p-2 hover:bg-gray-200' onClick={()=>dispatch(HANDLESIGN())}>
                  <p>{txt}</p>
                </li>
              })
            }
            <Divider/>
            <li className="p-2 hover:bg-gray-200 flex items-center gap-2 md:hidden" onClick={()=>dispatch(HANDLESIGN())}>

        <ArrowBackIosNewRounded sx= {{
          width:'.8rem',
          height:'.8rem'
        }} 
         />
            <p> Categories</p>
             </li>
            </ul>
          </div>
          }
         
          </Close>

        </div>
    
    </nav>
  </header>
}
export default Topnav