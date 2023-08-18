import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createExpense = createAsyncThunk("createExpense",async (createData, { rejectWithValue })=>{
    try {
        const response = axios.post(process.env.REACT_APP_EXPENSE_URL, createData)
        return response.data;
      } catch (error) {
        throw error;
      }
})

export const getAllExpense = createAsyncThunk("getAllExpense",async (args, { rejectWithValue })=>{
    try {
        const response = await axios.get(process.env.REACT_APP_EXPENSE_URL);
        return response.data;
      } catch (error) {
        throw error;
      }
})

export const updateExpense = createAsyncThunk("updateExpense",async ({Title, Expense,Date,Category, Desc, selectedId}, { rejectWithValue })=>{
    try {
        const sendUpdatingData = {
          Title, Expense,Date,Category, Desc,
          };
        const response = await axios.put(`${process.env.REACT_APP_EXPENSE_URL}/${selectedId}`,sendUpdatingData);
        return response.data;
      } catch (error) {
        throw error;
      }
})

export const deleteExpense = createAsyncThunk("deleteExpense",async (id, { rejectWithValue })=>{
  try {
      const response = await axios.delete(`${process.env.REACT_APP_EXPENSE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
})

const ExpenseDataSlice = createSlice({
    name:"ExpenseDataSlice",
    initialState: {
        value: [],
        status: 'idle',
        loading: false,
        error: null,
      },
    reducers:{
        setExpenseData:(state, action) => {
            state.value = action.payload;
          },
    },
    extraReducers:(builder) => {
        builder
        .addCase(getAllExpense.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getAllExpense.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.value = action.payload;
          })
          .addCase(getAllExpense.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(updateExpense.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(updateExpense.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.value = action.payload;
          })
          .addCase(updateExpense.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(deleteExpense.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(deleteExpense.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.value = action.payload;
          })
          .addCase(deleteExpense.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(createExpense.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(createExpense.fulfilled, (state, action) => {
            state.status = 'succeeded';
          })
          .addCase(createExpense.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
      },
   
})

export const { setExpenseData } = ExpenseDataSlice.actions;
export default ExpenseDataSlice.reducer;

