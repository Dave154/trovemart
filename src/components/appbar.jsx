import { useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { Container, Divider, AppBar, Fab, Badge ,Alert,Collapse,IconButton} from '@mui/material'
import { Home, ShoppingCartOutlined,Close } from '@mui/icons-material'
import Topnav from './topnav.jsx'
import Search from './search.jsx'
import Categories from './categories.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts,SETMAINCATEGORIES, SETCATEGORIES, SETPAGINATION, SETDEPTH } from '.././Slices/products.js';
import { GETTOTAL,REMOVEALERT,ITEMCHANGEALERT } from '.././Slices/cart.js';

const Navigation = ({ showCat,mt}) => {
	const navigate = useNavigate()
    const dispatch = useDispatch();
    const { popup } = useSelector((state) => state.appbar);
    const { amount, cartList, alert} = useSelector((state) => state.cart);
    const { scrollPrev, scrollNext } = useSelector((state) => state.appbar)
    const { products, categories, currentCategory, currentMain, productsDisplayed, currentProduct } = useSelector((state) => state.products);
    const nestedCategories = {};
    products?.forEach(item => {
        const levels = item.category.split('/');

        levels.reduce((acc, level) => {
            if (!acc[level]) {
                acc[level] = {};
            }
            return acc[level];
        }, nestedCategories);
    });
    const sectionedcat = Object.entries(nestedCategories).map((item, index) => {
        if (item[0] === currentMain) {
            return Object.entries(item[1]).map(itemas => itemas[0])
        }
    }).filter(item => item !== undefined)

// USEEFFECTS

    useEffect(() => {
        dispatch(fetchProducts('https://products-orcin.vercel.app/product?page=1&limit=3761'));         
    }, []);

    useEffect(()=>{
     dispatch(GETTOTAL())
     localStorage.setItem('cartList', JSON.stringify(cartList))
      const remove = setTimeout(()=>{
            dispatch(REMOVEALERT())

        },3000) 

            return ()=> clearTimeout(remove)
    },[cartList])
//
    useEffect(() => {
        dispatch(SETMAINCATEGORIES(Object.keys(nestedCategories)))
    }, [products, currentMain])
//
    useEffect(() => {
        dispatch(SETCATEGORIES(sectionedcat[0]))
        dispatch(SETPAGINATION(1))
        dispatch(SETDEPTH(['Home', currentMain, currentCategory, currentProduct]))

         document.documentElement.scrollTop=0;
         document.body.scrollTop=0
        

    }, [products, currentMain, currentCategory, currentProduct])
//
    return (
        <div>
 		<AppBar sx={{
        background:'white',
        color:'black',
        boxShadow:'4px 2px 5px rgba(200,200,200,.1)'
    }} >
            <Collapse in={alert ? true: false} sx={{
                position:'fixed',
                width:'100%',
            zIndex:'1200'
        }} >
         <Alert
          severity={alert}
          action={
            <IconButton
              aria-label="close"
              color="success"
              size="small"
              onClick={() => {
                dispatch(REMOVEALERT())
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}>
          {
            alert === 'success' ? 
         <p>Item has successfuly been added to cart</p>
         :<p> Item has been removed from cart</p>
          }
        
        </Alert> 
        </Collapse>
     <Container className='pb-2 relative'  maxWidth='xl' position='fixed'>
         <Topnav/>
         <Search placeholder='Search'/>
    </Container>
    <Divider/>
    <Container>
   {
   	showCat && <Categories/>
   }
    </Container>
       <div className={`fixed inset-0 popup z-10 bg-popup ${!popup && 'hidden' }`}> </div>
    </AppBar> 
    <Container maxWidth = 'xl'
    sx = { { mt: mt} } >
        <div className='md:hidden' >
        <Fab size="small"  aria-label="cart" onClick={()=>{
        	 navigate('/cart')
        }} sx={{
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
        <Badge badgeContent={amount} color='success'>
          <ShoppingCartOutlined />
        </Badge>

        </Fab>            
        </div>
         </Container>
 		</div>
    )
}

export default Navigation