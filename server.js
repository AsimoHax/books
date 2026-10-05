require("dotenv").config();
const session = require("express-session");
const MongoStore = require("connect-mongo").default;

const express = require("express");

const bookRoutes = require("./database/route.js");
const { engine } = require("express-handlebars");

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_SESSION_URI,
            collectionName: "sessions"
        }),
        cookie: {
            maxAge: 1000 * 60 * 60
        }
    })
);

app.use("/books", bookRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.redirect("/books");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});