import './App.css'
import Home from './Pages/HomePage'
import MainCategories from './Pages/HomePage/maincategories.jsx'
import {Routes,Route} from 'react-router-dom'
const App=() =>{
  return <Routes>
   <Route path='/' element={<Home/>}>
    <Route path= ':category' element={<MainCategories/>}/>
   </Route>
    <Route path='*' element={<h1>ERROR</h1>}/>
  </Routes>
}
export default App
