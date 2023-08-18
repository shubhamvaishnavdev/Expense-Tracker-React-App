import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createIncome = createAsyncThunk("createIncome",async (createData, { rejectWithValue })=>{
    try {
        const response = axios.post(process.env.REACT_APP_INCOME_URL, createData)
        return response.data;
      } catch (error) {
        throw error;
      }
})

export const getAllIncome = createAsyncThunk("getAllIncome",async (args, { rejectWithValue })=>{
    try {
        const response = await axios.get(process.env.REACT_APP_INCOME_URL);
        return response.data;
      } catch (error) {
        throw error;
      }
})

export const updateIncome = createAsyncThunk("updateIncome",async ({Date,Title, Income, Category, Desc, selectedId}, { rejectWithValue })=>{
    try {
        const sendUpdatingData = {
          Date,Title, Income, Category, Desc
          };
        const response = await axios.put(`${process.env.REACT_APP_INCOME_URL}/${selectedId}`,sendUpdatingData);
        return response.data;
      } catch (error) {
        throw error;
      }
})

export const deleteIncome = createAsyncThunk("deleteIncome",async (id, { rejectWithValue })=>{
  try {
      const response = await axios.delete(`${process.env.REACT_APP_INCOME_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
})

const IncomeDataSlice = createSlice({
    name:"IncomeDataSlice",
    initialState: {
        value: [],
        status: 'idle',
        loading: false,
        error: null,
      },
    reducers:{
        setIncomeData:(state, action) => {
            state.value = action.payload;
          },
    },
    extraReducers:(builder) => {
        builder
        .addCase(getAllIncome.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getAllIncome.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.value = action.payload;
          })
          .addCase(getAllIncome.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(updateIncome.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(updateIncome.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.value = action.payload;
          })
          .addCase(updateIncome.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(deleteIncome.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(deleteIncome.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.value = action.payload;
          })
          .addCase(deleteIncome.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(createIncome.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(createIncome.fulfilled, (state, action) => {
            state.status = 'succeeded';
          })
          .addCase(createIncome.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
      },
   
})

export const { setIncomeData } = IncomeDataSlice.actions;
export default IncomeDataSlice.reducer;

