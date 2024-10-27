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
          packaging:false,
          currentTab: 'Orders',
          orderTab: 'Active',
          orders: [],
          abandoned:[],
          qrdata: [],
          scannerOpen:false,
          isEdit:false,
          orderDetails:{},
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
              state.orderTab = action.payload
          },
          SETORDERS: (state, action) => {
              state.orders = action.payload
          },
          SETABANDONED:(state,action)=>{
            state.abandoned=action.payload
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
              console.log(action.payload)
              state.isEdit=action.payload
          },
          SETORDER:(state,action)=>{
            state.packaging=action.payload.order.packaging.bool
            state.orderDetails= action.payload
          },
          EDITORDER:(state,action)=>{
            const newOrders=state.orderDetails.order.orderlist.map(item=>{
              if(action.payload.id === item.id && action.payload.amount >0){
              return {...item,amount:action.payload.amount}
              }
              return item
            })
            state.orderDetails= {...state.orderDetails,order:{...state.orderDetails.order,orderlist:newOrders} } 
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
             const extra = state.packaging && 1000;
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
  SETORDER,
  EDITORDER,
  GETTOTAL,
  SETCONFIRMMODAL,
  SETALERT
} = cashierSlice.actions;
  export default cashierSlice.reducer;