const Expense = require("../model/ExpenseModel");

async function allExpensesData(req, res) {
    try {
        const expenseData = await Expense.find({});
        res.status(200).json(expenseData);
    } catch (error) {
        console.error("Error at allExpensesData request:", error);
        res.status(500).json({ message: error.message });
    }
}

async function addSingleExpenseData(req, res) {
    try {
        const newExpense = new Expense(req.body);
        const savedExpense = await newExpense.save();
        res.status(200).json(savedExpense);
    } catch (error) {
        console.error("Error at addSingleExpenseData post request:", error);
        res.status(500).json({ message: error.message });
    }
}

async function getSingleExpense(req, res) {
    try {
        const { id } = req.params;
        const singleExpense = await Expense.findById(id);
        if (!singleExpense) {
            return res.status(404).json({ message: `Expense with ID ${id} not found` });
        }
        res.status(200).json(singleExpense);
    } catch (error) {
        console.error("Error at getSingleExpense get request:", error);
        res.status(500).json({ message: error.message });
    }
}

async function updateSingleExpense(req, res) {
    try {
        const { id } = req.params;
        const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedExpense) {
            return res.status(404).json({ message: `Expense with ID ${id} not found` });
        }
        res.status(200).json(updatedExpense);
    } catch (error) {
        console.error("Error at updateSingleExpense put request:", error);
        res.status(500).json({ message: error.message });
    }
}

async function deleteSingleExpense(req, res) {
    try {
        const { id } = req.params;
        const deletedExpense = await Expense.findByIdAndDelete(id);
        if (!deletedExpense) {
            return res.status(404).json({ message: `Expense with ID ${id} not found` });
        }
        res.status(200).json(deletedExpense);
    } catch (error) {
        console.error("Error at deleteSingleExpense delete request:", error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    allExpensesData,
    addSingleExpenseData,
    getSingleExpense,
    updateSingleExpense,
    deleteSingleExpense
};
