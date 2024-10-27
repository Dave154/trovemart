 import { useEffect } from 'react'
 import Card from './card.jsx'
 import { doc, onSnapshot, collection ,Timestamp,getDocs} from "firebase/firestore";
 import { db } from '../.././firebase.js'
 import { useDispatch, useSelector } from 'react-redux'
 import { SETCURRENTTAB, SETORDERS,SETABANDONED, SETLOADING } from '.././Slices/cashier.js'
 import Scanner from './scanner.jsx'
 import {Modal} from '@mui/material'

 const Orders = () => {
     const { orders, abandoned,loading,scannerOpen,orderTab} = useSelector(state => state.cashier)
     const dispatch = useDispatch()

 

     useEffect(() => {

         const ordersRef = collection(db, 'globalOrders');
         dispatch(SETLOADING(true))
         const unsub = onSnapshot(ordersRef, (snapshot) => {
             const allOrders = [];
             snapshot.forEach((doc) => {
                 allOrders.push(doc.data());
             });

             dispatch(SETORDERS(allOrders.filter(item=> item.status==='pending').sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp))))
             dispatch(SETABANDONED(allOrders.filter(item=> item.status==='abandoned').sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp))))
             dispatch(SETLOADING(false))
             // updateAbandonedOrders()
         });
     }, [])
     return (
         <div className='grid  grid grid-cols-auto-fit-lg gap-10 '>
             <Scanner/>

             {
                orderTab === 'Active' ? 
                  <>
                      {
                        orders.length >0 ?
                        orders.map((item,index)=>{
                            return <Card item={item} key={index}/>
                        }):
                  <p className="text-center text-gray-500">No Order</p>
                 }
                  </>
                :  <>
                      {
                        abandoned.length >0 ?
                        abandoned.map((item,index)=>{
                            return <Card item={item} key={index}/>
                        }):
                  <p className="text-center text-gray-500">No Order</p>
                 }
                  </>
             }        
        </div>
     )
 }

 export default Orders