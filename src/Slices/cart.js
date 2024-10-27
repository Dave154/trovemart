 import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
 import { getDoc, doc } from 'firebase/firestore'
 import { db } from '../.././firebase.js'
 const localCart = localStorage.getItem('cartList') ? JSON.parse(localStorage.getItem('cartList')) : [];
 const localrecent = localStorage.getItem('recentlyViewed') ? JSON.parse(localStorage.getItem('recentlyViewed')) : [];

 const cartSlice = createSlice({
     name: 'cart',
     initialState: {
         error: false,
         loading: false,
         cartList: localCart,
         amount: 0,
         orders: [],
         orderTab: 'All',
         subtotal: 0,
         total: 0,
         packaging: { bool: false, value: 1000 },
         recentlyViewed: localrecent,
         contact: '',
         alert: '',
         drop: false,
         modal: false,
         qr: '',
         orderModal: false,
         orderNo: 0,
         limit: 20000
     },
     reducers: {
         TOGGLEAMOUNT: (state, action) => {
             let tempCart = state.cartList.map(item => {
                 if (item.id === action.payload.id) {
                     let amount;
                     if (action.payload.type === 'inc') {
                         return { ...item, amount: item.amount + 1 }
                     }
                     if (action.payload.type === 'dec') {
                         if (item.amount === 1) {
                            state.alert ={bool:true,severity: 'error'}
                         }
                         return { ...item, amount: item.amount - 1 }
                     }

                 }

                 return item
             }).filter(item => item.amount !== 0)
             state.cartList = tempCart
         },

         CLEARCART: (state) => {
             state.cartList = []
         },
         REMOVEITEM: (state, action) => {
             state.alert ={bool:true,severity: 'error'}
             state.cartList = state.cartList.filter(item => item.id !== action.payload)
         },
         ADDTOCART: (state, action) => {
             const cartItem = { ...action.payload, amount: 1 }
             state.cartList = [...state.cartList, cartItem]
             state.alert ={bool:true,severity: 'success'}
             state.recentlyViewed = [action.payload, ...state.recentlyViewed].filter((item, index, self) => index === self.findIndex((obj) => obj.id === item.id)).slice(0, 20)
             localStorage.setItem('recentlyViewed', JSON.stringify(state.recentlyViewed))
         },
         ITEMCHANGEALERT: (state, action) => {},
         REMOVEALERT: (state) => {
             state.alert = {bool:false,severity:state.alert.severity}
         },
         GETTOTAL: (state) => {
             let { amount, subtotal, total } = state.cartList.reduce((cartTotal, item) => {
                 const { amount, price } = item
                 cartTotal.amount += amount
                 const itemTotal = price * amount
                 cartTotal.subtotal += itemTotal
                 return cartTotal;
             }, {
                 amount: 0,
                 subtotal: 0,
                 total: 0,
                 packaging: 0
             })
             const checkNum = (num) => {
                 return parseFloat(num.toFixed(2))
             }
             const extra = state.packaging.bool ? state.packaging.value : null
             subtotal = checkNum(subtotal)
             total = checkNum(subtotal + extra)
             state.amount = amount
             state.subtotal = subtotal.toLocaleString()
             state.total = total.toLocaleString()
         },

         // CART 
         SUCCESSORDERS: (state, action) => {
             state.orderNo = action.payload
             if (action.payload < 10) {
                 state.limit =( action.payload + 1) * 20000
             } else {
                 state.limit = 1000000
             }
         },
         ORDERTAB: (state, action) => {
             state.orderTab = action.payload
         },
         ADDTOORDERS: (state, action) => {
             state.orders = [...state.orders, action.payload]
         },
         TOGGLEDROP: (state, action) => {
             state.drop = !state.drop
         },
         PACKAGING: (state, action) => {
             state.packaging = { ...state.packaging, bool: action.payload }
         },
         OPENBACKDROP: (state) => {
             state.loading = true
         },
         HANDLEMODAL: (state) => {
             state.modal = false
             state.cartList = []
         },
         PLACEORDER: (state, action) => {
             state.qr = action.payload
             state.modal = true
             state.loading = false
         },
         ORDERS: (state, action) => {
             state.orders = action.payload
         },
         OPENORDERMODAL: (state, action) => {
             state.orderModal = state.orders.find(item => item.orderId === action.payload)
         },
         CLOSEORDERMODAL: (state) => {
             state.orderModal = false
         },
         CONTACT: (state, action) => {
             state.contact = action.payload
         },
         SETLOADING:(state,action)=>{
           state.loading=action.payload
         },
        SETERROR:(state,action)=>{
            state.error=action.payload
        },

     },
 });


 export const {
     PLACEORDER,
     TOGGLEAMOUNT,
     CLEARCART,
     REMOVEITEM,
     ADDTOCART,
     GETTOTAL,
     REMOVEALERT,
     ITEMCHANGEALERT,
     ORDERTAB,
     ADDTOORDERS,
     TOGGLEDROP,
     PACKAGING,
     OPENBACKDROP,
     HANDLEMODAL,
     ORDERS,
     OPENORDERMODAL,
     CLOSEORDERMODAL,
     SUCCESSORDERS,
     CONTACT,
     SETLOADING,
     SETERROR
 } = cartSlice.actions;

 export default cartSlice.reducer;