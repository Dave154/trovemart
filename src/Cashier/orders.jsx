 import { useEffect } from 'react'
 import Card from './card.jsx'
 import { doc, onSnapshot, collection ,getDocs,query,limit,orderBy} from "firebase/firestore";
 import { db } from '../.././firebase.js'
 import { useDispatch, useSelector } from 'react-redux'
 import { SETCURRENTTAB, SETORDERS,SETABANDONED, SETLOADING ,SETALLORDERS,SETPAGINATION,SETORDERTAB} from '.././Slices/cashier.js'
 import Scanner from './scanner.jsx'
 import {Modal,Pagination} from '@mui/material'

 const Orders = () => {
     const {orders,scannerOpen,pageList,pageNumber,paginatedOrders,currentTab} = useSelector(state => state.cashier)
     const dispatch = useDispatch()


     useEffect(() => {
         const ordersRef = query(collection(db, 'globalOrders'), orderBy('createdAt','desc'));
         dispatch(SETLOADING(true))
         const unsub = onSnapshot(ordersRef, (snapshot) => {
             const allOrders = [];
             snapshot.forEach((doc) => {
                 allOrders.push(doc.data());
             });

             dispatch(SETORDERS(allOrders.filter(item=>item.status==='pending')))
             dispatch(SETABANDONED(allOrders.filter(item=> item.status==='abandoned')))
             dispatch(SETALLORDERS(allOrders))
             dispatch(SETLOADING(false))
         });
     }, [])
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