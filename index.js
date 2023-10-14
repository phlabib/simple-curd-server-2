const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


// middlewar
app.use(cors());
app.use(express.json());



// phlabib
// NJoaDTGvvnFOyPaD




const uri = "mongodb+srv://phlabib:NJoaDTGvvnFOyPaD@cluster0.qvpoj05.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Connect to the "userDB" database and access its "haiku" collection
    const database = client.db("userDB");
    const userCollection = database.collection("users");


    app.get("/users", async(req, res) => {
        const cursor = userCollection.find()
        const result = await cursor.toArray();
        res.send(result);
    })


    app.post("/users", async(req, res) =>{
        const user = req.body;
        console.log("new user", user);
        // Insert the defined document into the "userCollection" collection
    const result = await userCollection.insertOne(user);
    res.send(result)
    });


    app.delete("/users/:id", async(req, res) =>{
        const id = req.params.id;
        console.log("please delete from database", id);
        const query = { _id: new ObjectId (id)}
        const result = await userCollection.deleteOne(query);
        res.send(result)

    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("SIMPLW CRUD IS RUNNIN")
})

app.listen(port, () => {
    console.log(`SIMPLE CRUD is running on port, ${port}`);
})