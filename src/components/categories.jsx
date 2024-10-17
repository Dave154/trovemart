import { useRef, useEffect } from 'react'
import { Fab, Skeleton } from '@mui/material'
import { Add, ArrowBackIosNewRounded, ArrowForwardIosRounded,WhatshotOutlined } from '@mui/icons-material'
import pro from './products.json'
import drinks from '.././assets/drinks.svg'
import grain from '.././assets/grain.svg'
import laundry from '.././assets/laundry.svg'
import tissue from '.././assets/tissue.svg'
import beverage from '.././assets/beverage.svg'
import foodcupboard from '.././assets/food&cupboard.svg'
import cheese from '.././assets/cheese.svg'
import makeup from '.././assets/makeup.svg'
import lotion from '.././assets/lotion.svg'
import phone from '.././assets/phone.svg'
import hot from '.././assets/hot.svg'
import { useDispatch, useSelector } from 'react-redux';
import {  SETCURRENTCATEGORY, SETCURRENTPRODUCT } from '.././Slices/products.js';
import { HANDLECATEGORIESSCROLLNEXT, HANDLECATEGORIESSCROLLPREV } from '.././Slices/appbar.js';
import Lazy from './lazyload.jsx'

const Categories = () => {
	const icons={
		All: hot,
		FoodCupboard: foodcupboard, 
		DriedBeansGrainsRice: grain,
		Drinks:drinks,
		Laundry:laundry,
		HouseholdSupplies:tissue,
		Beverages:beverage,
		DairyCheeseEggs:cheese,
		BeautyPersonalCare:makeup,
		PersonalCare:lotion,
		MobilePhones:phone,
	}
    const scrollRef = useRef(null)
    const dispatch = useDispatch();
    const { scrollPrev, scrollNext } = useSelector((state) => state.appbar)
    const { categories, currentCategory, currentMain} = useSelector((state) => state.products);
   

    // SCROLL WITH BTN
      const listScroll = (where) => {
        if (scrollRef.current) {
            const scrollAmount = where === 'left' ? -250 : 250;
            scrollRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });
        }
    }
  
    // USEEFFECTS //
 
    useEffect(() => {
        dispatch(SETCURRENTPRODUCT([]))
    }, [currentMain, currentCategory])

    useEffect(() => {
        const scrolling = () => {
            const hasScrolled = scrollRef.current.scrollLeft > 10;
            const hasReachedEnd = scrollRef.current.scrollLeft + scrollRef.current.clientWidth >= scrollRef.current.scrollWidth;
            console.log(scrollRef.current.scrollLeft, hasScrolled, scrollPrev, hasReachedEnd)
            dispatch(HANDLECATEGORIESSCROLLPREV(hasScrolled))
            dispatch(HANDLECATEGORIESSCROLLNEXT(!hasReachedEnd))
        };
        const checkScroll =()=> {
        	  scrollRef.current.scrollLeft= 0
            if (scrollRef.current.scrollWidth > scrollRef.current.clientWidth) {
                dispatch(HANDLECATEGORIESSCROLLNEXT(true))
            } else {
                dispatch(HANDLECATEGORIESSCROLLNEXT(false))
            }
        }
        scrollRef.current.addEventListener('scroll', scrolling)
        checkScroll()
        return ()=> scrollRef.current?.removeEventListener('scroll', scrolling)
    }, [currentMain])

//
    return (
        <div className='list_container relative'> 
			<ul className="flex overflow-x-auto w-full  gap-10 list py-1 " ref={scrollRef}>
			<Fab onClick={()=>listScroll('left')} aria-label="Back"   className='scroll-back' sx={{
				display: !scrollPrev && 'none',
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
				display: !scrollNext && 'none' ,
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
						const icon= icons[item.replace(/[^a-zA-Z0-9]/g, '')]
					return <li key={i} className={`grid place-items-center p-2  cursor-pointer border-gray-200 ${item === currentCategory && 'border-b-2 border-gray-500'} h-full hover:border-b-2 `} onClick={()=> dispatch(SETCURRENTCATEGORY(item))}>
						<i> 
						<Lazy src={icon} variant='circular' classes="w-6" width={30} height={30}/>
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