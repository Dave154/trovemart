  import {createSlice} from '@reduxjs/toolkit'


  const searchhistory= localStorage.getItem('searchOptions')?  JSON.parse(localStorage.getItem('searchOptions')) :[]
  const searchSlice= createSlice({
    name:'search',
    initialState: {
        searchArray:[],
        searchopen:false,
        query:'',
        dynamicquery:'',
        recentlySearched:searchhistory,
        searchOptions: [],

    },
    reducers: {
        SEARCHARRAY: (state,action)=>{
            state.searchArray= action.payload
        },
         DYNAMICSEARCH: (state,action) => {
            if (action.payload) {
         state.dynamicquery = action.payload.params.toLowerCase();
     }else{
        state.dynamicquery='';
     }
         state.searchOptions= state.searchArray.filter(item=> {
            if (item.toLowerCase().includes(state.dynamicquery)) {
              return item
            }
         }).slice(0,8)
    },
     SEARCH: (state,action)=>{
        state.recentlySearched= [... new Set([action.payload,...state.recentlySearched,].slice(0,5))]
          localStorage.setItem('searchOptions',JSON.stringify(state.recentlySearched))
          state.query= action.payload
    },
    CLEARHISTORY :(state)=>{
        state.recentlySearched= []
        localStorage.setItem('searchOptions',JSON.stringify(state.recentlySearched))

    },
        HANDLESEARCHOPEN: (state,action)=>{
        state.searchopen= true
        },
        HANDLESEARCHCLOSE: (state)=>{
            state.searchopen = false
        } 
    },
  });

  export const {SEARCH,HANDLESEARCHOPEN,HANDLESEARCHCLOSE,DYNAMICSEARCH,SEARCHARRAY,CLEARHISTORY}= searchSlice.actions;
  export default searchSlice.reducer;

 