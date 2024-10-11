import { useRef, useEffect } from 'react'
import { Fab, Skeleton } from '@mui/material'
import { Add, ArrowBackIosNewRounded, ArrowForwardIosRounded } from '@mui/icons-material'
import pro from './products.json'
import drinks from '.././assets/drinks.svg'
import grain from '.././assets/grain.svg'
import laundry from '.././assets/laundry.svg'
import foodcupboard from '.././assets/food&cupboard.svg'
import { useDispatch, useSelector } from 'react-redux';
import { SETCATEGORIES, SETMAINCATEGORIES,SETCURRENTCATEGORY,SETPAGINATION ,SETDEPTH,SETCURRENTPRODUCT} from '.././Slices/products.js';
import Lazy from './lazyload.jsx'




const Categories = () => {
    const dispatch = useDispatch();
    const { products, categories,currentCategory,currentMain,productsDisplayed,currentProduct } = useSelector((state) => state.products);
    const nestedCategories = {}
    products ?.forEach(item => {
        const levels = item.category.split('/');

        levels.reduce((acc, level) => {
            if (!acc[level]) {
                acc[level] = {};
            }
            return acc[level];
        }, nestedCategories);
    });
    const test =Object.entries(nestedCategories).map((item,index) =>{
    	if(item[0] === currentMain[0]){
    		return Object.entries(item[1]).map(itemas => itemas[0])
    	}else{
    		console.log('error')
    	}
    })
    useEffect(() => {
        dispatch(SETMAINCATEGORIES(Object.keys(nestedCategories)))
        dispatch(SETCURRENTCATEGORY('All'))
    }, [products,currentMain])
    useEffect(()=>{
        dispatch(SETCATEGORIES(test[currentMain[1]]))
        dispatch(SETPAGINATION(1))
        dispatch(SETDEPTH(['Home',currentMain[0],currentCategory,currentProduct]))
    },[products,currentMain,currentCategory,currentProduct])
    useEffect(() => {
    	dispatch(SETCURRENTPRODUCT([]))
    }, [currentMain,currentCategory])

    const scrollRef = useRef(null)
    const listScroll = (where) => {
        if (scrollRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
            const scrollAmount = where === 'left' ? -250 : 250;

            scrollRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });
        }
    }
    return (
        <div className='list_container relative'> 
			<ul className="flex overflow-auto gap-10 list py-2 " ref={scrollRef}>
			<Fab onClick={()=>listScroll('left')} aria-label="Back"   className='scroll-back' sx={{
				display:'none',
				background:'white',
				position:'absolute',
				top:'0',
				left:'0',
				transform:'scale(0.5)',
				zIndex:1,
			}}>
  			<ArrowBackIosNewRounded />
			</Fab>
			<Fab onClick={()=>listScroll('right')}   aria-label="Forward" className='scroll-forward' sx={{
				background:'white',
				position:'absolute',
				top:'0',
				right:'0',
				transform:'scale(0.5)',
				zIndex:1,
			}}>
			  <ArrowForwardIosRounded />
			</Fab>
				{ (categories && categories.length > 0)?
					categories.map((item,i)=>{
					return <li key={i} className={`grid place-items-center p-2  cursor-pointer border-gray-200 ${item === currentCategory && 'border-b-2 border-gray-500'} h-full hover:border-b-2 `} onClick={()=> dispatch(SETCURRENTCATEGORY(item))}>
						<i> 
						<Lazy src={drinks} variant='circular' classes="w-4" width={30} height={30}/>
						</i>
					<p className='whitespace-nowrap text-sm'>{item}</p>

					</li>
				}):Array(20).fill(0).map((item,index)=>{
					return <div className="grid place-items-center" key={index}>
						 <Skeleton variant="circular" width={30} height={30}  
						 />
						 <Skeleton variant="text" width={80}/>
						 
					</div>
				})
				}
			</ul>
		</div>
    )
}

export default Categories 