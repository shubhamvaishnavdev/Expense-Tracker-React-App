const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
    {
        Title: {
            type: String,
            required: true,
        },
        Expense: {
            type: Number,
            required: true,
        },
        Date: {
            type: Date, 
            required: true,
        },
        Category: {
            type: String,
            required: true,
        },
        Desc: {
            type: String,
            required: false,
        }
    },
    {
        collection: 'EXPENSES',
        timestamps: true
    }
);

const Expense = mongoose.model("Expense", ExpenseSchema);

module.exports = Expense;