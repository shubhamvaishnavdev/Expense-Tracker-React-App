const express = require('express');
const {
    allExpensesData,
    addSingleExpenseData,
    getSingleExpense,
    updateSingleExpense,
    deleteSingleExpense
} = require("../controller/ExpensesController");
const router = express.Router();

router.route("/")
    .get(allExpensesData)
    .post(addSingleExpenseData);

router.route("/:id")
    .get(getSingleExpense)
    .put(updateSingleExpense)
    .delete(deleteSingleExpense);

module.exports = router;
