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
  
    HANDLESIGN: (state) => {
      state.signBar= !state.signBar
    },
    HANDLESIGNCLOSE : (state)=>{
      state.signBar = false
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


export const { DYNAMICSEARCH,SEARCH,HANDLESIGN,HANDLESIGNCLOSE,HANDLESCROLL,HANDLEPOPUP,HANDLECATEGORIESSCROLLNEXT,HANDLECATEGORIESSCROLLPREV} = appbarSlice.actions;
export default appbarSlice.reducer;
