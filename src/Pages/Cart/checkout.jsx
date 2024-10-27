 import { useEffect, useState } from 'react'
 import Navigation from '../.././components/appbar.jsx'
 import { Container, Button, Backdrop, CircularProgress, Modal } from '@mui/material'
 import { useSelector, useDispatch } from 'react-redux'
 import { PLACEORDER, ORDERTAB, TOGGLEDROP, GETTOTAL, PACKAGING, HANDLEMODAL, OPENBACKDROP, ORDERS,CONTACT } from '../.././Slices/cart.js'
 import Lazy from '../.././components/lazyload.jsx'
 import { ArrowDropDown } from '@mui/icons-material'
 import { useNavigate } from 'react-router-dom'
  import { auth, db } from '../../.././firebase.js'

 import { doc, updateDoc ,arrayUnion,setDoc} from "firebase/firestore";
 import QRCode from 'qrcode';
 import { v4 as uuidv4 } from 'uuid';

 const CheckOut = () => {
     const [disabled, setDisabled] = useState(false)
     const navigate = useNavigate()
     const dispatch = useDispatch()
     const { phone, currentUser } = useSelector(state => state.auth)
     const { cartList, amount, subtotal, total, packaging, drop, modal, loading, error, qr, orders, orderNo, limit, contact } = useSelector((state) => state.cart)
     useEffect(() => {
         cartList.length < 1 && navigate('/cart')
         dispatch(GETTOTAL())
     }, [packaging])

     useEffect(() => {
         const number = (num) => {
             if (num.length > 3) {

                 return Number(num.replace(/[.,]/g, ''))
             } else {
                 return num
             }
         }
         if (number(total) > limit) {
             setDisabled(true)
         } else {
             setDisabled(false)
         }
     }, [total])

     const handleOrder = async (e) => {
            e.preventDefault()
         dispatch(OPENBACKDROP())
         try {
             // generate id
             const orderId = uuidv4()
             const timeStamp = new Date().toLocaleString()
             // order details
             const order = {
                 total: total,
                 packaging: packaging,
                 subtotal: subtotal,
                 orderlist: cartList
             }
             const qr = await QRCode.toDataURL(JSON.stringify({ uid:currentUser.uid,orderId, timeStamp}))
             const contactNo = contact ? contact : phone
             await setDoc(doc(db,'globalOrders',orderId),{
                     userId: currentUser.uid,
                     orderId,
                     userName:currentUser.displayName,
                     order,
                     timeStamp,
                     contactNo,
                     status: 'pending',
                     qr,
             })
             await updateDoc(doc(db, 'orders', currentUser.uid), {
                 orders: arrayUnion({
                     order,
                     orderId,
                     timeStamp,
                     contactNo,
                     status: 'pending',
                     qr,
                 })
             })
             dispatch(PLACEORDER(qr))
         } catch (err) {
             alert(err)
             dispatch(PLACEORDER())

         }
     }
     return (
         <div>
            <Navigation mt={20}/>
            <Backdrop open={loading} sx={{zIndex:'1200'}}>
             <div className='bg-white flex flex-col items-center justify-center rounded shadow-inner w-64 h-64 gap-10'>  
             <p className='text-xl'>Order Processing </p>
             <div className="loader mt-4"></div>
             </div>
            </Backdrop> 

            <Modal 
            open={modal}
            onClose={()=>{
                dispatch(HANDLEMODAL())
                navigate('/cart')
                }
            }>
                
              <div className='bg-white grid place-items-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-5 rounded-xl'> 
                    <p className='font-extrabold text-3xl text-accent '> trovemart</p>
                    <p className='text-center py-1' >Scan the QR code below at any trovemart store </p>

                    <div className='w-64'>  
                        <img src={qr} alt=""/>
                    </div>  
                </div>  
            </Modal>    
            <Container maxWidth='xl'
            sx={{
                minHeight:'40rem'
            }}
            >
            <section className='flex flex-col-reverse md:flex-row'>
                <article className='bg-white h-fit basis-3/5 px-4 rounded-xl'>
                    <div>
                    <form action="" onSubmit={handleOrder}>
                        <div className='grid gap-2 py-5'>   
                        <label htmlFor="Contact" className='font-bold text-xl'>Contact</label>
                        <input placeholder='Phone Contact' id='contact' type="tel" pattern="[0-9]{11}"  placeholder={phone} required={!phone && true} value={contact} onChange={(e)=>dispatch(CONTACT(e.target.value))} className='rounded-xl border-2 p-3'/>
                        </div>
                   
                    <div className='flex gap-2'>
                        <input type="checkbox" checked={packaging.bool} className='before:bg-white' id='packaging' onChange={(e)=>dispatch(PACKAGING(e.target.checked))}/>
                        <label htmlFor="packaging">Request Packaging for an extra ₦{1000}</label>
                    </div>
                    <div className='py-5'>
                        <div className="flex justify-between items-center">
                            <p className="">SubTotal</p>
                            <p className="">₦ {subtotal}</p>
                        </div>
                        <div className={`flex justify-between ${!packaging.bool && 'hidden'} items-center py-3`}>
                            <p className=""> Packaging</p>
                            <p className="">₦ {packaging.value}</p>
                        </div>
                        <div className="flex justify-between items-center pt-7 font-bold text-xl">
                            <p className="">Total</p>
                            <p className=""> <span className='text-sm text-gray-400 pr-3'>NGN</span> ₦{total}</p>
                        </div>
                        <div className='flex justify-center flex-col pt-11'>
                        { disabled && 
                            <p className="text-red-400"> * Order Limit is ₦ {limit}</p>
                        }
                    <Button variant='contained' type='submit' disabled={disabled} sx={{
                        background:'#E51E54',
                        width:'100%',
                        py:'.8rem'
                    }} >
                        Complete Order
                    </Button>
                        </div>
                    </div>
                     </form>
                    </div>
                </article>
                <article className='px-4 basis-2/5'>
                  <div className='flex justify-between'>   
                    <p className='text-sm text-gray-400 hidden md:block'>Order Summary</p>
                    <p className='md:hidden text-sm text-gray-400' onClick={()=>dispatch(TOGGLEDROP())}>Show Order Summary <ArrowDropDown/> </p>
                    <p className='text-xl font-extrabold'>₦ {total}</p>
                  </div>
                    <div className={`grid gap-6  ${drop ? 'h-full py-2': 'h-0'}  overflow-hidden md:h-fit md:py-2 `}>
                        {
                            cartList.map(item=>{
                                const {id,name,image,price,amount} =item 
                                    return <div key={id} className=" flex items-center justify-between">
                                        <div className='flex gap-4 items-center'>
                                            <div className=" relative">
                                               <div className="w-16 rounded-xl overflow-hidden">    
                                                <Lazy src={image} variant='rectangular' width={65} height={60} />
                                               </div>
                                                <p className="absolute -top-2 bg-accent w-4 h-4 p-1 -right-2 rounded-full grid place-content-center text-xs text-white">
                                                    {amount}
                                                </p>
                                            </div>
                                            <p className="line-clamp-2 max-w-64">{name}</p>
                                        </div>
                                        <div>
                                            <p> ₦{price}</p>
                                        </div>
                                    </div>
                            })
                        }
                    </div>
                </article>
            </section>
            </Container> 
        </div>
     )
 }

 export default CheckOut