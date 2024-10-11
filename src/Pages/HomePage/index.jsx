import { useEffect, useState } from 'react'
import { Container, Divider, AppBar ,Skeleton ,Pagination,Typography,Breadcrumbs,Link,} from '@mui/material'
import {Home,Whatshot,Grain} from '@mui/icons-material'
import Topnav from '../.././components/topnav.jsx'
import Search from '../.././components/search.jsx'
import Categories from '../.././components/categories.jsx'
import Lazy from '../.././components/lazyload.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, SETPRODUCTSDISPLAYED,SETPAGINATION,SETCURRENTPRODUCT } from '../.././Slices/products.js';
const HomePage = () => {
    const dispatch = useDispatch();
    const { products,productsDisplayed,paginatedProducts,pageNumber,pageList,depth} = useSelector((state) => state.products);
    console.log(paginatedProducts)
    useEffect(() => {
        dispatch(fetchProducts());
       dispatch(SETPRODUCTSDISPLAYED(['Grocery',0])) 
       dispatch(SETPAGINATION(1))

    }, [products]);



    return <>
        <AppBar sx={{
        background:'white',
        color:'black',
        boxShadow:'4px 2px 5px rgba(200,200,200,.1)'
    }} >
     <Container className='pb-2 relative'  maxWidth='xl' position='fixed'>
         <Topnav/>
         <Search placeholder='Search'/>
    </Container>
    <Divider/>
    <Container>
        <Categories/>
    </Container>
    </AppBar>

    <Container maxWidth = 'xl'sx = { { my: 30 } }  >
        <div className="mt-3 ">
       <Breadcrumbs aria-label="breadcrumb" className='pb-4'>
       {depth.map((item,index)=>{
        console.log(index,depth.length)
        return  <div key={index} className={`flex items-center  ${index !== depth.length-1 ? ' cursor-pointer hover:underline underline-offset-8 decoration-gray-200 ' : '  text-gray-400 cursor-default'} `}>
        { item === 'Home' &&   <Home sx={{ mr: 0.5 }} fontSize="inherit" />}
            <Typography>{item}  </Typography> 
        </div>
       })}
{/*        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/"
        >
         
          MUI
        </Link>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          <Whatshot sx={{ mr: 0.5 }} fontSize="inherit" />
          Core
        </Link>
        <Typography
          sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}
        >
          <Grain sx={{ mr: 0.5 }} fontSize="inherit" />
          Breadcrumb
        </Typography>*/}
      </Breadcrumbs>
            <ul className=' grid grid-cols-auto-fit-sm md:grid-cols-auto-fit-md gap-4'>
            {productsDisplayed  ? 
               paginatedProducts?.map(item=>{
                const {id,image,name,price}=item
                return <li className=' bg-white shadow-md  justify-center rounded overflow-hidden w-full max-w-sm' key={id} onClick={()=>dispatch(SETCURRENTPRODUCT(item))} >
                 <div className=' w-full h-64'>
                  <Lazy src={image} alt='image' variant="rectangular" height='100%'
                  />
                 </div>
                 <div className='p-3'>
                 <p>{name}</p>
                 <p>₦ {price}</p>
                 </div>      
                </li>
            }): Array(10).fill(0).map((item,index)=>{
                return <li className=' bg-white shadow-md rounded overflow-hidden w-full max-w-sm' key={index}>
                 <Skeleton variant="rectangular" sx={{
                    width:'100%',
                    height:'12rem'      
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
        </div>
         </Container>
        </>

}
export default HomePage