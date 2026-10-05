require("dotenv").config();
const bookSchema = require("./book.js");
const mongoose=require("mongoose");

const readConnection = mongoose.createConnection(
    process.env.READ_URL
);

const writeConnection = mongoose.createConnection(
    process.env.WRITE_URL
);

readConnection.on("connected", () => {
    console.log("Read database connected");
});

writeConnection.on("connected", () => {
    console.log("Write database connected");
});

readConnection.on("error", (error) => {
    console.error("Read database error:", error);
});

writeConnection.on("error", (error) => {
    console.error("Write database error:", error);
});

const ReadBook = readConnection.model(
    "Book",
    bookSchema,
    "books"
);

const WriteBook = writeConnection.model(
    "Book",
    bookSchema,
    "books"
);

module.exports = {
    readConnection,
    writeConnection,
    ReadBook,
    WriteBook,
};