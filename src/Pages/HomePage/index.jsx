import {Outlet} from 'react-router-dom'
import { Container} from '@mui/material'
const HomePage = () => {
   return <>
    <Container maxWidth = 'xl' >
         <div> 
         <Outlet/> 
        </div>
         </Container>
         </>

}
export default HomePage

