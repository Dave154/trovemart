import { useEffect } from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import Topnav from '../.././components/topnav.jsx'
import Search from '../.././components/search.jsx'
import Categories from '../.././components/categories.jsx'
import CardList from '../.././components/cardlist.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { SETPRODUCTSDISPLAYED, SETPAGINATION,SETCURRENTCATEGORY } from '../.././Slices/products.js';
import Breadcrumbs from '../.././components/breadcrumbs.jsx'
 import Navigation from '../.././components/appbar.jsx'
 const MainCategories = () => {
 	const {category}=useParams()
 	const dispatch = useDispatch();
    const navigate=useNavigate()
    const {loading,paginatedProducts,mainCategories } = useSelector((state) => state.products);
    const { popup } = useSelector((state) => state.appbar);
    useEffect(() => {
        if(mainCategories){
            if(mainCategories.find(item=>item=== category)){
            dispatch(SETPRODUCTSDISPLAYED(category))

        }else{
            navigate('/error')
        }
        }
         dispatch(SETCURRENTCATEGORY('All'))
        dispatch(SETPAGINATION(1))
    }, [loading,category]);
 	return (
        <div className = "" >   
        <Navigation showCat mt={28}/>
       <Breadcrumbs/>
       <CardList list={paginatedProducts}/>
        </div>

 	)
 }
 
 export default MainCategories