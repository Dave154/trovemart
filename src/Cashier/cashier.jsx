import { AppBar,Fab, Container, Box, Drawer, Toolbar, List, Typography, ListItem, ListItemButton, ListItemIcon, ListItemText,Badge,Snackbar } from '@mui/material'
import logo from '.././assets/trove.svg'
import { useNavigate, Outlet } from 'react-router-dom'
import { Logout, Dashboard, ManageAccounts, ShoppingCartOutlined ,QrCodeScanner,Loop,Search,SearchRounded} from '@mui/icons-material';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SETCURRENTTAB,SETORDERTAB ,SETSCANNEROPEN,SETCURRENTCASHIER,SETALERT,QUERY,SETPAGINATION,SETORDERS,SETABANDONED,SETALLORDERS,SETLOADING,USERQUERY} from '.././Slices/cashier.js'
 import {useGlobe} from './context.jsx'
 import { doc, onSnapshot, collection ,getDocs,query,limit,orderBy} from "firebase/firestore";
 import { db } from '../.././firebase.js'
const drawerWidth = 230;
const drawerWidthsm = 70;



const updatedTime = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date();
    const day = date.getDate();
    const after = (day) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th';
        }
    };

    const formattedDate = date.toLocaleDateString('en-us', options);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? ' pm' : ' am';
    const formattedTime = `${hours % 12 || 12}:${minutes}${ampm}`;

    return `${formattedDate.replace(/\d+/, (day) => `${day}${after(day)}`)}, ${formattedTime}`;
};

const Cashier = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {getInitials}=useGlobe()
    const [currentdate, setCurrentDate] = useState(updatedTime())
    const { currentTab,orderTab,loading,orders,currentCashier,alert} = useSelector(state => state.cashier)
    const initials=getInitials(currentCashier?.name)

   const handleClose=()=>{
  dispatch(SETALERT({bool:false}))
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    navigate('/C-A-S-H-I-E-R')
    dispatch(SETORDERTAB('All Orders'))
    dispatch(QUERY(e.target[0].value))
    dispatch(SETPAGINATION(1))

  }
  const handleUserSubmit=(e)=>{
      e.preventDefault()
      dispatch(USERQUERY(e.target[0].value))
      navigate('/C-A-S-H-I-E-R/usermanagement')
  }
    useEffect(() => {
        const refresh = setInterval(() => {
            setCurrentDate(updatedTime());
        }, 1000);

        return () => clearInterval(refresh);
    }, []);

 useEffect(() => {
         const ordersRef = query(collection(db, 'globalOrders'), orderBy('createdAt','desc'));
         dispatch(SETLOADING(true))
         const unsub = onSnapshot(ordersRef, (snapshot) => {
             const allOrders = [];
             snapshot.forEach((doc) => {
                 allOrders.push(doc.data());
             });

             dispatch(SETORDERS(allOrders.filter(item=>item.status==='pending')))
             dispatch(SETABANDONED(allOrders.filter(item=> item.status==='abandoned')))
             dispatch(SETALLORDERS(allOrders))
             dispatch(SETLOADING(false))
         });
     }, [])

    return (        
        <Box sx={{ display: 'flex' }} className='hidden'>
         <Snackbar
         sx={{
          div:{
            bgcolor:'#E51E54'
          }
         }}
      anchorOrigin= {{ vertical: "top", horizontal: "right" }} 
      open={alert.bool}
      autoHideDuration={3000}
      onClose={handleClose}
      message={alert.message}
/>
      <AppBar
        position="fixed"
        sx={{ width: {md:`calc(100% - ${drawerWidth}px)`,sm:`calc(100% - ${drawerWidthsm}px)`}, ml:{md: `${drawerWidth}px` ,sm: `${drawerWidthsm}px`},bgcolor:'#F0F0EC',boxShadow:'none' ,color:'black'}}
      >
        <Toolbar >
          <div className="flex justify-between w-full">
          <h2 className='font-bold text-2xl capitalize'>
           {currentTab}
          </h2>
           <p className='text-gray-600'>{currentdate}</p>
          </div>
        </Toolbar>
        {
        	currentTab === 'Orders' ?    <Toolbar sx={{
          display:'flex',
          justifyContent:'space-between'
        }}>	

        <div className='flex gap-3'>
        	{
        		['Active','Abandoned','All Orders'].map(item=>{
        			return <p className={`p-2 rounded-2xl cursor-pointer font-bold ${orderTab === item ? 'bg-accent text-gray-100' :'bg-white text-gray-500'}`}
        			onClick={()=>{
                navigate('/C-A-S-H-I-E-R')
        				dispatch(SETORDERTAB(item))
                dispatch(SETPAGINATION(1))
        			}}
        			>
        				{item}
        			</p>
        		})
        	}
        </div>
        <div className="flex gap-3">
          <i className={`${loading &&'rotate'} block`}><Loop/></i>
          <i className="cursor-pointer" onClick={()=>{
            navigate('/C-A-S-H-I-E-R')
            dispatch(SETSCANNEROPEN(true))
          }
          }><QrCodeScanner/></i>
          <i></i>
          <form action="" className='bg-white flex gap-1 rounded px-2 overflow-hidden' onSubmit={handleSubmit}>
            <input type="text" placeholder="Search a name or orderId" className="placeholder:text-sm italic"
            />
            <i><Search fontSize="small"
            /></i>
          </form>
        </div>
        </Toolbar> :
        <Toolbar
        sx={{
          display:'flex',
          justifyContent:'center'
        }}
        >
          <form  className='flex w-full max-w-[35rem] rounded-3xl border-2 border-gray-100 overflow-hidden p-1 bg-white justify-between' onSubmit={handleUserSubmit}>
           <input type="search" className=' w-full p-2'  placeholder='Enter User Name'/>

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
        </Toolbar>
        }

      </AppBar>
      <Drawer
        sx={{
          width: {md:drawerWidth ,sm:drawerWidthsm},
          flexShrink: 0,
          '& .MuiDrawer-paper': {
          overflowX:'hidden',
            width: {md:drawerWidth ,sm:drawerWidthsm},
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
      <Toolbar>
      	
      <div className='flex items-center gap-3 cursor-pointer' onClick={()=>{
        
        } }>
          <span className="logo w-10">
            <img src={logo} alt="logo"/>
          </span>
          <h2 className={`text-accent  md:visible font-extrabold text-xl`}>trovemart</h2>
        </div>
      </Toolbar>
        <List>
          {['Orders', 'User Management', ].map((text, index) => (
            <ListItem key={text} disablePadding sx={{
            	borderRadius:'0 40px 40px 0',
            	bgcolor: `${currentTab === text && '#E514'}`,
            	'&:hover':{
            	bgcolor:'#E514',
            	}
            }}
            onClick={()=>{
            	if(text==='Orders'){
            			navigate('')
            	}else{
            		navigate('usermanagement')
            	}
            }}
             >
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ?
                <Badge badgeContent={orders.length} sx={{
                  span: {
                  bgcolor:'#E51E54',
                  color:'#fff'
                  
                  }
                }}>
                <ShoppingCartOutlined />
              </Badge> : <ManageAccounts />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List sx={{
        	mt:'auto',
          pb:'1rem'
        }}>

        {
          currentCashier &&
           <ListItem  disablePadding  onClick={()=>{
              dispatch(SETCURRENTCASHIER(null))
            }}>
            <div className="flex items-center gap-3 px-4">
              <span className='rounded-full w-10 h-10 bg-accent text-white grid place-content-center'>
                <p className='font-bold text-lg'> {initials}</p>
              </span>

              <p className="font-semibold">{currentCashier.name}</p>
            </div>
            </ListItem>
        }
          
            <ListItem  disablePadding onClick={()=>{
              dispatch(SETCURRENTCASHIER(null))
             navigate('/C-A-S-H-I-E-R/auth')
            }}>
              <ListItemButton>
                <ListItemIcon>
                  <Logout/>
                </ListItemIcon>
                <ListItemText primary={'Logout'} />
              </ListItemButton>
            </ListItem>

        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: '#F0F0EC', p: 3 ,mt:'8rem'}}
        >
        <Outlet/>
      </Box>
    </Box>
    );



}

export default Cashier