 import Card from './card.jsx'
 import { Container, Divider, AppBar, Skeleton, Pagination, Typography, Fab, Badge } from '@mui/material'
import { SETPAGINATION} from '.././Slices/products.js';
import { useDispatch, useSelector } from 'react-redux';

 const CardList = ({list}) => {
 	 	const dispatch = useDispatch();
 	 	 const { pageNumber, pageList} = useSelector((state) => state.products);
 	return (
 		 <section>
             <ul className=' grid grid-cols-auto-fit-sm md:grid-cols-auto-fit-md gap-4'>
            { list ? 
               list.map(item=>{
                // const {id,image,name,price}=item
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
                list?.length ===0 ?
            <p className='text-gray-500 text-center'>No item matched your search</p>
            :

                <div className='flex w-full gap-10 justify-center my-10'>
            	  <Pagination count={pageList} page={pageNumber} onChange={(e,value)=>{
                    if(value){
                        console.log(value)
                    dispatch(SETPAGINATION(value))
                    }else{
                         dispatch(SETPAGINATION(1))
                    }
                  }} />
{/*                    <button className='bg-gray-400 rounded p-6' onClick={()=>{
                        if(pageNumber > 1)
                        dispatch(SETPAGINATION(pageNumber - 1))
                    }}>Prev</button>
                    <button className='bg-gray-400 rounded p-6' onClick={()=> {
                        if(pageNumber < pageList){
                        dispatch(SETPAGINATION(pageNumber + 1)) 
                        }
                    }}>Next</button>*/}
                </div>
            }
       </section> 
 	)
 }
 
 export default CardList