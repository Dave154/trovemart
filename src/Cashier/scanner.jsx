 import QrScanner from 'react-qr-scanner';
 import { Modal } from '@mui/material'
 import { useDispatch, useSelector } from 'react-redux'
 import { SETCURRENTTAB, SETQRDATA, SETSCANNEROPEN } from '.././Slices/cashier.js'
  import { getDoc, doc } from 'firebase/firestore'
 import { db } from '../.././firebase.js'
 import {useNavigate } from 'react-router'

 const Scanner = () => {
     const dispatch = useDispatch()
     const navigate=useNavigate()
     const { scannerOpen,qrData} = useSelector(state => state.cashier)

     const handleScan = async(data) => {
      try{
         if (data) {
            dispatch(SETSCANNEROPEN(false))
             dispatch(SETQRDATA( JSON.parse(data.text) ))
               const qrinfo = JSON.parse(data.text)
               navigate(qrinfo.orderId)
          const res = await getDoc(doc(db, "globalOrders", qrinfo.orderId))
         return res.data()
         }
       }catch(err){
        console.log(err)
       }
     };

     const handleError = (error) => {
         alert(error);
     };

     return (
      <Modal open={scannerOpen}
      onClose={()=>dispatch(SETSCANNEROPEN(false))}>
     <div className=' w-72 h-72 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  overflow-hidden'>
     <div class="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-accent rounded"></div>
    <div class="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-accent rounded"></div>
    <div class="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-accent rounded"></div>
    <div class="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-accent rounded"></div>
 
      <QrScanner
        delay={1000}
        onError={handleError}
        onScan={handleScan}
        className='w-full h-full'
      />
       <div className="scan"></div>
      <div className='absolute top-0 text-white text-2xl text-center w-full'>
      </div>
      </div>
    </Modal>
     );
 };

 export default Scanner;