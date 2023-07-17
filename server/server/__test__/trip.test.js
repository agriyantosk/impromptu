require("dotenv").config();
const app = require("../app");
const request = require("supertest");
const {
    MongoClient,
    ServerApiVersion,
    Collection,
    ObjectId,
} = require("mongodb");
const { signToken } = require("../helpers/jwt");
const uri = process.env.MONGODB_URI;
let access_token;
let id;
let friendId;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

// async function run() {
//     try {
//         await client.connect();
//         await client.db("admin").command({ ping: 1 });
//     } catch (error) {
//         console.log(error);
//     }
// }

function getDb() {
    return client.db("impromptu_test_db");
}

beforeAll(async () => {
    //connect db
    await client.connect();
    await getDb().collection("Trips").deleteMany({});

    const newUser = {
        name: "al",
        email: "al@mail.com",
        password: "12345",
        dateOfBirth: "23-05-2000",
        phoneNumber: "23456789",
        address: "Jakarta",
    };

    const friend = {
        name: "tama",
        email: "tama@mail.com",
        password: "12345",
        dateOfBirth: "23-05-2000",
        phoneNumber: "23456789",
        address: "Jakarta",
    };

    // await request(app).post("/user/register").send(newUser);
    const register = await getDb().collection("Users").insertOne(newUser);
    const registerFriend = await getDb().collection("Users").insertOne(friend);

    const userId = register.insertedId;
    friendId = registerFriend.insertedId;
    access_token = signToken({ _id: userId });

    const test = await getDb()
        .collection("Trips")
        .insertOne({
            tripName: "Jalan-jalan",
            tripMaster: userId,
            tripParticipant: [userId, "5t5t5t5t"],
        });
    console.log(test, "INI BAGIAN PAS BARU BIKIN DATA DI DB NYA");
    id = test.insertedId;

    // response = await request(app)
    //             .post("/trip/create")
    //             .send()
    //             .set("access_token", access_token);
    //         expect(response.status).toBe(201);
    //         expect(response.body).toHaveProperty("message");
    //         id = response.body.id;
});

afterAll(async () => {
    // disconnect
    await getDb().collection("Trips").deleteMany({});
    await client.close();
});

describe("/trips", () => {
    describe("/GET trips", () => {
        test("fetch all trips based by logged in users", async () => {
            const response = await request(app)
                .get("/trip")
                .set("access_token", access_token);
            expect(response.status).toBe(200);
            expect(typeof response.body).toBe("object");
        });

        test("fetch all trip by id", async () => {
            const response = await request(app)
                .get(`/trip/${id}`)
                .set("access_token", access_token);

            expect(response.status).toBe(200);
            expect(typeof response.body).toBe("object");
        });
    });

    describe("/POST trips", () => {
        test("create trips", async () => {
            const response = await request(app)
                .post("/trip/create")
                .send({ tripName: "Jalan-jalan lagi" })
                .set("access_token", access_token);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("message");
            expect(typeof response.body.message).toBe("string");
        });

        test("invite friend", async () => {
            const payload = {
                newTripParticipant: friendId,
            };

            const response = await request(app)
                .post(`/trip/invite/${id}`)
                .send(payload)
                .set("access_token", access_token);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("message");
            expect(typeof response.body.message).toBe("string");
        });

        test("save itineraries", async () => {
            const payload =
                '{"accommodation":{"placeToStay":"Novotel Bali","address":"Jalan Kuta, Bali","pricePerNight":"2000000","description":"Enjoy the most beautiful hotel in dewata island"},"itinerary":[{"day":[{"placeToVisit":"Mount Bromo","description":"An active volcano with stunning sunrise and scenic views","address":"East Java, Indonesia","toDo":"Hike to the crater, ride a jeep to the viewpoint, watch the sunrise"},{"placeToVisit":"Madakaripura Waterfall","description":"A majestic waterfall surrounded by lush greenery and caves","address":"East Java, Indonesia","toDo":"Hike to the waterfall, explore the caves, take a dip in the pool"}],"budget":0},{"day":[{"placeToVisit":"Madakaripura Waterfall","description":"A majestic waterfall surrounded by lush greenery and caves","address":"East Java, Indonesia","toDo":"Hike to the waterfall, explore the caves, take a dip in the pool"},{"placeToVisit":"Rafting at Pekalen River","description":"An adrenaline-pumping experience of rafting through rapids and waterfalls","address":"East Java, Indonesia","toDo":"Raft through the river, experience the rapids and waterfalls, enjoy the scenic views"}],"budget":0},{"day":[],"budget":0}]}';

            const response = await request(app)
                .post(`/trip/save-itenararies/${id}`)
                .set("access_token", access_token)
                .set("Accept", "application/json")
                .send(`itenararies=${payload}`);

            expect(response.status).toBe(201);
        });

        test("add activity", async () => {
            const payload = {
                placeToVisit: "Jakarta",
                description: "Kota Jakarta",
                address: "Jakarta, Indonesia",
                toDo: "banyak",
                dayIndex: 0,
            };

            const response = await request(app)
            .post("/trip/activity/add/" + id)
            .send(payload)

            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty("message")
            expect(typeof response.body.message).toBe("string")
        });
    });

    describe("/DELETE trips", () => {
        test("delete trip", async () => {
            const response = await request(app)
                .delete(`/trip/delete/${id}`)
                .set("access_token", access_token);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("message");
            expect(typeof response.body.message).toBe("string");
        });

        // test("remove participant", async () => {
        //         const payload = {
        //             participantId: "5t5t5t5t",
        //         };

        //         const response = await request(app)
        //             .delete(`/trip/remove/${id}`)
        //             .set("access_token", access_token)
        //             .send(payload);

        //         expect(response.status).toBe(200);
        //         expect(response.body).toHaveProperty("message");
        //         expect(typeof response.body.message).toBe("string");
        // });
    });

    describe("/PUT trips", () => {
        test("edit trip hotel", async () => {
            const payload = {
                placeToStay: "Novotel Bali",
                address: "Jalan Kuta, Bali",
                pricePerNight: "2000000",
                description: "Enjoy the most beautiful hotel in dewata island",
            };

            const response = await request(app)
                .put(`/trip/hotel/edit/${id}`)
                .set("access_token", access_token)
                .set("Accept", "application/json")
                .set("Content-Type", "application/json")
                .send(payload);

            expect(response.status).toBe(200);
            expect(typeof response.body).toBe("object");
        });
    });
});
