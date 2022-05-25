const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const db = require("./flightConnection");

app.post("/flights", (req, res) => {
    let newFlight = req.body;
    const prepared = req.query.prepared;
    db.promise()
        .query(
            `INSERT INTO Flight VALUES('NULL','${newFlight.startingPoint}', '${newFlight.endPoint}', '${newFlight.durationOfFlight}', '${newFlight.typeOfFlight}', '${newFlight.prepared} ')`
        )
        .then(() => {
            console.log("Flight created");
            res.status(201).send({ msg: "Created flight" });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/flights/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db
            .promise()
            .query(`SELECT * FROM flight WHERE id=${id}`);
        res.send(result[0]);
    } catch (error) {
        console.log(error);
    }
});

app.get("/flights", async (req, res) => {
    try {
        const result = await db.promise().query(`SELECT * FROM flight`);
        res.send(result[0]);
    } catch (error) {
        console.log(error);
    }
});

app.delete("/flights/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db
            .promise()
            .query(`DELETE FROM flight WHERE id=${id};`);
        res.send("Flight successfully deleted");
    } catch (error) {
        console.log(error);
    }
});

app.put("/flights/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const prep = req.query.prepared;
        const result = await db.promise().query(`
      UPDATE flight
      SET Prepared = ${prep}
      WHERE id=${id};`);
        res.send(`${result[0].changedRows}`);
    } catch (error) {
        console.log(error);
    }
});

app.listen("1204", () => {
    console.log("Up and running - Flight service");
});
