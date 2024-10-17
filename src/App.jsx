import './App.css'
import {Alert} from '@mui/material'
import Home from './Pages/HomePage'
import MainCategories from './Pages/HomePage/maincategories.jsx'
import Allproducts from './Pages/HomePage/allproducts.jsx'
import Root from './Pages/HomePage/root.jsx'
import Cart from './Pages/Cart'
import {Routes,Route} from 'react-router-dom'
const App=() =>{
  return <>
  <Routes>
   <Route path='/Store' element={<Home/>}>
    <Route index element={<Root/>}/>
    <Route path= ':category' element={<MainCategories/>}/>
    <Route path='allproducts/:query' element={<Allproducts/>}/>
   </Route>
   <Route path='/cart' element={<Cart/>}/>
    <Route path='*' element={<h1>ERROR</h1>}/>
  </Routes>
  </>
}
export default App
