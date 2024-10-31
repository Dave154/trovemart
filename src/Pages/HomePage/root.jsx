import { useEffect } from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import { Skeleton, Breadcrumbs,Button } from '@mui/material'
import { Home, ShoppingCartOutlined,KeyboardDoubleArrowRight } from '@mui/icons-material'
import Topnav from '../.././components/topnav.jsx'
import Search from '../.././components/search.jsx'
import Categories from '../.././components/categories.jsx'
import Lazy from '../.././components/lazyload.jsx'
import Card from '../.././components/card.jsx'
import { useDispatch, useSelector } from 'react-redux';
import {SETPRODUCTSDISPLAYED, SETPAGINATION } from '../.././Slices/products.js';
import Navigation from '../.././components/appbar.jsx'

const Root = () => {
    const navigate = useNavigate()
    const {category} = useParams()
    const dispatch = useDispatch();
    const { products, productsDisplayed, paginatedProducts, pageNumber, pageList, depth,mainCategories,loading} = useSelector((state) => state.products);
    const { query} = useSelector((state) => state.search);
      useEffect(() => {
        dispatch(SETPRODUCTSDISPLAYED(query))
        dispatch(SETPAGINATION(1))
    }, [query]);

    const round = (num)=>{
        if(num.toString().length > 2){
        return Math.floor(num/100)*100
    }else{
        return num
      }
    }
    return <>
           <Navigation mt={20}/>    
           <section>   
            <div className="h-full w-full">
             { mainCategories?.length > 0 ?
                mainCategories.map((item,index)=>{
                    return <div className="" key={item}>
                     <div className="bg-red-200 flex rounded-xl p-2 justify-end cursor-pointer">
                        <div className=" flex justify-between w-full " onClick={()=>{
                                navigate(item)  
                            }}>
                            <h2 className="text-center font-bold">{item}</h2>
                            <p className="justify-self-end cursor-pointer">View all {round(products?.filter(product=>product.category.includes(item)).length)}+ items <KeyboardDoubleArrowRight/> </p>    
                        </div>
                    </div>
                    <ul className="flex py-2 pl-1 gap-2 overflow-auto horizontal-scroll items-stretch">
                    { products?.filter((product,index)=> { 
                            if (product.category.includes(item)) {
                                return product
                            }
                     }).slice(0, 10).map((item,i)=>{
                            return <Card item={item} root key={i}/>
                        })   
                        }
                    </ul>

                </div>
                }): Array(5).fill(0).map(item=>{
                    return <div>
                        <Skeleton variant="rectangular" width={'100%'} height={30} />
                        
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

