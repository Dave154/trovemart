 import { useEffect } from 'react'
 import Card from './card.jsx'
 import { useDispatch, useSelector } from 'react-redux'
 import { SETCURRENTTAB,SETPAGINATION} from '.././Slices/cashier.js'
 import Scanner from './scanner.jsx'
 import {Modal,Pagination} from '@mui/material'

 const Orders = () => {
     const {orders,scannerOpen,pageList,pageNumber,paginatedOrders,currentTab} = useSelector(state => state.cashier)
     const dispatch = useDispatch()

     useEffect(()=>{
             dispatch(SETPAGINATION(pageNumber))
         },[orders])
     useEffect(()=>{
        dispatch(SETCURRENTTAB('Orders'))
     },[])
     return (
        <>
            
         <div className='grid  grid grid-cols-auto-fit-lg gap-5 '>
             <Scanner/>

             {
                        paginatedOrders.length >0 ?
                        paginatedOrders.map((item,index)=>{
                            return <Card item={item} key={index}/>
                        }):
                  <p className="text-center text-gray-500">No Order</p>
                }  
        </div>
        {
             paginatedOrders.length > 0 && 
            <div className={`grid justify-center my-10 `}>
                <Pagination count={pageList} page={pageNumber} onChange={(e,value)=>{
                    if(value){
                    dispatch(SETPAGINATION(value))
                    }else{
                         dispatch(SETPAGINATION(1))
                    }
                  }} />
            </div>
        }
        </>
     )
 }

 export default Orders