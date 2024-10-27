  import React, { useContext, useEffect } from 'react'
  import { doc, getDoc, updateDoc } from "firebase/firestore";
  import { db } from '../.././firebase.js'


  const CashContext = React.createContext();
  const CashProvider = ({ children }) => {

      const getInitials=(name)=>{
       const nameParts = name?.split(' ');
       const initials = nameParts?.map(item => item.charAt(0).toUpperCase()).join('');

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
      return <CashContext.Provider value={{
         updateOrderByOrderId,
         getInitials
      }}>
    {children}
  </CashContext.Provider>
  }

  const useGlobe = () => {
      return useContext(CashContext)
  }
  export { useGlobe, CashProvider }