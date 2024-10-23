import './App.css'
import {useEffect} from 'react'
 import {onAuthStateChanged} from 'firebase/auth'
 import {getDoc,doc} from 'firebase/firestore'
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
import Footer from './components/footer.jsx'
 import { Routes, Route ,Navigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {CURRENTUSER,PHONE} from './Slices/auth.js'
import {fetchProducts} from './Slices/products.js'
import {getOrders} from './Slices/cart.js'
const App = () => {
  const dispatch = useDispatch()
  const {currentUser} = useSelector(state=>state.auth)

// useEffect(()=>{
//   },[])
    useEffect(() => {
        dispatch(fetchProducts('https://products-orcin.vercel.app/product?page=1&limit=3761'));         
    }, []);
useEffect(()=>{
    const getNo = async()=>{
          try{
             const res =  await getDoc(doc(db,'users', currentUser.uid))
             if(res.exists()){
              console.log(res.data().phone)
               dispatch(PHONE(res.data().phone))
             }
          }catch(err){
            console.log(err)
          }
        } 
            getNo()
            if(currentUser){
        dispatch(getOrders(currentUser.uid))
            }
},[currentUser])

     useEffect(()=>{
      
        const unsub=onAuthStateChanged(auth,(user)=>{
            dispatch(CURRENTUSER(user))
        })
            return ()=> unsub()
    },[])


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
    <Route path='*' element={<h1>ERROR</h1>}/>
  </Routes>
  <Footer/>
  </>
}
export default App