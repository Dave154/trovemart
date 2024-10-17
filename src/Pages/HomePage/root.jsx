import { useEffect, useState } from 'react'
import {useNavigate,Outlet,useParams} from 'react-router-dom'
import { Container, Divider, AppBar, Skeleton, Pagination, Typography, Breadcrumbs, Fab, Badge } from '@mui/material'
import { Home, ShoppingCartOutlined } from '@mui/icons-material'
import Topnav from '../.././components/topnav.jsx'
import Search from '../.././components/search.jsx'
import Categories from '../.././components/categories.jsx'
import Lazy from '../.././components/lazyload.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, SETPRODUCTSDISPLAYED, SETPAGINATION, SETCURRENTPRODUCT } from '../.././Slices/products.js';
const Root = () => {
    const navigate = useNavigate()
    const {category} = useParams()
    const dispatch = useDispatch();
    const { products, productsDisplayed, paginatedProducts, pageNumber, pageList, depth,mainCategories,loading} = useSelector((state) => state.products);
    const { query} = useSelector((state) => state.search);
  
    useEffect(() => {
        dispatch(fetchProducts());        
    }, [products]);

      useEffect(() => {
        dispatch(SETPRODUCTSDISPLAYED(query))
        dispatch(SETPAGINATION(1))
    }, [query]);

    return <>
           <section>       
            <div className="h-full w-full">
             { mainCategories ?
                mainCategories.map((item,index)=>{
                    return <div className="my-3" key={item}>
                     <div className="bg-pink-200 flex rounded px-2 justify-end">
                        <div className=" flex justify-between w-full ">
                            <h2 className="text-center font-bold">{item}</h2>
                            <p className="justify-self-end cursor-pointer" onClick={()=>{
                                navigate(item)
                                 // dispatch(SETPRODUCTSDISPLAYED([item,index]))
                                 // dispatch(SETPAGINATION(1))
                            }}>View all {Math.floor( products?.filter(product=>product.category.includes(item)).length)}+ items </p>    
                        </div>
                    </div>
                    <ul className="flex py-4  gap-4 overflow-auto horizontal-scroll">
                    { products?.filter((product,index)=> { 
                            if (product.category.includes(item)) {
                                return product
                            }
                     }).slice(0, 10).map((item)=>{
                            const {name,image,price,id}=item
                            return <li className=' bg-white shadow-md  justify-center rounded overflow-hidden w-full max-w-48 min-w-48' key={id} onClick={()=>dispatch(SETCURRENTPRODUCT(item))} >
                             <div className=' w-full h-32'>
                              <Lazy src={image} alt='image' variant="rectangular" height='100%'
                              />
                             </div>
                             <div className='p-3'>
                             <p>{name}</p>
                             <p>₦ {price}</p>
                             </div>      
                            </li>
                        })   
                        }
                    </ul>

                </div>
                }): Array(5).fill(0).map(item=>{
                    return <div>
                        <Skeleton variant="rectangular" width={100} height={10} />
                        
                            <ul className="flex py-4  gap-4 overflow-auto horizontal-scroll">
                                { Array(30).fill(0).map((item,index)=>{
                                    return <li className=' bg-white shadow-md w-full min-w-48' key={index}>
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
                               })
                                }
                            </ul> 
                        
                    </div>
                })
             }
               
            </div>
       </section>
         </>

}
export default Root

