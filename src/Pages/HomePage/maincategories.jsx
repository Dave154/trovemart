import { useEffect, useState } from 'react'
import {useNavigate,useParams,Outlet} from 'react-router-dom'
import Topnav from '../.././components/topnav.jsx'
import Search from '../.././components/search.jsx'
import Categories from '../.././components/categories.jsx'
import CardList from '../.././components/cardlist.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, SETPRODUCTSDISPLAYED, SETPAGINATION, SETCURRENTPRODUCT,SETCURRENTCATEGORY } from '../.././Slices/products.js';
import Breadcrumbs from '../.././components/breadcrumbs.jsx'
 import Navigation from '../.././components/appbar.jsx'
 const MainCategories = () => {
 	const navigate=useNavigate()
 	const {category}=useParams()
 	const dispatch = useDispatch();
    const {loading,paginatedProducts } = useSelector((state) => state.products);
    const { popup } = useSelector((state) => state.appbar);
    useEffect(() => {
        dispatch(SETPRODUCTSDISPLAYED(category))
        dispatch(SETPAGINATION(1))
         dispatch(SETCURRENTCATEGORY('All'))
    }, [loading,category]);
 	return (
        <div className = "" >   
        <Navigation showCat mt={28}/>
       <Breadcrumbs/>
       <CardList list={paginatedProducts}/>
        </div>

 	)
 }
 
 export default MainCategories