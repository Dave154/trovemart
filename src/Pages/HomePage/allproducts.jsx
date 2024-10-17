import React from 'react'
import { useEffect, useState } from 'react'
import {useNavigate,useParams,Outlet} from 'react-router-dom'
import { Container, Divider, AppBar, Skeleton, Pagination, Typography, Fab, Badge } from '@mui/material'
import { Home, ShoppingCartOutlined } from '@mui/icons-material'
import Topnav from '../.././components/topnav.jsx'
import CardList from '../.././components/cardlist.jsx'

import Categories from '../.././components/categories.jsx'
import Lazy from '../.././components/lazyload.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { SETPAGINATION,SETPRODUCTSDISPLAYEDONSEARCH} from '../.././Slices/products.js';
import Breadcrumbs from '../.././components/breadcrumbs.jsx'

  const Allproducts = () => {
    const navigate=useNavigate()
    const {category}=useParams()
    const dispatch = useDispatch();
    const {paginatedProducts, pageNumber, pageList, depth} = useSelector((state) => state.products);
    
  	const {query }=useParams()
    useEffect(()=>{
        dispatch(SETPRODUCTSDISPLAYEDONSEARCH(query))
        SETPAGINATION(1)
    },[query])
  	return (
  		<div>
        <Breadcrumbs />
        <CardList list={paginatedProducts} where='search'/>

  		</div>
  	)
  }
  
  export default Allproducts