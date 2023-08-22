require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const routes = require("./routes");
const app = express();
const mongoose = require("mongoose");
const dbLink = process.env.MONGO;
const helmet = require("helmet");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const csrf = require("csurf");
const {checkCsfrError, csrfMiddleware, } = require("./src/middlewares/csrfMiddleware");

mongoose.connect(dbLink)
    .then(() => {
        console.log("Conectado com a base de dados com sucesso");
        app.emit("db ready");
    })
    .catch(err => console.log(err.message));


app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

const sessionOptions = session({
    secret: "kldjfasklhjf klasjdfksafafd saf as",
    store:  MongoStore.create({mongoUrl: process.env.MONGO}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(csrf());
app.use(checkCsfrError);
app.use(csrfMiddleware);
app.use(sessionOptions);
app.use(routes);
app.set("views", __dirname + "/src/views");
app.set("view engine", "ejs");

app.on("db ready", () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})


