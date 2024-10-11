 import { Fab } from '@mui/material'
 import { SearchRounded } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux';
import {  SEARCH,DYNAMICSEARCH} from '.././Slices/appbar.js';


 const checkInput=(input)=> {
  const regex = /^[A-Za-z]+( [A-Za-z]+)?$/;

  if (!regex.test(input)) {
    input = input.replace(/\s+/g, ' ').trim();
    console.log("Input was invalid, resetting to:", input);
  } else {
    console.log("Input is valid:", input);
  }

  return input;
}

 const Search = ({placeholder}) => {
 	const dispatch=useDispatch()
 	 const {dynamicSearch,scroll } = useSelector((state) => state.appbar);
 	const handleSubmit =(e)=>{
 			 e.preventDefault()
 			 if(e.target[0].value.length > 0){
 			 const searchParam =checkInput(e.target[0].value)
				dispatch(SEARCH(searchParam))	       
 			 }
 

 	}
     return <form  className={`flex w-full md:w-1/2  rounded-3xl border-2 border-gray-100 overflow-hidden p-1 mx-auto justify-between ${scroll && ' md:absolute top-2 left-1/2 md:-translate-x-1/2 '}`} onSubmit={handleSubmit}>
     <input type="search" className=' w-full p-2 ' placeholder={placeholder} value={dynamicSearch} onChange={(e)=>{
     	dispatch(DYNAMICSEARCH(e.target.value))
     } }/>
		<Fab className='w-full' type='submit' sx={{
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
 }
 export default Search