  import React, { useContext, useEffect } from 'react'
  import { doc, getDoc, updateDoc } from "firebase/firestore";
  import { db } from '../.././firebase.js'
 import {SETLOADING,SETERROR,SETORDER} from '.././Slices/cashier.js'
 import {useDispatch} from 'react-redux'
  const CashContext = React.createContext();
  const CashProvider = ({ children }) => {
   const dispatch=useDispatch()  


      const getInitials = (name) => {
          const nameParts = name ?.split(' ');
          const initials = nameParts ?.map(item => item.charAt(0).toUpperCase()).join('');

          return initials
      }

      const updateOrderByOrderId = async (userId, orderId, newOrderData) => {
          try {
              const resp = await getDoc(doc(db, 'orders', userId))
              resp.data().orders.forEach(async (item, index) => {
                  if (item.orderId === orderId) {
                      const updatedOrders = [...resp.data().orders];
                      updatedOrders[index] = {
                          ...updatedOrders[index],
                          ...newOrderData,
                      };
                      const userDocRef = doc(db, "orders", userId);
                      await updateDoc(userDocRef, {
                          orders: updatedOrders
                      });
                  }
              });
          } catch (err) {
              console.log(err)
          }

      };
       const getOrder=async(id)=>{
         try{
          dispatch(SETLOADING(true))
          dispatch(SETERROR(false))
          const resp =  await getDoc(doc(db,'globalOrders', id))
          dispatch(SETORDER(resp.data()))
          dispatch(SETLOADING(false))
         }catch(err){
            dispatch(SETLOADING(false))
            dispatch(SETERROR(true))
         }
      }
      const recover = async (orderId,userId) => {
          dispatch(SETLOADING(true))
          try {
              await updateDoc(doc(db, 'globalOrders', orderId), {
                  status: 'pending'
              })
              await updateOrderByOrderId(userId, orderId, { status: 'pending' });

              dispatch(SETLOADING(false))
              getOrder(orderId)
          } catch (err) {
            console.log(err)
              dispatch(SETLOADING(false))
              dispatch(SETERROR(true))

          }
      }
      
      return <CashContext.Provider value={{
         updateOrderByOrderId,
         getInitials,
         recover,
         getOrder
      }}>
    {children}
  </CashContext.Provider>
  }

  const useGlobe = () => {
      return useContext(CashContext)
  }
  export { useGlobe, CashProvider }