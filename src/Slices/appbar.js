 import { createSlice } from '@reduxjs/toolkit';



const appbarSlice = createSlice({
  name: 'appbar',
  initialState: {
    dynamicSearch:'',
    search:'',
    scroll:false,
    searchSuggestions:'',
    signBar:false,
    loading: false,
    error: null,
  },
  reducers: {
    DYNAMICSEARCH: (state,action) => {
      state.dynamicSearch = action.payload;
    },
    SEARCH: (state,action)=>{
        state.search= action.payload
    },
    HANDLESIGN: (state) => {
      state.signBar= !state.signBar
    },
    HANDLESCROLL :(state,action)=>{
      state.scroll=action.payload
    }
  }
});

// Export actions and reducer
export const { DYNAMICSEARCH,SEARCH,HANDLESIGN,HANDLESCROLL} = appbarSlice.actions;
export default appbarSlice.reducer;
