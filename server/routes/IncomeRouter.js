const express = require('express');
const { allIncomeData,addSingleIncomeData,getSingleIncome,updateSingleIncome, deleteSingleIncome } = require("../controller/IncomeController");
const router = express.Router();

router.route("/")
    .get(allIncomeData)
    .post(addSingleIncomeData)
    // .post()

    // router.route("/:id").get(function name)

    router.route("/:id")
        .get(getSingleIncome)
        .put(updateSingleIncome)
        .delete(deleteSingleIncome)
    module.exports = router;