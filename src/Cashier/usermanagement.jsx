 import { useEffect } from 'react'
 import { doc, getDocs, collection, query, limit, orderBy } from "firebase/firestore";
 import { db } from '../.././firebase.js'
 import { useDispatch, useSelector } from 'react-redux'
 import { USERS} from '.././Slices/cashier.js'
 import  {useGlobe} from './context.jsx'
 import {useNavigate,Outlet,useParams} from 'react-router'
 import { SETCURRENTTAB} from '.././Slices/cashier.js'

 const UserManagement = () => {
 		const dispatch=useDispatch()
        const {getInitials}=useGlobe()
        const {userId}=useParams()
 		const {users,currentTab,userQuery}=useSelector(state=>state.cashier)
        const navigate=useNavigate()
     const getUsers = async () => {
         try {
             const usersRef = query(collection(db, 'users'), limit(10));
             const snapshot = await getDocs(usersRef);
             const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
             	dispatch(USERS(users))
         } catch (err) {
             console.error(err);
         }
     };
     useEffect(() => {
         getUsers()
         dispatch( SETCURRENTTAB('User Management'))
     }, [])
     return <>
    {
        userId ?
         <Outlet/>:
         <div className=' grid gap-2 rounded'>
         <div className="flex justify-between text-center border-b-2 py-1">
                         <p className='basis-[20%]'>
                             Name 
                         </p>
                         <p className='basis-[40%]'>Email</p>
                         <p className='basis-[20%]'>Phone</p>
                         <p className='basis-[20%]'>Status</p>                 
                        </div>
                        <div className=' grid gap-2'>
 			{
 				users.filter(item=>item.displayName.toLowerCase().includes(userQuery.toLowerCase()) || item.id=== userQuery).slice(0,30).map(item=>{
 					const {id,displayName,email,phone,status} =item
 					return <div className="text-center border-b-2 rounded-2xl cursor-pointer hover:bg-gray-100 p-2" key={id}>
 						<div className="flex justify-between items-center" onClick={()=>{ 
                            navigate(id)
                        }}>
                         <div className='basis-[20%] flex gap-1 items-center'>  
                         <span className=" block w-12 h-12 rounded-full bg-accent text-gray-100 grid  place-content-center font-bold">{getInitials(displayName)}</span>
                         <p>
                         {displayName} 
                         </p>

                         </div>
                         <p className='basis-[40%]'>{email}</p>
                         <p className='basis-[20%]'>{phone}</p>
                         <p className='basis-[20%] capitalize font-semibold font-sans'>{status}</p>                 
                        </div>
 					</div>
 				})
 			}
                            
            </div>
 		</div>
    }
     </>
 }

 export default UserManagement