const Expense = require("../model/ExpenseModel")


async function allExpenseData(req, res) {
    try {
        const ExpenseData = await Expense.find({});
        return res.status(200).json(ExpenseData)
        
    } catch (error) {
        console.log("error at allExpenseData server: " + error);
        res.status(500).json({ message: error.message });
    }
}

async function addSingleExpenseData(req, res) {
    try {
        // Create a new Expense document using the Expense model
        const newExpense = new Expense(req.body);
        // Save the newExpense to the database
        const savedExpense = await newExpense.save();
        // const allExpenses = await Expense.find({});
        res.status(200)
    } catch (error) {
        console.log("error at Expense addSingleExpenseData request:" + error);
        res.status(500).json({ message: error.message });
    }
}


async function getSingleExpense(req, res) {
    try {
        const { id } = req.params;
        const SingleExpense = await Expense.findById(id);
        res.status(200).json(SingleExpense)
    } catch (error) {
        console.log("error at Expense getSingleExpense request:" + error);
        res.status(500).json({ message: error.message });
    }
}

async function updateSingleExpense(req, res) {
    try {
        const { id } = req.params;
        const updatingExpense = await Expense.findByIdAndUpdate(id,req.body, { new: true }); // Use { new: true } to get the updated document
        if (!updatingExpense) {
            return res.status(404).json({ message: `can not find Expense with ID: ${id}` });
        }
        const allExpenses = await Expense.find({});
        res.status(200).json(allExpenses);
    } catch (error) {
        console.log("error at Expense updateSingleExpense request:" + error);
        res.status(500).json({ message: error.message });
    }
}

async function deleteSingleExpense(req, res) {
    try {
        const { id } = req.params;
        const deletedExpense = await Expense.findByIdAndDelete(id);
        if (!deletedExpense) {
            return res.status(404).json({ message: `can not find Expense with ID: ${id}` });
        }
        // Find all remaining data except the deleted document
        const remainData = await Expense.find({ _id: { $ne: id } });
        res.status(200).json(remainData);
    } catch (error) {
        console.log("error at Expense deleteSingleExpense  request:" + error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    allExpenseData,
    addSingleExpenseData,
    getSingleExpense,
    updateSingleExpense,
    deleteSingleExpense
};