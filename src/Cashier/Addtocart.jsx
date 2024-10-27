import {Add,SearchRounded ,Close} from '@mui/icons-material'
 import { Fab, Modal } from '@mui/material'
 import { SETISADD,SETADDQUERY,ADDITEM} from '.././Slices/cashier.js'


import {useSelector,useDispatch} from 'react-redux'
 const 	Addtocart = () => {
 	const dispatch = useDispatch()
   const {products} =useSelector(state=>state.products)
   const {isAdd,addtocartquery,orderDetails} =useSelector(state=>state.cashier)
   
   const productsSearch=products.filter(item=> {
   	if(item.name.toLowerCase().includes(addtocartquery.toLowerCase() )|| item.category.toLowerCase().includes(addtocartquery.toLowerCase())){
   		return item
   	}
   })
  
  const handleSubmit=(e)=>{
  	e.preventDefault()
  }
 	return (
 		<Modal 
 			open={isAdd}
 			onClose={()=>dispatch(SETISADD(false))}
 		>
 			<div className='bg-white grid place-items-center gap-3 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 px-5 rounded-2xl w-full max-w-screen-sm p-4 '>
 			  <i className="absolute top-1 right-1 px-4 hover:bg-red-100 rounded cursor-pointer"
 			  	onClick={()=>{
 			  		dispatch(SETISADD(false))
 			  	}}
 			  ><Close/></i>
 				<span className='flex items-center gap-2'>
 					<i>	<Add sx={{
 						color:'#E51E54'
 					}}/></i>
 				<p className='font-bold text-xl text-gray-400'>	Add item to Cart</p>
 				</span>
 				
 				<form action="" onSubmit={handleSubmit} className='flex w-full  rounded-3xl border-2 border-gray-100 overflow-hidden p-1 mx-auto justify-between'>
 					<input type="" placeholder='Enter product name'  className='w-full' value={addtocartquery} onChange={(e)=>dispatch(SETADDQUERY(e.target.value))}/>
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

 				<ul className='max-h-64 w-full grid gap-3 p-2 overflow-auto'>
 					{
 						productsSearch.slice(0,20).map(item=>{
 							const {name,price,id,image}=item
 							return <li className="shadow-sm rounded-xl flex justify-between items-center px-4 cursor-pointer hover:shadow hover:bg-gray-100" 
 								onClick={()=>{
 									dispatch(ADDITEM(item))
 								}}
 							>
 								<div className="flex items-center gap-3">
 								<span className="w-16 rounded-xl block ">
 									<img src={image} alt="" className=""/>
 								</span>
 									<p className='max-w-64 truncate '>{name}</p>
 								</div>
 								<p className="font-bold ">₦ {price}</p>

 							</li>
 						})
 					}
 				</ul>
 			</div>
 		</Modal>
 	)
 }
 
 export default 	Addtocart