const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        productCode: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true
        },

        priceAfterTax: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = bookSchema;