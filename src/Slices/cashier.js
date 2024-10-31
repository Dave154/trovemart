  import { createSlice } from '@reduxjs/toolkit';



  const cashierSlice = createSlice({
      name: 'cashier',
      initialState: {
          alert:{bool:false,message:''},
          currentCashier: null,
          loading: false,
          error: false,
          amount:0,
          confirmModal:{bool:false},
          subtotal:0,
          total:0,
          packaging:{bool:false,value:''},
          currentTab: '',
          orderTab: 'Active',
          orders: [],
          abandoned:[],
          allorders:[],
          paginatedOrders:[],
          qrdata: [],
          scannerOpen:false,
          isEdit:false,
          isAdd:false,
          addtocartquery:'',
          orderDetails:{},
          pageNumber:1,
          pageList:0,
          limitExceeded:false,
          searchResults:null,

          users:[],
          userQuery:'',
          user:null,
          userOrdersOpen:false,
          userOrders:null
      },
      reducers: {
          SETCURRENTCASHIER:(state,action)=>{
            state.currentCashier=action.payload
          },
          SETALERT:(state,action)=>{
            state.alert=action.payload
          },
          SETCURRENTTAB: (state, action) => {
              state.currentTab = action.payload
          },
          SETORDERTAB: (state, action) => {
             state.searchResults=null
             state.pageNumber=1
              state.orderTab = action.payload
          },
          SETORDERS: (state, action) => {
              state.orders = action.payload
          },
          SETABANDONED:(state,action)=>{
            state.abandoned=action.payload
          },
          SETALLORDERS:(state,action)=>{
            state.allorders=action.payload
          },
          SETLOADING: (state, action) => {
              state.loading = action.payload
          },
          SETERROR: (state, action) => {
              state.error = action.payload

          },
          SETSCANNEROPEN:(state,action)=>{
            state.scannerOpen=action.payload
          },
          SETQRDATA:(state,action)=>{
            state.qrdata=action.payload
          },
          SETISEDIT:(state,action)=>{
              state.isEdit=action.payload
          },
           SETISADD:(state,action)=>{
              state.isAdd=action.payload
          },
          SETADDQUERY:(state,action)=>{
            state.addtocartquery=action.payload
          },
          SETORDER:(state,action)=>{
            state.packaging=action.payload.order.packaging
            state.orderDetails= action.payload
          },
          EXCEEDEDLIMIT:(state,action)=>{
            state.limitExceeded=action.payload
          },
          EDITORDER:(state,action)=>{
            const newOrders=state.orderDetails.order.orderlist.map(item=>{
              if(action.payload.id === item.id && action.payload.amount >0 ){
              return {...item,amount:action.payload.amount}
              }
              return item
            })
            state.orderDetails= {...state.orderDetails,order:{...state.orderDetails.order,orderlist:newOrders} } 
          },
          REMOVEITEM:(state,action)=> {
            const newOrders= state.orderDetails.order.orderlist.filter(item=> item.id !== action.payload)
            state.orderDetails ={...state.orderDetails,order:{...state.orderDetails.order,orderlist:newOrders} } 
          },
          ADDITEM:(state,action)=>{
            const newItem={amount:1,...action.payload}
            const tempOrders = [newItem,...state.orderDetails.order.orderlist] 
            const newOrders =[...new Map(tempOrders.map(item => [item.name, item])).values()]
             state.orderDetails ={...state.orderDetails,order:{...state.orderDetails.order,orderlist:newOrders} } 
          },
          SETPACKAGING:(state,action)=>{
            state.packaging={...state.packaging,bool:action.payload}
          },
           QUERY:(state,action)=>{
          state.searchResults=state.allorders?.filter(item=>{
          if(item.userName.toLowerCase().includes(action.payload) || item.orderId === action.payload){
            return item
          }
          }
          )
        },
          SETPAGINATION: (state,action)=> {
          state.pageNumber=action.payload;
          const currentOrders =state.orderTab === 'Active' 
          ? state.orders : 
          state.orderTab ==='Abandoned' ? 
          state.abandoned :
          ( state.orderTab ==='All Orders' && state.searchResults) ?
           state.searchResults : state.allorders
          state.pageList=Math.ceil(currentOrders.length/50)
          state.paginatedOrders=currentOrders.filter((item,index)=>{
                  if(index <= ((state.pageNumber *50)-1) && index >= (state.pageNumber-1 )*50 ){
                    return item
                  }
                });
             }, 
       
           GETTOTAL: (state) => {
             let { amount, subtotal, total } =state.orderDetails.order.orderlist.reduce((orderTotal, item) => {
                 const { amount, price } = item
                 orderTotal.amount += amount
                 const itemTotal = price * amount
                 orderTotal.subtotal += itemTotal
                 return orderTotal;
             }, {
                 amount: 0,
                 subtotal: 0,
                 total: 0,
                 packaging: 0
             })
             const checkNum = (num) => {
                 return parseFloat(num.toFixed(2))
             }
             const extra = state.packaging.bool && state.packaging.value;
             subtotal = checkNum(subtotal)
             total = checkNum(subtotal + extra)
             state.amount = amount
             state.subtotal = subtotal
             state.total = total

         },
         SETCONFIRMMODAL:(state,action)=>{
          state.confirmModal=action.payload
         },


         USERS:(state,action)=>{
          state.users=action.payload
         },
         USERQUERY:(state,action)=>{
          state.userQuery=action.payload
         },
         USER:(state,action)=>{
          const sorted= action.payload ?{...action.payload,orders:action.payload.orders?.sort((a,b)=>new Date(b.timeStamp) - new Date(a.timeStamp))}:null
          state.user= sorted
         }, 
         SETUSERORDERSMODAL:(state,action)=>{
          state.userOrdersOpen=action.payload
         },
         SETUSERORDERS:(state,action)=>{
          state.userOrdersOpen=true
          state.userOrders=action.payload
         }
      }
  });


  export const { 
  SETCURRENTCASHIER,
  SETCURRENTTAB,
  SETORDERTAB, 
  SETORDERS,
  SETABANDONED,
  SETLOADING,
  SETERROR, 
  SETQRDATA,
  SETSCANNEROPEN ,
  SETISEDIT,
  SETISADD,
  SETADDQUERY,
  SETORDER,
  EDITORDER,
  GETTOTAL,
  SETCONFIRMMODAL,
  SETALERT,
  REMOVEITEM,
  ADDITEM,
  SETPACKAGING,
  EXCEEDEDLIMIT,
  SETALLORDERS,
  SETPAGINATION,
  QUERY,


  USERS,
  USERQUERY,
  USER,
  SETUSERORDERSMODAL,
  SETUSERORDERS,
} = cashierSlice.actions;
  export default cashierSlice.reducer;