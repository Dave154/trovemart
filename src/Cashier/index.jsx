import {Snackbar} from '@mui/material' 
import {CashProvider} from './context.jsx'
import Cashier from './cashier.jsx'
const Index = () => {
  return (
    <>
    <main className='hidden md:block'>
    <CashProvider>
      <Cashier/>
    </CashProvider> 
    </main>
    <div className='md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 font-bold'>
      <p> Not available on Small Devices</p>
    </div>
  </>
  )
}

export default Index