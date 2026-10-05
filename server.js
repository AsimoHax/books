require("dotenv").config();

const express = require("express");

const bookRoutes = require("./database/route.js");

const app = express();

app.use(express.json());

app.use("/books", bookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});