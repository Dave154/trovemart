import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import data from '.././components/products.json'
import axios from 'axios';
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (url) => {
       // const response = await new Promise((resolve,reject)=>{
       //  if(data){
       //    setTimeout(()=>{
       //   resolve(data)
       // },5000)
       //  }
       //  else {
       //    reject(null)
       //  }
       // })
        const response = await axios.get(url)
         return response.data.data;
    }
);


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        productsDisplayed:null,
        currentProducts:[],
        currentProduct:null,
        paginatedProducts:null,
        mainCategories: null,
        currentMain:[],
        currentCategory:'All',
        pageNumber:1,
        pageList:1,
        depth: null,
        categories: null,
        loading: false,
        error: null,
    },
    reducers: {
        SETCATEGORIES: (state, action) => {
          action.payload?.unshift('All')
          state.categories = action.payload
        },
        SETMAINCATEGORIES: (state, action) => {
            state.mainCategories = action.payload
        },
        SETPRODUCTSDISPLAYED: (state,action)=>{
          state.currentMain= action.payload
          state.productsDisplayed = state.products.filter(item=>{
            if (action.payload) {
              return item.category.includes(action.payload) 
          }else{
            return item
            } 
          })
        },
        SETPRODUCTSDISPLAYEDONSEARCH: (state,action)=>{
          state.currentMain= 'AllProducts'
          state.currentCategory= action.payload ? action.payload : null
          state.currentProducts = state.products.filter(item=>{
            if (action.payload) {
              if (item.name.toLowerCase().includes(action.payload.toLowerCase()) || item.category.toLowerCase().includes(action.payload.toLowerCase())) {
                return item
               }             
            }else{
              return item
            }

        })
        },
        SETCURRENTCATEGORY: (state,action)=>{
          state.currentCategory= action.payload
          state.currentProducts= state.productsDisplayed?.filter(item=>{
            if(action.payload !== 'All'){
            return item.category.includes(action.payload)
            }else{
                return item
            }
          })  
        },
         SETPAGINATION: (state,action)=> {
          state.pageNumber=action.payload
          state.pageList = state.currentProducts?.length / 50 > 1 ? parseFloat((state.currentProducts?.length / 50).toFixed(0)) : 1 
          state.paginatedProducts=state.currentProducts?.filter((item,index)=>{
                  if(index <= ((state.pageNumber *50)-1) && index >= (state.pageNumber-1 )*50 ){
                    return item
                  }
                });
        }, 
        SETDEPTH: (state,action )=>{
          state.depth=action.payload.filter(item=>{
            if (item !==undefined ||item !==null ||item !== '') {
              return item
            }
         
         })
        },
        SETCURRENTPRODUCT: (state,action)=>{
          state.currentProduct = action.payload.name
        },                                                              
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Export actions and reducer
export const {
SETCATEGORIES,
SETMAINCATEGORIES,
SETPRODUCTSDISPLAYED,
SETPAGINATION,
SETCURRENTCATEGORY,
SETDEPTH,
SETCURRENTPRODUCT,
SETPRODUCTSDISPLAYEDONSEARCH
} = productsSlice.actions;
export default productsSlice.reducer;