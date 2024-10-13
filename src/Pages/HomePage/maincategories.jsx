import { useEffect, useState } from 'react'
import {useNavigate,useParams,Outlet} from 'react-router-dom'
import { Container, Divider, AppBar, Skeleton, Pagination, Typography, Breadcrumbs, Fab, Badge } from '@mui/material'
import { Home, ShoppingCartOutlined } from '@mui/icons-material'
import Topnav from '../.././components/topnav.jsx'
import Search from '../.././components/search.jsx'
import Categories from '../.././components/categories.jsx'
import Lazy from '../.././components/lazyload.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, SETPRODUCTSDISPLAYED, SETPAGINATION, SETCURRENTPRODUCT } from '../.././Slices/products.js';

 
 const MainCategories = () => {
 	const navigate=useNavigate()
 	const {category}=useParams()
 	const dispatch = useDispatch();
    const {paginatedProducts, pageNumber, pageList, depth} = useSelector((state) => state.products);
    const { popup } = useSelector((state) => state.appbar);
    useEffect(() => {
        dispatch(SETPRODUCTSDISPLAYED(category))
        console.log('hi')
        dispatch(SETPAGINATION(1))
    }, [category]);
 	return (
        <div className = "" >  
       <section>
       <Breadcrumbs aria-label="breadcrumb" className='pb-4'>
       { depth ?
        depth.map((item,index)=>{
        return  <div key={index} className={`flex items-center  ${index !== depth.length-1 ? ' cursor-pointer hover:underline underline-offset-8 decoration-gray-200 ' : '  text-gray-400 cursor-default'} `}
        onClick={()=>{
            if (item ==='Home') {
                  navigate('/')
             }else{
                
             }
        }}
        >
        { item === 'Home' &&   <Home sx={{ mr: 0.5 }} fontSize="inherit" />}
            <Typography>{item}  </Typography> 
        </div>
       }) : <Skeleton variant="text" width={100} />
    }

      </Breadcrumbs>
             <ul className=' grid grid-cols-auto-fit-sm md:grid-cols-auto-fit-md gap-4'>

            { paginatedProducts ? 
               paginatedProducts.map(item=>{
                const {id,image,name,price}=item
                return <li className=' bg-white shadow-md  justify-center rounded-xl overflow-hidden w-full max-w-sm' key={id} onClick={()=>dispatch(SETCURRENTPRODUCT(item))} >
                 <div className=' w-full h-36 '>
                  <Lazy src={image} alt='image' variant="rectangular" height='100%'
                  />
                 </div>
                 <div className='p-3'>
                 <p>{name}</p>
                 <p>₦ {price}</p>
                 </div>      
                </li>
            }): Array(30).fill(0).map((item,index)=>{
                return <li className=' bg-white shadow-md rounded overflow-hidden w-full max-w-sm' key={index}>
                 <Skeleton variant="rectangular" sx={{
                    width:'100%',
                    height:'8rem'      
                 }}
                 />
                 <div className='p-3 grid gap-1'>
                  <Skeleton variant="text" width={'100%'} height={30}
                  />
                  <Skeleton variant="text" width={100} height={30}
                  />
                 </div>      
                </li>
            })}
            </ul>
                <div className='flex w-full gap-10'>
                    <button className='bg-gray-400 rounded p-6' onClick={()=>{
                        if(pageNumber > 1)
                        dispatch(SETPAGINATION(pageNumber - 1))
                    }}>Prev</button>
                    <button className='bg-gray-400 rounded p-6' onClick={()=> {
                        if(pageNumber < pageList){
                        dispatch(SETPAGINATION(pageNumber + 1)) 
                        }
                    }}>Next</button>
                </div>
       </section> 
        
        </div>

 	)
 }
 
 export default MainCategories