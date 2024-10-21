import { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import CardList from '../.././components/cardlist.jsx'
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../.././components/appbar.jsx'
import { SETPAGINATION,SETPRODUCTSDISPLAYEDONSEARCH} from '../.././Slices/products.js';
import Breadcrumbs from '../.././components/breadcrumbs.jsx'

  const Allproducts = () => {
    const {category}=useParams()
    const dispatch = useDispatch();
    const {paginatedProducts, pageNumber, pageList, depth,products} = useSelector((state) => state.products);
    
  	const {query }=useParams()
    useEffect(()=>{
        dispatch(SETPRODUCTSDISPLAYEDONSEARCH(query))
        dispatch(SETPAGINATION(1)) 
    },[products,query])
  	return (
  		<div>
      <Navigation mt={20}/>
        <Breadcrumbs />
        <CardList list={paginatedProducts} />

  		</div>
  	)
  }
  
  export default Allproducts