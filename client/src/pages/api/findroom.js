// ini buat list room masing" user
// mencari list room dengan cara id yang sedang login sama dengan id participant atau id masternya

const { MongoClient,ServerApiVersion } = require("mongodb");

export default async function  listRoom(req,res){
    const idLogin = "647b89f5d5ee5e54fde6b01b"
    // const idLogin = localStorage.getItem("idLogin")
    
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
        // find list room dari id yang login
        const roomData = await roomCollection.find({
            $or:[
                {tripParticipant: {$elemMatch: {id:idLogin}}},
                {tripMaster : idLogin}
            ]
        }).toArray()

        // console.log(roomData);
        // console.log(localStorage.getItem("idLogin"));
        res.status(200).json({
            roomData
        })
        
    } catch (error) {
        console.log(error);
    }

}