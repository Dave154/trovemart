import logo from '.././assets/trove.svg'
import { Skeleton, Divider,Fab ,Badge,Accordion,AccordionSummary, AccordionDetails} from '@mui/material'
import { Menu, AccountCircleRounded,ArrowBackIosNewRounded ,ShoppingCartOutlined,ArrowDropDown} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux';
import { HANDLESIGN } from '.././Slices/appbar.js';
import { SETCATEGORIES, SETPRODUCTSDISPLAYED, SETPAGINATION } from '.././Slices/products.js';
import { HANDLESCROLL } from '.././Slices/appbar.js';
import { useState,useEffect} from 'react'
import Close from './close.jsx'
import {useNavigate,useParams} from 'react-router-dom'
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
  const {category} = useParams()
  const navigate= useNavigate()
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
    const { mainCategories} = useSelector((state) => state.products);
    return <header>
    <nav className='flex justify-between  py-3 items-start cursor-pointer'>
        <div className='flex items-center gap-3' onClick={()=>{
          // dispatch(SETPRODUCTSDISPLAYED([]))
          navigate('/')
        } }>
          <span className="logo w-10">
            <img src={logo} alt="logo"/>
          </span>
          <h2 className={`text-accent invisible md:visible font-extrabold ${scroll ? 'text-base' : 'text-xl' }`}>trovemart</h2>
        </div>
        <div className={`grid place-items-center gap-6 ${scroll && 'hidden'}`}>
          <div className=' gap-2 hidden md:flex '>
          {
            mainCategories ? mainCategories.map((item,index)=>{
             return  <h2 className ={`text-xs p-2 px-4 rounded-2xl cursor-pointer ${item === category && 'bg-gray-200' }  hover:bg-gray-100 `} key={index} onClick={()=>{
              navigate(item)
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
        <div className='relative flex items-center gap-8'>
        <div className='hidden md:block'>
         <Badge color="secondary"  badgeContent={100} sx={{
            span:{
              background:'#E51E54'
            }  
         }}>
          <ShoppingCartOutlined />
        </Badge>
        </div>
        <div>
          <div className='flex gap-6 border-2 border-gray-200 rounded-3xl p-1 px-2 cursor-pointer hover:shadow-md' onClick={()=>dispatch(HANDLESIGN())} >
            <i><Menu/></i>
            <i><AccountCircleRounded/></i>
          </div>
          <Close condition={signBar} Func={HANDLESIGN}>
                     {
            signBar &&  <div className='shadow-md  absolute z-20 -bottom-100 right-0 rounded-md mt-2 bg-white'>
            <ul className=' w-80 md:w-40'>
              
            {
              list.map((item,index)=>{
                const {txt,route}=item
                return <li key={index} className='p-2 hover:bg-gray-200' onClick={()=>dispatch(HANDLESIGN())}>
                  <p>{txt}</p>
                </li>
              })
            }
            <Divider/>
            <li className="md:hidden">

            <Accordion sx={{
              boxShadow:'none',
              width:'100%'
            }}>
              <AccordionSummary
              expandIcon={<ArrowDropDown/>}
              aria-controls='panel1-header'
              id='panel1-header'
              >
                Categories
              </AccordionSummary>
              <AccordionDetails>
                 {
                mainCategories?.map((item,index)=>{
                  return  <h2 className ={`text-sm p-3 px-4 rounded-2xl cursor-pointer ${item === category && 'bg-gray-200' }  hover:bg-gray-100 `} key={index} onClick={()=>{
                       navigate(item)
                       dispatch(HANDLESIGN())
            } }>
               {item}
               </h2>
                })
               }
              </AccordionDetails>
            </Accordion>
             </li>
            </ul>
          </div>
          }
         
          </Close>          
        </div>


        </div>
    
    </nav>
  </header>
}
export default Topnav