import {configureStore} from '@reduxjs/toolkit';
import IncomeDatareducer from "../Slices/IncomeDataSlice";
import ExpenseDatareducer from "../Slices/ExpenseDataSlice";


const Store = configureStore({
    reducer:{
        IncomeData: IncomeDatareducer,
        ExpenseData: ExpenseDatareducer,
    }
})

export default Store;