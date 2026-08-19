const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const Cafe = require("./models/Cafe");

const app = express();



app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));


mongoose.connect("mongodb://127.0.0.1:27017/cafehub")
    .then(() => {

        console.log("MongoDB Connected");

    })
    .catch((err) => {

        console.log(err);

    });




app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "crud.html")
    );

});




app.get("/api/cafes", async (req, res, next) => {

    try {

        const { location, event } = req.query;

        let filter = {};

        if (location) {

            filter.location = {
                $regex: location,
                $options: "i"
            };

        }

        if (event) {

            filter.event = {
                $regex: event,
                $options: "i"
            };

        }

        const cafes = await Cafe.find(filter);

        res.json(cafes);

    }

    catch (err) {

        next(err);

    }

});



app.post("/api/cafes", async (req, res, next) => {

    try {

        const cafe = new Cafe(req.body);

        await cafe.save();

        res.status(201).json(cafe);

    }

    catch (err) {

        next(err);

    }

});


app.put("/api/cafes/:id", async (req, res, next) => {

    try {

        const cafe = await Cafe.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );


        if (!cafe) {

            return res.status(404).json({

                message: "Cafe not found"

            });

        }


        res.json(cafe);

    }

    catch (err) {

        next(err);

    }

});


app.delete("/api/cafes/:id", async (req, res, next) => {

    try {

        const cafe =
            await Cafe.findByIdAndDelete(
                req.params.id
            );


        if (!cafe) {

            return res.status(404).json({

                message: "Cafe not found"

            });

        }


        res.json({

            message: "Cafe deleted successfully"

        });

    }

    catch (err) {

        next(err);

    }

});


app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({

        message: "Something went wrong",
        error: err.message

    });

});



const PORT = 3000;

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});