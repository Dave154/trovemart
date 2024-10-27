import {Outlet} from 'react-router-dom'
import { Container} from '@mui/material'
import Footer from '../.././components/footer.jsx'

const HomePage = () => {
   return <>
    <Container maxWidth = 'xl' >
         <div> 
         <Outlet/> 
        </div>
         </Container>
         <Footer/>
         </>

}
export default HomePage

