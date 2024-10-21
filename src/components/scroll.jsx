import { Fab } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import {ArrowBackIosNewRounded, ArrowForwardIosRounded} from '@mui/icons-material'

 const ScrollBtn= ({scrollRef,top}) => {

	const { scrollPrev, scrollNext } = useSelector((state) => state.appbar)
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
 	return (
 		<div>
 			<Fab onClick={()=>listScroll('left')} aria-label="Back"   className='scroll-back' sx={{
				display: (!scrollPrev && top) && 'none',
				background:'white',
				position:'absolute',
				top: top ? '0': '40%',
				left:'0',
				transform:'scale(0.5)',
				zIndex:1,
			}}>
  			<ArrowBackIosNewRounded />
			</Fab>
			<Fab onClick={()=>listScroll('right')}   aria-label="Forward" className='scroll-forward' sx={{
			 display: (!scrollNext && top) && 'none' ,
				background:'white',
				position:'absolute',
				top: top ? '0': '40%',
				right:'0',
				transform:'scale(0.5)',
				zIndex:1,
			}}>
			  <ArrowForwardIosRounded />
			</Fab>
 		</div>
 	)
 }
 
 export default ScrollBtn