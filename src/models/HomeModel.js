const mongoose = require("mongoose");


const homeSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    descricao: String
});

const Home = new mongoose.model("Home", homeSchema);

module.exports.Home = Home;