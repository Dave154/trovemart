 import { useEffect } from 'react'
 import Card from './card.jsx'
 import { doc, onSnapshot, collection ,getDocs,query,limit,orderBy} from "firebase/firestore";
 import { db } from '../.././firebase.js'
 import { useDispatch, useSelector } from 'react-redux'
 import { SETCURRENTTAB, SETORDERS,SETABANDONED, SETLOADING ,SETALLORDERS,SETPAGINATION} from '.././Slices/cashier.js'
 import Scanner from './scanner.jsx'
 import {Modal,Pagination} from '@mui/material'

 const Orders = () => {
     const { orders, abandoned,allorders,loading,scannerOpen,orderTab,pageList,pageNumber,searchResults} = useSelector(state => state.cashier)
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
             // updateAbandonedOrders()
         });
     }, [])
     return (
        <>
            
         <div className='grid  grid grid-cols-auto-fit-lg gap-5 '>
             <Scanner/>

             {
                orderTab === 'Active' &&
                  <>
                      {
                        orders.length >0 ?
                        orders.map((item,index)=>{
                            return <Card item={item} key={index}/>
                        }):
                  <p className="text-center text-gray-500">No Order</p>
                 }
                  </>

                }
                 {  orderTab === 'Abandoned'&&
                  <>
                       {
                         abandoned.length >0 ?
                         abandoned.map((item,index)=>{
                             return <Card item={item} key={index}/>
                         }):
                   <p className="text-center text-gray-500">No Order</p>
                  }
                   </>

             }    
             {
                orderTab === 'All Orders' &&
                <>
                       {
                         allorders.length >0 ?
                         (searchResults? searchResults:allorders).map((item,index)=>{
                             return <Card item={item} key={index}/>
                         }):
                   <p className="text-center text-gray-500">No Order</p>
                  }
                   </>
             }  
        </div>
            <div className='grid justify-center my-10'>
                <Pagination count={10} page={pageNumber} onChange={(e,value)=>{
                    if(value){
                    dispatch(SETPAGINATION(value))
                    }else{
                         dispatch(SETPAGINATION(1))
                    }
                  }} />
            </div>
        </>
     )
 }

 export default Orders