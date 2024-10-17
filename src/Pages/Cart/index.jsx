import Navigation from '../.././components/appbar.jsx'
import { Container, Button } from '@mui/material'
import {ArrowBack,Delete,Phone} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate}  from 'react-router-dom'
import logo from '../.././assets/trove.svg'
import Lazy  from  '../.././components/lazyload.jsx'
import Card from '../.././components/card.jsx';
import AmountToggler from '../.././components/amountToggler.jsx'
import {REMOVEITEM} from '../.././Slices/cart.js';

const Index = () => {
	const dispatch= useDispatch()
	const navigate = useNavigate()
    const { cartList , amount, subtotal,recentlyViewed} = useSelector((state) => state.cart)
    return (
        <div>
		<Navigation/> 
		<Container maxWidth = 'xl'>
			<div className="grid gap-1 ">
			<i className='w-8 h-8 bg-red-50 hover:bg-red-100 rounded-full grid place-content-center' onClick={()=>{
				navigate(-1)
			} }
			><ArrowBack sx={{
				color:'#E51E54',
				fontSize:'1.2rem',
				cursor:'pointer'
			}}/></i>
			<article className='grid gap-4'>
		{ cartList.length >0  ? 
			<div className="">
				<div className="hidden"
				>
					<p className='text-gray-400 pb-2'>Cart Summary</p>
					<div className="bg-white flex justify-between rounded-xl p-1">
						<p>SubTotal</p>
						<p>₦ {subtotal}</p>
					</div>
				</div>
				<div className=" md:flex gap-7">
				 <div className="w-full">
					<p className="text-gray-400 py-4">Cart({amount})</p>
					<div className="bg-white grid gap-4 rounded-xl">
						{cartList.map(item=>{
							const {id,image,name,price,amount}= item
							return <div key={id} className="shadow rounded-xl p-3">
								<div className="flex gap-2">
									<div className='w-32 h-38'>
									<Lazy src={image} alt='image' variant="rectangular" width={100} height={100} classes=''/>
									</div>
									<div>
										<p>{name}</p>
										<p>₦{price}</p>
									</div>
								</div>
								<div className="flex py-2 justify-between items-center">
									<Button className="flex items-center cursor-pointer" sx={{
										color:'#E51E54'
									}} onClick={()=>{
										dispatch(REMOVEITEM(id))
									}}>
										<Delete size='large'/>
										<p className="text-sm">Remove</p>
									</Button>
									<div className="w-32">
									<AmountToggler value={amount} id={id}/>
									</div>
								</div>
							</div>
						})}
					</div>
				</div>
				<article className="md:bg-white  mt-10 h-fit rounded-xl md:shadow">
					<div>
					<p className="p-2 bg-white rounded-xl shadow md:shadow-none ">Cart Summary</p>
					<hr/>
					<div className="flex justify-between py-3 px-2">
						<p>SubTotal</p>
						<p>₦ {subtotal}</p>
					</div>
						
					</div>
					<hr/>
					<div className="flex gap-2 my-6 px-2">
						<Button variant='outlined' sx={{
							borderColor:'#E51E54',
							color: '#E51E54'
						}} >
							<Phone/>
						</Button>
						<Button variant="contained" sx={{
							width:'100%',
							minWidth:'15rem',
							background: '#E51E54',
						}} >
							Checkout ₦ {subtotal}
						</Button>
					</div>
				</article>
				</div>
			</div> : 
				<div className="bg-white p-4 rounded-xl ">
				  <div className="grid place-items-center gap-7">  	
					<span className="bg-gray-100 rounded-full w-32 h-32 block p-4 overflow-hidden">
						<img src={logo} alt="cartimage" />
					</span>
					<h4 className="font-bold">Your Cart is Empty!</h4>
					<p className=' text-center'>Browse Our Categories and discover our best deals!</p>
					<Button variant='contained' sx={{
						background: '#E51E54',
						paddingBlock:'1rem'
						
					}} onClick={()=>{
						navigate('/store')
					}}>
						Start Shopping
					</Button>
				  </div>
				</div>
	}

			</article>
			
			<div className='bg-white rounded-xl p-4 overflow-hidden grid' >
				<h3 className='text-xl'>
					Recently viewed
				</h3>
				<div className='flex py-4 gap-4  overflow-auto horizontal-scroll '>
				
					{ recentlyViewed.slice(0, 10).map((item)=>{
                            const {name,image,price,id}=item
                            return <div className=' bg-white shadow-md  justify-center rounded overflow-hidden w-full max-w-48 min-w-48' key={id}>
                             <div className=' w-full h-32'> 
                              <Lazy src={image} alt='image' variant="rectangular" height='100%'
                              />
                             </div>
                             <div className='p-3'>
                             <p>{name}</p>
                             <p>₦ {price}</p>
                             </div>      
                            </div>
                        })   
                        }
				
				</div>
			</div>
			</div>
		</Container> 
		</div>
    )
}

export default Index