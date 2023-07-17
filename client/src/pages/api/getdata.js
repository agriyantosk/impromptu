const { MongoClient,ServerApiVersion } = require("mongodb");

export default async function getdata(req,res) {
    const client = new MongoClient("mongodb+srv://rockysaputra9:m6pubHq2E0ixriIp@impromptu.dryyyzi.mongodb.net/?retryWrites=true&w=majority",{
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    })

    try {
        await client.connect()
        const db = client.db("Impromptu_room")

        // cari dari room
        const roomCollection = await db.collection("Room")
        const roomData = await roomCollection.find().toArray()

        // cari dari user
        const userCollection = await db.collection("User")
        const userData = await userCollection.find().toArray()

        res.status(200).json({
            rooms:roomData,
            users:userData
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}
