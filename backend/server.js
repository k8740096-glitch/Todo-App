require("node:dns/promises").setServers(["1.1.1.1","8.8.8.8"]);
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 5000;
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));

//API routes
app.use("/api/todos", require("./routes/todoroutes"));

//server static files
const   __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist")));

app.get("*",(req, res)=> {
        res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.listen(PORT, () => {console.log(`Server running on port"${PORT}`);
});
