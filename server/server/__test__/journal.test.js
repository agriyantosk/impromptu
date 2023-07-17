require("dotenv").config();
const app = require("../app");
const request = require("supertest");
const { MongoClient, ServerApiVersion, Collection } = require("mongodb");
const uri = process.env.MONGODB_URI;
let access_token;
let id;
let journalId ;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

function getDb() {
    return client.db("impromptu_test_db");
}

beforeAll(async () => {
    
        await client.connect();
        await getDb().collection("Users").deleteMany({});
        await getDb().collection("Trips").deleteMany({});
        
        const newUser = {
            name: "al",
            email: "al@mail.com",
            password: "12345",
            dateOfBirth: "23-05-2000",
            phoneNumber: "23456789",
            address: "Jakarta",
        };
    
        const userNew =  await request(app).post("/user/register").send(newUser);
    
        const login = {
            email: "al@mail.com",
            password: "12345",
        }
        const response = await request(app).post("/user/login").send(login)
        access_token = response.body.access_token;
        const createTrip = await request(app).post("/trip/create").set('access_token', access_token).send({tripName: "Jalan Jalan"})
        id = createTrip.body.id
        const createJournal = await getDb().collection("Journal").insertOne({
            name: "Gryian awal",
            expenses: 200000,
            notes: "buat jajan cimol gan",
            location: 'teras Hacktiv 8'
        })
        journalId = createJournal.insertedId

        // console.log(createJournal.insertedId, "::::");
    //connect db
    
},10000);

afterAll(async () => {
    // disconnect
    await getDb().collection("Users").deleteMany({});

    await getDb().collection("Trips").deleteMany({});
    // await getDb().collection("Journal").deleteMany({});
    await client.close();
});



describe('/journals', ()=>{
    describe('getJournal',()=>{
        test('add journal',async ()=>{
                
                // console.log(id, "INI ID >>>><<<>><><<<><<><>");
    
                const response = await request(app).post(`/journal/add/${id}`)
                .send({
                    name: "Gryian",
                    expenses: 20000,
                    notes: "buat jajan cimol",
                    location: 'teras Hacktiv'
                })
                .set("access_token", access_token);
                expect(response.status).toBe(201)
                expect(response.body).toHaveProperty('message')
                expect(typeof response.body.message).toBe('string')
                
        })

        test('fetch journal',async ()=>{
                
                console.log(access_token, "<<<<<<INI ACCEss token");
    
                const response = await request(app).get(`/journal/${id}`).set("access_token", access_token);
                expect(response.status).toBe(200)
                expect(typeof response.body).toBe('object')
                
        })

        test('edit journal',async ()=>{
                
                // console.log(access_token, "<<<<<<INI ACCEss token");
    
                const response = await request(app).put(`/journal/edit/${journalId}`).send({
                    name: 'Gryan sudah edit',
                    expenses: 25000,
                    notes: 'buat makan batu',
                    location: 'Jakartaaa'
                }).set("access_token", access_token);
                expect(response.status).toBe(200)
                expect(typeof response.body.message).toBe('string')
                expect(response.body).toHaveProperty('message')
                
        })

        test('delete journal',async ()=>{
                
                // console.log(access_token, "<<<<<<INI ACCEss token");
    
                const response = await request(app).delete(`/journal/delete/${journalId}`).set("access_token", access_token);
                expect(response.status).toBe(200)
                expect(typeof response.body.message).toBe('string')
                expect(response.body).toHaveProperty('message')
                
        })
    })
})


