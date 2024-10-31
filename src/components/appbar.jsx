import { useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { Container, Divider, AppBar, Fab, Badge ,Alert,Collapse,IconButton,Modal,Button} from '@mui/material'
import { Home, ShoppingCartOutlined,Close,Error } from '@mui/icons-material'
import Topnav from './topnav.jsx'
import Search from './search.jsx'
import Categories from './categories.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts,SETMAINCATEGORIES, SETCATEGORIES, SETPAGINATION, SETDEPTH,CLOSEERROR } from '.././Slices/products.js';
import { GETTOTAL,REMOVEALERT,ITEMCHANGEALERT,SUCCESSORDERS } from '.././Slices/cart.js';

const Navigation = ({ showCat,mt}) => {
	const navigate = useNavigate()
    const dispatch = useDispatch();
    const { popup } = useSelector((state) => state.appbar);
    const { amount, cartList, alert,orders} = useSelector((state) => state.cart);
    const { products, categories, currentCategory, currentMain, productsDisplayed, currentProduct,error } = useSelector((state) => state.products);
    const nestedCategories ={};
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


//
     useEffect(()=>{
        dispatch(SUCCESSORDERS(orders.filter(item=> item.status ==='completed').length))
    },[orders])
    useEffect(()=>{
     dispatch(GETTOTAL())
     localStorage.setItem('cartList', JSON.stringify(cartList))
      const remove = setTimeout(()=>{
            dispatch(REMOVEALERT())

        },1500) 
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
        <Collapse in={alert.bool} sx={{
                position:'fixed',
                width:'100%',
                zIndex:'1200'
        }} >
         <Alert
          severity={alert.severity}
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
            alert.severity === 'success' ? 
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
     <Modal open={ error ? true: false}
     // onClose={()=>dispatch(CLOSEERROR())}
     >
         <div className='bg-white grid place-items-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 py-16 rounded-2xl w-full max-w-sm'>
              <i>
             <Error color='error' fontSize='large'/>
         </i>
          <p>
              {error}
          </p>
         <Button variant='contained'
         onClick={()=>dispatch(fetchProducts())}
          sx={{
            bgcolor:'#E51E54',
            my:'1rem'
         }} >
             Refresh
         </Button>
         </div>

      
     </Modal>
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