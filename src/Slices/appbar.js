 import { createSlice } from '@reduxjs/toolkit';



const appbarSlice = createSlice({
  name: 'appbar',
  initialState: {
    popup:false,
    dynamicSearch:'',
    search:'',
    scroll:false,
    scrollNext:false,
    scrollPrev:false,
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
    },
    HANDLEPOPUP : (state,action)=>{
      state.popup = action.payload
    },
    HANDLECATEGORIESSCROLLNEXT : (state,action)=>{
      state.scrollNext=action.payload
    },
    HANDLECATEGORIESSCROLLPREV : (state,action)=>{
      state.scrollPrev=action.payload
    }
  }
});

// Export actions and reducer
export const { DYNAMICSEARCH,SEARCH,HANDLESIGN,HANDLESCROLL,HANDLEPOPUP,HANDLECATEGORIESSCROLLNEXT,HANDLECATEGORIESSCROLLPREV} = appbarSlice.actions;
export default appbarSlice.reducer;
