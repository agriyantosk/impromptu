// url mongodb
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
// let db;

// async function connect(){
//     try {
//         db = await client.db("impromptu_db") // masukan nama database
//         return db
//     } catch (error) {
//         console.log(error);
//     }
// }

// function getDb(){
//     return db
// }

// module.exports = {
//     connect,
//     getDb
// }

async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        // console.log(
        //     "Pinged your deployment. You successfully connected to MongoDB!"
        // );
    } catch (error) {
        console.log(error);
    }
}
// run().catch(console.dir);
function getDb() {
    if (process.env.NODE_ENV == "test") {
        return client.db("impromptu_test_db");
    } else {
        return client.db("impromptu_db");
    }
}
module.exports = { run, getDb };
