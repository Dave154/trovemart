import React from 'react'
import {useNavigate,Outlet,useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Home } from '@mui/icons-material'
import {  Skeleton , Typography, Breadcrumbs } from '@mui/material'
import {SETCURRENTCATEGORY} from '.././Slices/products.js'
const Index = () => {
    const  dispatch=useDispatch()
	  const navigate = useNavigate()
       const {depth} = useSelector((state) => state.products);
	return (
		<div>
			<Breadcrumbs aria-label="breadcrumb" className='pb-4'>
       { depth ?
        depth.map((item,index)=>{
        return  <div key={index} className={`flex items-center  ${index !== depth.length-1 ? ' cursor-pointer hover:underline underline-offset-8 decoration-gray-200 ' : '  text-gray-400 cursor-default'} `}
        onClick={()=>{
            if (index === 0) {
                  navigate('/')

             }else if(index === 1){
                if(item=== 'AllProducts'){
                navigate(`/allproducts`)
                }else{
                dispatch(SETCURRENTCATEGORY('All'))
               navigate(`/${item}`)    
                }
             }
        }}
        >
        { item === 'Home' &&   <Home sx={{ mr: 0.5 }} fontSize="inherit" />}
            <Typography>{item}  </Typography> 
        </div>
       }) : <Skeleton variant="text" width={100} />
    }

      </Breadcrumbs>
		</div>
	)
}

export default Index