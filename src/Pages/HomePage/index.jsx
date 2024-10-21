import {Outlet} from 'react-router-dom'
import { Container} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, SETPRODUCTSDISPLAYED, SETPAGINATION, SETCURRENTPRODUCT,SETCURRENTCATEGORY } from '../.././Slices/products.js';
import {useEffect} from 'react'
const HomePage = () => {
    const dispatch = useDispatch()
        useEffect(() => {
        dispatch(fetchProducts('https://products-orcin.vercel.app/product?page=1&limit=3761'));         
    }, []);
    return <>
    <Container maxWidth = 'xl' >
         <div> 
         <Outlet/> 
        </div>
         </Container>
         </>

}
export default HomePage

