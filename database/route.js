const express = require("express");
const MSSV = process.env.MSSV;

const MSSV_pre = MSSV.slice(-3);
const last_digit = Number(MSSV.slice(-1));

const {
    ReadBook,
    WriteBook
} = require("./mongo.js");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const books = await ReadBook.find().lean();

        const mssv = process.env.MSSV;
        const vat = Number(mssv.slice(-1)) + 5;

        res.render("books", {
            books,
            mssv,
            vat
        });

    } catch (error) {
        console.error("Read error:", error);
        res.status(500).send("Failed to get books");
    }
});

router.post("/", async (req, res) => {
    try {
        const { productCode, name, price } = req.body;
        const VAT = (last_digit + 5) / 100;

        if (!productCode.startsWith(MSSV_pre)) {
            return res.status(400).json({
                message: `Product code must start with ${MSSV_pre}`
            });
        }

        const numericPrice = Number(price);

if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
    return res.status(400).json({
        message: "Price must be a positive number"
    });
}

        const priceAfterTax = price * (1 + VAT);

        const book = await WriteBook.create({
            productCode,
            name,
            priceAfterTax
        });

        res.status(201).json(book);

    } catch (error) {
        console.error("Write error:", error);

        res.status(500).json({
            message: "Failed to create book"
        });
    }
});

module.exports = router;