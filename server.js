const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const Cafe = require("./models/Cafe");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve HTML, CSS and JS files
app.use(express.static(__dirname));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/cafehub")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

/* ---------------- API ---------------- */
// GET
app.get("/api/cafes", async (req,res)=>{

    const cafes = await Cafe.find();

    res.json(cafes);

});

// POST
app.post("/api/cafes", async (req,res)=>{

    const cafe = new Cafe(req.body);

    await cafe.save();

    res.json(cafe);

});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// UPDATE Cafe
app.put("/api/cafes/:id", async (req, res) => {

    try{

        const cafe = await Cafe.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }

        );

        res.json(cafe);

    }

    catch(err){

        res.status(500).json({ message: err.message });

    }

});

// DELETE Cafe
app.delete("/api/cafes/:id", async (req, res) => {

    try{

        await Cafe.findByIdAndDelete(req.params.id);

        res.json({ message: "Cafe Deleted" });

    }

    catch(err){

        res.status(500).json({ message: err.message });

    }

});