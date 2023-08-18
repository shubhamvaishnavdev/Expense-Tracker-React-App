const express = require('express');

const { allExpenseData,addSingleExpenseData,getSingleExpense,updateSingleExpense, deleteSingleExpense } = require("../controller/ExpensesController");
const router = express.Router();

router.route("/")
    .get(allExpenseData)
    .post(addSingleExpenseData)
    // .post()

    // router.route("/:id").get(function name)

    router.route("/:id")
        .get(getSingleExpense)
        .put(updateSingleExpense)
        .delete(deleteSingleExpense)

    module.exports = router;