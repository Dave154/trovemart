import { useState } from 'react'
import { Skeleton } from '@mui/material'
const Lazy = ({ src, alt ,variant,classes,width,height}) => {
    const [loaded, setLoaded] = useState(false)
    const handleImageLoad = () => {
        setLoaded(true);
    };
    return (
        <div className='h-full'>
        {
        	!loaded && <Skeleton variant={variant} width={width} height={height}/>
        }	
 		 <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad} 
        className= {` ${classes} ${!loaded && 'w-0 hidden'} `}
        />
     

 		</div>
    )
}

export default Lazy