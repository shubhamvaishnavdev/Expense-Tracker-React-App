const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema(
    {
        Title: {
            type: String,
            required: true,
        },
        Income: {
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
        },
    
    },
    {
        collection: 'INCOMES',
        timestamps: true
    },
);

const Income = mongoose.model("Income", IncomeSchema);

module.exports = Income;