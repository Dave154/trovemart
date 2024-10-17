 import {createSlice} from '@reduxjs/toolkit'
 const localCart = localStorage.getItem('cartList') ? JSON.parse(localStorage.getItem('cartList')): [];
 const localrecent=  localStorage.getItem('recentlyViewed') ? JSON.parse(localStorage.getItem('recentlyViewed')): [];
 const cartSlice = createSlice({
 	name:'cart',
 	initialState:{
 	isError:false,
	isLoading: false,
	cartList: localCart,
	amount: 0,
	subtotal: 0,
	total:0,
	recentlyViewed:localrecent,
	alert:'',
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
 			state.recentlyViewed= [...new Set([action.payload,...state.recentlyViewed])].slice(0,20)
 			localStorage.setItem('recentlyViewed', JSON.stringify(state.recentlyViewed))
 		},
 		ITEMCHANGEALERT:(state,action)=>{
 		},
 		REMOVEALERT : (state)=>{
 			state.alert=''
 		},
 		GETTOTAL: (state,action)=>{
 			let {amount,subtotal} = state.cartList.reduce((cartTotal,item)=>{
			const {amount,price}= item
			cartTotal.amount += amount
			const itemTotal = price * amount
			 cartTotal.subtotal += itemTotal
			 return cartTotal;
		},{	
			amount:0,
			subtotal:0
		})
		const checkNum=(num)=>{
			return parseFloat(num.toFixed(2))
		}
		// shipping= checkNum(subtotal*0.4/100)
		 subtotal= parseFloat(subtotal.toFixed(2))
		// total = checkNum(subtotal + shipping)
		state.amount = amount
		state.subtotal = subtotal
 		}

 	}
 });


 export const {TOGGLEAMOUNT,CLEARCART,REMOVEITEM,ADDTOCART,GETTOTAL,REMOVEALERT,ITEMCHANGEALERT}=cartSlice.actions;

 export default cartSlice.reducer;