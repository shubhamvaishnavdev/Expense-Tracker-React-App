const Income = require("../model/IncomeModel")


async function allIncomeData(req, res) {
    try {
        const IncomeData = await Income.find({});
        return res.status(200).json(IncomeData)
        
    } catch (error) {
        console.log("error at allIncomeData server: " + error);
        res.status(500).json({ message: error.message });
    }
}

async function addSingleIncomeData(req, res) {
    try {
        // Create a new income document using the Income model
        const newIncome = new Income(req.body);
        // Save the newIncome to the database
        const savedIncome = await newIncome.save();
        // const allIncomes = await Income.find({});
        res.status(200)
    } catch (error) {
        console.log("error at addSingleIncomeData server: " + error);
        res.status(500).json({ message: error.message });
    }
}


async function getSingleIncome(req, res) {
    try {
        const { id } = req.params;
        const SingleIncome = await Income.findById(id);
        res.status(200).json(SingleIncome)
    } catch (error) {
        console.log("error at getSingleIncome server: " + error);
        res.status(500).json({ message: error.message });
    }
}

async function updateSingleIncome(req, res) {
    try {
        const { id } = req.params;
        const updatingIncome = await Income.findByIdAndUpdate(id,req.body, { new: true }); // Use { new: true } to get the updated document
        if (!updatingIncome) {
            return res.status(404).json({ message: `can not find Income with ID: ${id}` });
        }
        const allIncomes = await Income.find({});
        res.status(200).json(allIncomes);
    } catch (error) {
        console.log("error at updateSingleIncome server: " + error);
        res.status(500).json({ message: error.message });
    }
}

async function deleteSingleIncome(req, res) {
    try {
        const { id } = req.params;
        const deletedIncome = await Income.findByIdAndDelete(id);
        if (!deletedIncome) {
            return res.status(404).json({ message: `can not find Income with ID: ${id}` });
        }
        // Find all remaining data except the deleted document
        const remainData = await Income.find({ _id: { $ne: id } });
        res.status(200).json(remainData);
    } catch (error) {
        console.log("error at deleteSingleIncome server: " + error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    allIncomeData,
    addSingleIncomeData,
    getSingleIncome,
    updateSingleIncome,
    deleteSingleIncome
};