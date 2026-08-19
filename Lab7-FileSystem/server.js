const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const app = express();

const PORT = 4000;

const dataFile = path.join(
    __dirname,
    "data",
    "cafes.json"
);

// MIDDLEWARE
app.use(express.json());


// Serve frontend
app.use(express.static(
    path.join(__dirname, "client")
));


async function readCafes() {

    const data = await fs.readFile(
        dataFile,
        "utf-8"
    );

    return JSON.parse(data);

}



async function writeCafes(cafes) {

    await fs.writeFile(
        dataFile,
        JSON.stringify(cafes, null, 2)
    );

}


app.get("/api/file-cafes", async (req, res) => {

    try {

        const cafes = await readCafes();

        res.json(cafes);

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});



app.post("/api/file-cafes", async (req, res) => {

    try {

        const cafes = await readCafes();

        const newCafe = {

            id: Date.now(),

            name: req.body.name,

            location: req.body.location,

            event: req.body.event,

            rating: req.body.rating || 4.5

        };

        cafes.push(newCafe);

        await writeCafes(cafes);

        res.status(201).json(newCafe);

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// PUT - UPDATE


app.put("/api/file-cafes/:id", async (req, res) => {

    try {

        const cafes = await readCafes();

        const id = Number(req.params.id);

        const index = cafes.findIndex(
            cafe => cafe.id === id
        );


        if (index === -1) {

            return res.status(404).json({
                message: "Cafe not found"
            });

        }


        cafes[index] = {

            ...cafes[index],

            name: req.body.name,

            location: req.body.location,

            event: req.body.event,

            rating: req.body.rating || 4.5

        };


        await writeCafes(cafes);

        res.json(cafes[index]);

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});


// DELETE


app.delete("/api/file-cafes/:id", async (req, res) => {

    try {

        const cafes = await readCafes();

        const id = Number(req.params.id);

        const filteredCafes = cafes.filter(
            cafe => cafe.id !== id
        );


        if (filteredCafes.length === cafes.length) {

            return res.status(404).json({
                message: "Cafe not found"
            });

        }


        await writeCafes(filteredCafes);

        res.json({
            message: "Cafe deleted successfully"
        });

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// START SERVER


app.listen(PORT, () => {

    console.log(
        `Lab 7 server running at http://localhost:${PORT}`
    );

});