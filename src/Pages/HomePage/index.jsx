import { useEffect, useState } from 'react'
import {useNavigate,Outlet,useParams} from 'react-router-dom'
import { Container, Divider, Skeleton, Pagination, Typography, Breadcrumbs, Fab, Badge } from '@mui/material'
import { Home, ShoppingCartOutlined } from '@mui/icons-material'
import Topnav from '../.././components/topnav.jsx'
import Search from '../.././components/search.jsx'
import Categories from '../.././components/categories.jsx'
import Lazy from '../.././components/lazyload.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, SETPRODUCTSDISPLAYED, SETPAGINATION, SETCURRENTPRODUCT } from '../.././Slices/products.js';
import {GETTOTAL } from '../.././Slices/cart.js';

import Navigation from '../.././components/appbar.jsx'
const HomePage = () => {
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const { popup } = useSelector((state) => state.appbar);
     const { amount,cartList } = useSelector((state) => state.cart);
useEffect(()=>{
 dispatch(GETTOTAL())
},[cartList])

    return <>
    <Navigation showCat/>
    <Container maxWidth = 'xl'
    sx = { { mt: 28 } } >
       {/* <div className='md:hidden' >
        <Fab size="small"  aria-label="cart" sx={{
        background:'#E51E54',
        position:'fixed',
        bottom: '1rem',
        right: '1rem' ,
        zIndex: 1000,
                    svg:{
                color:'#fff'
            },
           '&:hover': {
          '& svg': {
            color: '#E51E54',
          },
        },
      }}>
        <Badge badgeContent={amount} color='success' onClick={()=>{
            navigate('/cart')
        }}>
          <ShoppingCartOutlined />
        </Badge>
        </Fab>            
        </div>*/}
         <div> 
         <Outlet/> 
        </div>
         </Container>
         </>

}
export default HomePage

