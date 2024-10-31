   import { createSlice } from '@reduxjs/toolkit';

 const localUser= JSON.parse(localStorage.getItem('user')) 


const authSlice = createSlice({
  name: 'auth',
  initialState: {
  	loading:false,
  	error: false,
  	errorMessage:'', 
    currentUser: localUser ? localUser :null,
    phone:'',
  },
  reducers: {
  	LOADING:(state,action)=>{
  		state.loading = action.payload
  	},
  	ERROR:(state,action)=>{
  		state.error = action.payload.bool
  		state.errorMessage=action.payload.message

  	},
  	CURRENTUSER:(state,action)=>{
  		   state.currentUser= action.payload   
  	},
  	COMPLETE:(state,action)=>{
  		state.complete= true
  	},
  	PHONE:(state,action)=>{
  		state.phone =action.payload
  	},
  }
});

// Export actions and reducer
export const { LOADING,CURRENTUSER,ERROR,COMPLETE,PHONE} = authSlice.actions;
export default authSlice.reducer;
