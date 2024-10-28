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
          currentTab: 'Orders',
          orderTab: 'Active',
          orders: [],
          abandoned:[],
          allorders:[],
          qrdata: [],
          scannerOpen:false,
          isEdit:false,
          isAdd:false,
          addtocartquery:'',
          orderDetails:{},
          pageNumber:0,
          pageList:0,
          limitExceeded:false,
          searchResults:null
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
             // state.searchResults=null
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
          SETPAGINATION: (state,action)=> {
          state.pageNumber=action.payload
        }, 
        QUERY:(state,action)=>{
          state.searchResults=state.allorders?.filter(item=>{
            console.log(item.userName)
          if(item.userName.toLowerCase().includes(action.payload) || item.orderId === action.payload){
            return item
          }
          }
          )
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
  QUERY
} = cashierSlice.actions;
  export default cashierSlice.reducer;