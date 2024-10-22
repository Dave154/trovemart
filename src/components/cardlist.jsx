 import Card from './card.jsx'
 import { Container, Divider, AppBar, Skeleton, Pagination, Typography, Fab, Badge } from '@mui/material'
import { SETPAGINATION} from '.././Slices/products.js';
import { useDispatch, useSelector } from 'react-redux';

 const CardList = ({list}) => {
 	 	const dispatch = useDispatch();
 	 	 const {products, pageNumber, pageList} = useSelector((state) => state.products);
 	return (
 		 <section>
             <ul className=' grid grid-cols-auto-fit-sm md:grid-cols-auto-fit-md gap-4'>
            { products?.length > 0 ? 
               list?.map(item=>{
                return <Card
                key={item.id}
                item={item}
            />
            }): Array(30).fill(0).map((item,index)=>{
                return <li className=' bg-white shadow-md rounded overflow-hidden w-full max-w-sm' key={index}>
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
            })}
            </ul>
            {
               (!products && list?.length ===0 )?
            <p className='text-gray-500 text-center'>No item matched your search</p>
            :

                <div className='flex w-full gap-10 justify-center my-10'>
            	  <Pagination count={pageList} page={pageNumber} onChange={(e,value)=>{
                    if(value){
                    dispatch(SETPAGINATION(value))
                    }else{
                         dispatch(SETPAGINATION(1))
                    }
                  }} />
                </div>
            }
       </section> 
 	)
 }
 
 export default CardList