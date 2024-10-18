 import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'


 export const placeOrder= createAsyncThunk(
 	'cart/placeOrder',
 	async()=>{
 		 const response = await new Promise((resolve,reject)=>{
        if(true){
          setTimeout(()=>{
         resolve('heu')
       },5000)
        }
        else {
          reject(null)
        }
       })
       return response
 	}
  )

 const localCart = localStorage.getItem('cartList') ? JSON.parse(localStorage.getItem('cartList')): [];
 const localrecent=localStorage.getItem('recentlyViewed') ? JSON.parse(localStorage.getItem('recentlyViewed')): [];


 const cartSlice = createSlice({
 	name:'cart',
 	initialState:{
 	error:false,
	loading: false,
	cartList: localCart,
	amount: 0,
	orders:[],
	orderTab:'All',
	subtotal: 0,
	total:0,
	packaging:{bool:false,value:1000},
	recentlyViewed:localrecent,
	alert:'',
	drop: false,
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
		subtotal= parseFloat(subtotal.toFixed(2))
		total = checkNum(subtotal + extra)
		state.amount = amount
		state.subtotal = subtotal
		state.total=total
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
 		}
 	},
    extraReducers: (builder) => {
        builder
            .addCase(placeOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
 });


 export const {
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
 PACKAGING
}=cartSlice.actions;

 export default cartSlice.reducer;