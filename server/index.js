const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const connectToDB = require("./connectToDB");
const IncomeRouter = require("./routes/IncomeRouter");
const ExpenseRouter = require("./routes/ExpenseRouter");

// Initialization
const app = express();

// Load environment variables from .env
dotenv.config();

// Connect to the database
connectToDB(process.env.DB_URL)
    .then(() => {
        console.log("Mongoose connected");
    })
    .catch((error) => {
        console.error("Error in DB connection:", error);
    });

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded request bodies

// Routes
app.use("/income", IncomeRouter);
app.use("/expense", ExpenseRouter);

// Error handling middleware (handles unhandled routes)
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening`);
});
