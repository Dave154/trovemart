 import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

 const localCart = localStorage.getItem('cartList') ? JSON.parse(localStorage.getItem('cartList')): [];
 const localrecent=localStorage.getItem('recentlyViewed') ? JSON.parse(localStorage.getItem('recentlyViewed')): [];
 const localorders=localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')): [];

 const cartSlice = createSlice({
 	name:'cart',
 	initialState:{
 	error:false,
	loading: false,
	cartList: localCart,
	amount: 0,
	orders:localorders,
	orderTab:'All',
	subtotal: 0,
	total:0,
	packaging:{bool:false,value:1000},
	recentlyViewed:localrecent,
	alert:'',
	drop: false,
	modal:false,
	qr:'',
	orderModal:false,
	orderNo:0,
	limit:20000
 	},
 	reducers:{
 		TOGGLEAMOUNT:(state,action)=>{
 			let tempCart = state.cartList.map(item=>{
			if(item.id === action.payload.id){
				let amount;
           		 if(action.payload.type === 'inc'){
                    return {...item, amount: item.amount + 1}
                }
                 if(action.payload.type === 'dec'){
                 	   if(item.amount=== 1){
                 	   	state.alert= 'error'
                 	   }
                    return {...item, amount: item.amount - 1}
                }

			}

			return item
		}).filter(item=>item.amount !==0)
 				state.cartList= tempCart
 		},

 		CLEARCART: (state)=>{
 			state.cartList=[]
 		},
 		REMOVEITEM:(state,action)=>{
 			state.alert='error'
 			state.cartList= state.cartList.filter(item=> item.id !== action.payload)
 		},
 		ADDTOCART: (state,action)=>{
 			const cartItem = {...action.payload,amount: 1}
 			state.cartList=[...state.cartList,cartItem]
 			state.alert='success'
 			state.recentlyViewed= [action.payload,...state.recentlyViewed].filter((item, index, self) =>index === self.findIndex((obj) => obj.id === item.id)).slice(0,20)
 			localStorage.setItem('recentlyViewed', JSON.stringify(state.recentlyViewed))
 		},
 		ITEMCHANGEALERT:(state,action)=>{
 		},
 		REMOVEALERT : (state)=>{
 			state.alert= ''
 		},
 		GETTOTAL: (state)=>{
 			let {amount,subtotal,total} = state.cartList.reduce((cartTotal,item)=>{
			const {amount,price}= item
			cartTotal.amount += amount
			const itemTotal = price * amount
			 cartTotal.subtotal += itemTotal
			 return cartTotal;
		},{	
			amount:0,
			subtotal:0,
			total:0,
			packaging:0
		})
		const checkNum=(num)=>{
			return parseFloat(num.toFixed(2))
		}
		const extra = state.packaging.bool ? state.packaging.value: null
		subtotal=checkNum(subtotal)
		total = checkNum(subtotal + extra)
		state.amount = amount
		state.subtotal = subtotal.toLocaleString()
		state.total=total.toLocaleString()
 		},

 		// CART 
 		ORDERTAB:(state,action)=>{
 			state.orderTab= action.payload
 		},
 		ADDTOORDERS:(state,action) =>{
 			state.orders=[...state.orders,action.payload]
 		},
 		TOGGLEDROP:(state,action)=>{
 			state.drop= !state.drop
 		},
 		PACKAGING: (state,action)=>{
 			state.packaging= {...state.packaging,bool:action.payload}
 		},
 		OPENBACKDROP: (state)=>{
 			state.loading =true
 		},
 		HANDLEMODAL:(state)=>{
 			state.modal=false
 			state.cartList=[]
 		},
 		PLACEORDER: (state,action)=>{
 			state.qr = action.payload
 			state.modal=true
 			state.loading=false
 		},
 		ORDERS:(state,action)=>{
 			state.orders= [action.payload, ...state.orders]
 			localStorage.setItem('orders', JSON.stringify(state.orders))
 		},
 		OPENORDERMODAL: (state,action)=>{
 			state.orderModal= state.orders.find(item=> item.orderId === action.payload)
 		},
 		CLOSEORDERMODAL: (state)=>{
 			state.orderModal=false
 		}
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
}=cartSlice.actions;

 export default cartSlice.reducer;