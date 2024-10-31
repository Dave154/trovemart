import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await axios.get('https://products-orcin.vercel.app/product?page=1&limit=3761')
         return response.data.data;
    }
);

const localfavorite =localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')):[]
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
        loading: true,
        error: null,
        favorites:localfavorite,
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
              return item.category.includes(action.payload) 
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
        CLOSEERROR:(state)=>{
          state.error= null
        }                                                           
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
                if (action.error.name === 'AxiosError') {
                state.error = action.error.message;
                }
            });
    },
});

// Export actions and reducer
export const {
  CLOSEERROR,
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