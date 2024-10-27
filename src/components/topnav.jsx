import Logo from './logo.jsx'
 import { Skeleton, Divider,Fab ,Badge,Accordion,AccordionSummary, AccordionDetails,Button} from '@mui/material'
import { Menu, AccountCircleRounded ,ShoppingCartOutlined, ShoppingBagOutlined,ArrowDropDown,PersonOutlined} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux';
import { HANDLESIGN,HANDLESIGNCLOSE } from '.././Slices/appbar.js';
import { SETCATEGORIES, SETPRODUCTSDISPLAYED, SETPAGINATION } from '.././Slices/products.js';
import { HANDLESCROLL } from '.././Slices/appbar.js';
import { useState,useEffect} from 'react'
import Close from './close.jsx'
import {auth} from '../.././firebase.js'
import {signOut} from 'firebase/auth'
import {useNavigate,useParams} from 'react-router-dom'
const list = [{
        txt: 'Sign Up',
        route: '/signup'
    },
    {
        txt: 'Log In',
        route: '/login'
    },

]
const Topnav = () => {
    const {category} = useParams()
    const navigate= useNavigate()
    const dispatch = useDispatch()
    const { searchopen} = useSelector((state) => state.search);
    const { amount,orders,limit} = useSelector((state) => state.cart); 
    const { signBar,scroll } = useSelector((state) => state.appbar);
    const { currentUser } = useSelector((state) => state.auth);
    const { mainCategories} = useSelector((state) => state.products);
   
  let lastScrollTop = 0;  
  useEffect(() => {

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop && !searchopen){
        dispatch(HANDLESCROLL(true))
      } else {
       dispatch(HANDLESCROLL(false)) 
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchopen]);

    return <header>
    <nav className='flex justify-between gap-5  py-3 items-start cursor-pointer'>
       <Logo scroll={scroll}/>
        <div className={`grid place-items-center gap-6 ${scroll && 'hidden'}`}>
          <div className=' gap-2 hidden md:flex '>
          {
            mainCategories?.length >0 ? mainCategories.map((item,index)=>{
             return  <h2 className ={`sm:text-[.7rem] text-sm p-2 rounded-2xl cursor-pointer ${item === category && 'bg-gray-200' }  hover:bg-gray-100 `} key={index} onClick={()=>{
              navigate(`/${item}`)
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
        <div className='flex items-center gap-4'>
              <div className='hidden md:block'>
                 <Badge color="secondary" className='hidden' badgeContent={amount} sx={{
                    span:{
                      background:'#E51E54'
                    },
                    '& svg':{
                      color: ''
                    },
                    '&:hover':{
                      '& p': {
                        opacity:1
                      }
                    }
                 }}
                 onClick={()=>navigate('/cart')}
                 >
                  <ShoppingCartOutlined />
                  <p className='text-accent absolute -bottom-full right-0 opacity-0 pb-2 transition-all'>Cart</p>
                </Badge>
              </div>
            <div>
                <Badge color="secondary"  badgeContent={orders.filter(item=>item.status === 'pending').length} sx={{
                    span:{
                      background:'#E51E54'
                    },
                    '& svg':{
                      color: ''
                    },
                    '&:hover':{
                      '& p': {
                        opacity:1
                      }
                    }
                 }}
                 onClick={()=>navigate('/cart/orders')}
                 >
                  <ShoppingBagOutlined />
                  <p className='text-accent absolute -bottom-full  pb-2 right-0 opacity-0 transition-all'>Orders</p>
                </Badge>
            </div>
        </div>
        <div>
          <div className='flex gap-6 border-2 border-gray-200 rounded-3xl p-1 px-2 cursor-pointer hover:shadow-md' onClick={()=>{
           dispatch(HANDLESIGN())
         }} >
            <i><Menu/></i>
            <i><AccountCircleRounded/></i>
          </div>
          <Close condition={signBar} Func={HANDLESIGNCLOSE}>
                     {
            signBar &&  <div className='shadow-md  absolute z-20 -bottom-100 right-0 rounded-xl mt-2 bg-gray-800 text-gray-100 overflow-hidden'>
              <ul className=' w-80 md:w-60'>
              
            {
               currentUser ? <div className="h-full w-full rounded-xl  overflow-hidden flex flex-col pb-4 gap-6">
                 <div className="relative w-full h-24"> 
                    <div className="rounded-full w-32 h-32 grid place-content-center overflow-hidden border-2 border-double absolute left-1/2 -translate-x-1/2 -bottom-1/2 bg-gray-400">
                      <PersonOutlined fontSize='large'/>
                    </div>
                 </div>
                 <div className="mt-12 px-4 grid gap-2">
                   <p className="font-bold ">{currentUser.displayName}</p>
                   <p>{currentUser.email}</p>
                   <span className='flex gap-2'>
                   <p className="font-bold"
                   >Max Order: </p>
                   <p>₦ {limit.toLocaleString()}</p> 
                   </span>
                 </div>
                   <div className=" flex justify-center mt-auto">
                   <Button variant='contained' sx={{
                    background:'#E52E54',
                   }} onClick={()=>{ 
                    signOut(auth)
                    localStorage.removeItem('user')
                   }}>
                     Sign Out
                   </Button>
                   </div>
              </div> :
              list.map((item,index)=>{
                const {txt,route}=item
                return <li key={index} className='p-2 hover:bg-gray-500' onClick={()=>{
                  navigate(route)
                  dispatch(HANDLESIGN())
                }}>
                  <p>{txt}</p>
                </li>
              })
            }
            <Divider/>
            <li className="md:hidden">

            <Accordion sx={{
              boxShadow:'none',
              width:'100%',
              background:'rgba(208,203,200,1)',        
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
                mainCategories?.length > 0 ? mainCategories.map((item,index)=>{
                  return  <h2 className ={`text-sm p-3 px-4 rounded-2xl cursor-pointer ${item === category && 'bg-gray-200' }  hover:bg-gray-100 `} key={index} onClick={()=>{
                       navigate(`/${item}`)
                       dispatch(HANDLESIGN())
            } }>
               {item}
               </h2>
                }) : <div>
                  <Skeleton variant="text" width={'100%'} />
                   <Skeleton variant="text" width={'100%'} />
                    <Skeleton variant="text" width={'100%'} />
                     <Skeleton variant="text" width={'100%'} />
                </div>
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