 import {useEffect} from 'react'

 const Close =({children})=>{

 	useEffect(() => {
 		const func =()=>{

 		}
 		document.addEventListener('click',func)
 		return () => {
 			document.removeEventListener('click',func)
 		};
 	}, [])

 	return <>
 		{children}
 	</>
 }
 export default Close