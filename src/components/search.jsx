 import {useEffect} from 'react'
 import {useNavigate} from 'react-router-dom'
 import { Fab,TextField, Button } from '@mui/material'
 import { SearchRounded,AccessTime } from '@mui/icons-material'
 import { useDispatch, useSelector } from 'react-redux';
 import { DYNAMICSEARCH } from '.././Slices/search.js';
 import { SEARCH, HANDLESEARCHOPEN, HANDLESEARCHCLOSE,SEARCHARRAY,CLEARHISTORY} from '.././Slices/search.js';
 import {SETPRODUCTSDISPLAYEDONSEARCH ,SETPAGINATION} from '.././Slices/products.js';
 
 import Close from './close.jsx'

 const checkInput = (input) => {
     const regex = /^[A-Za-z]+( [A-Za-z]+)?$/;

     if (!regex.test(input)) {
         input = input.replace(/\s+/g, ' ').trim();
     }
     return input;
 }


 const Search = ({ placeholder }) => {
     const dispatch = useDispatch()
     const navigate = useNavigate()
     const { scroll } = useSelector((state) => state.appbar);
     const {products} = useSelector((state) => state.products);
     const { searchopen, dynamicquery, searchOptions, recentlySearched } = useSelector((state) => state.search)


     useEffect(() => {
        const allcat =[]
    		 products?.map((item)=>{
     //	BASED ON  CATEGORY
     	   const levels = item.category.split('/');
         levels.map(item=> allcat.push(item))
         //BASED ON NAME
        const firstNOIndex = item.name.search(/\,/)
        	firstNOIndex !== -1 ? allcat.push(item.name.substring(0,firstNOIndex-1)): allcat.push(item.name)

           })
    		 dispatch(SEARCHARRAY([...new Set(allcat)]))
     }, [products])
     const handleSubmit = (value) => {
         if (value.length > 0) {
             const searchParam = checkInput(value)
             dispatch(SEARCH(searchParam))
             dispatch(HANDLESEARCHCLOSE())
             dispatch(DYNAMICSEARCH())
             navigate(`/allproducts/${encodeURIComponent(searchParam)}`)
         }
     }
     return <article className=''>
 <form  className={`flex w-full md:w-1/2  rounded-3xl border-2 border-gray-100 overflow-hidden p-1 mx-auto justify-between ${scroll && ' md:absolute top-2 left-[47%] md:-translate-x-1/2 '}`} 
 onSubmit={(e)=>{
 	e.preventDefault()
 	handleSubmit(e.target[0].value)
 }}>
     <input type="search" className=' w-full p-2'  placeholder={placeholder} value={dynamicquery} onFocus={()=>	dispatch(HANDLESEARCHOPEN())} onChange={(e)=>{
     	dispatch(DYNAMICSEARCH({ list:products, params:e.target.value}))
     	dispatch(HANDLESEARCHOPEN())
     } }/>

		<Fab className='w-full'  type='submit' sx={{
			background:'#E51E54',
			width:'3.2rem',
			zIndex:'1',
			svg:{
				color:'#fff'
			},
		   '&:hover': {
          '& svg': {
            color: '#E51E54',
          },
        },
		}}
		 aria-label="Search"
		 size='medium'>
  		<SearchRounded />
	</Fab>
	</form>
			<Close Func={()=>HANDLESEARCHCLOSE()} condition={searchopen}>	
 				<div className={` ${!searchopen && 'hidden'} absolute w-full autocomplete  -bottom-100 px-3 left-1/2 -translate-x-1/2  z-10 md:w-1/2 rounded-xl bg-white shadow-xl overflow-auto max-h-72`}>
     		 {
     		 	dynamicquery.length > 0 ? 
				 <div className="">
     		 	<ul className="grid gap-3"
     		 	>
     		 		{
     		 			searchOptions.map((item,index)=>{
     		 				return <li  className='p-2 hover:bg-gray-100 rounded-2xl cursor-pointer rounded px-3' key={index}  onClick={()=>{
     		 				handleSubmit(item)
     		 				}}>{item}</li>
     		 			})
     		 		}
     		 	</ul>
     		 </div>:  
     		 <div className={`${recentlySearched.length ===0 && 'hidden'} py-3`}>
				     		 	 <div className="flex justify-between items-center ">
				     		 	 	<p className="text-gray-400"
				     		 	 	> Recently  Searched</p>
										<Button variant="text" onClick={()=>dispatch(CLEARHISTORY())}> 
											<p className="text-accent font-mono text-xs">Clear history</p>
										</Button>	
				     		 	 </div>
				     		 	 <ul className="grid gap-3">
				     		 	 	 {
				     		 	 	 recentlySearched.map((item,index)=>{
				     		 	 	 		return <li className='px-3 py-1 hover:bg-gray-100 rounded-2xl cursor-pointer flex items-center gap-2 font-thin' key={index} onClick={()=>handleSubmit(item)}>
				     		 	 	 		<i > <AccessTime sx={{color:'gray'}} /></i>
				     		 	 	 		<p>{item}</p>
				     		 	 	 		</li>
				     		 	 	 	})
				     		 	 	 }
				     		 	 </ul>
				    </div>
     		 }
     		
     		
   	  </div>

			</Close>
	         </article>


 }
 export default Search