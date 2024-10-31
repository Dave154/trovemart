import './App.css'
import {useEffect} from 'react'
import {onAuthStateChanged} from 'firebase/auth'
import {getDoc,doc,onSnapshot} from 'firebase/firestore'
import {auth,db} from '../firebase.js'
import { Alert } from '@mui/material'
import Home from './Pages/HomePage'
import MainCategories from './Pages/HomePage/maincategories.jsx'
import Allproducts from './Pages/HomePage/allproducts.jsx'
import Root from './Pages/HomePage/root.jsx'
import Cart from './Pages/Cart'
import Orders from './Pages/Cart/orders.jsx'
import CheckOut from './Pages/Cart/checkout.jsx'
import Login from './Pages/Auth/login.jsx'
import SignUp from './Pages/Auth/signup.jsx'
import ErrorComponent from './Pages/error.jsx'
import Footer from './components/footer.jsx'
import Cashier from './Cashier'
import CashierOrders from './Cashier/orders.jsx' 
import CashierAuth from './Cashier/signin.jsx' 
import UserManage from './Cashier/usermanagement.jsx' 
import User from './Cashier/user.jsx' 

import OrderDetails from './Cashier/orderDetails.jsx'
import { Routes, Route ,Navigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {CURRENTUSER,PHONE} from './Slices/auth.js'
import {fetchProducts} from './Slices/products.js'
import {ORDERS,SETLOADING,SETERROR} from './Slices/cart.js'

const App = () => {
  const dispatch = useDispatch()
  const {currentUser,loading} = useSelector(state=>state.auth)
  const {currentCashier} = useSelector(state=>state.cashier)


    useEffect(() => {
        dispatch(fetchProducts());         
    }, []);

    useEffect(()=>{
        const getNo = async()=>{
              try{
                 const res =  await getDoc(doc(db,'users', currentUser.uid))
                 if(res.exists()){
                   dispatch(PHONE(res.data().phone))
                 }
              }catch(err){
                console.warn(err)
              }
            } 
                getNo()
    },[currentUser])

     useEffect(()=>{
        const unsub=onAuthStateChanged(auth,(user)=>{
            dispatch(CURRENTUSER(user? {displayName:user.displayName,uid:user.uid,email:user.email}: null   ))
        })
            return ()=> unsub()
    },[])

     useEffect(()=>{
        if(currentUser){
        const unsub = onSnapshot(doc(db, "orders", currentUser.uid), (doc) => {
                 if (!doc.data()) {

                 } else {
                  dispatch(ORDERS(doc.data().orders.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp))))
                 } 
             });
                  return ()=>unsub()
        }else{
             dispatch(ORDERS([]))

        }
    },[currentUser])


 return <>
  <Routes>
    <Route path='/' element={<Home/>}>
        <Route index element={<Root/>}/>
        <Route path= ':category' element={<MainCategories/>}/>
        <Route path='allproducts' element={<Allproducts/>}>
          <Route path=':query' />
        </Route>
    </Route>

    <Route path='/cart' element={ !currentUser && <Navigate to='/login'/>}>
       <Route  index element={<Cart/>}/>
       <Route path='checkout' element={<CheckOut/>}/>
       <Route path='Orders' element= {<Orders/>} />
     </Route>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/login' element={<Login/>} />

    <Route path='/C-A-S-H-I-E-R' element={currentCashier ? <Cashier/>: <Navigate to='/C-A-S-H-I-E-R/auth'/>}>
      <Route index element={<CashierOrders/>}/>

      <Route path='usermanagement'  element={<UserManage/>}>  
      <Route path=':userId' element={<User/>}/>
      </Route>
      <Route path=':id' element={<OrderDetails/>}/>
    </Route>
    <Route path='/C-A-S-H-I-E-R/auth' element={<CashierAuth/>} />
    <Route path='/error' element={<ErrorComponent/>}/>
    <Route path='*' element={<ErrorComponent/>}/>
  </Routes>
  </>
}
export default App