// <<<<<<< finalize
require("dotenv").config();
const app = require("../app");
const request = require("supertest");
const { MongoClient, ServerApiVersion, Collection } = require("mongodb");
const uri = process.env.MONGODB_URI;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});


async function run(){
    try {
        await client.connect()
        await client.db("admin").command({ping : 1})
    } catch (error) {
        console.log(error);
    }
}

// <<<<<<< finalize
function getDb() {
    return client.db("impromptu_test_db");
}

beforeAll(async () => {
    //connect db
    await client.connect();
    await getDb().collection("Users").deleteMany({});
    const newUser = {
        name: "chang",
        email: "chang@mail.com",
        password: "12345",
        dateOfBirth: "23-05-2000",
        phoneNumber: "23456789",
        address: "Jakarta",
    };

    const response = await request(app).post("/user/register").send(newUser);
});

afterAll(async () => {
    // disconnect
    await getDb().collection("Users").deleteMany({});
    await client.close();
});

describe("/user", () => {
    describe("Post register user", () => {
        test("create user and response user", async () => {
            const newUser = {
                name: "sarido",
                email: "sarido@mail.com",
                password: "12345",
                dateOfBirth: "23-05-2000",
                phoneNumber: "23456789",
                address: "Jakarta",
            };

            const response = await request(app)
                .post("/user/register")
                .send(newUser);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe("Register success");
        });

        test("user register but email has been used", async () => {
            // isi test kondisi email sudah ada
            const newUser = {
                name: "chang",
                email: "chang@mail.com",
                password: "12345",
                dateOfBirth: "23-05-2000",
                phoneNumber: "23456789",
                address: "Jakarta",
            };

            const response = await request(app)
                .post("/user/register")
                .send(newUser);

            expect(response.status).toBe(401);
            expect(response.body.message).toBe("Please use another email");
        });

        test("user register with empty name", async () => {
            const newUser = {
                name: "",
                email: "",
                password: "",
                dateOfBirth: "",
                phoneNumber: "",
                address: "",
            };

            const response = await request(app)
                .post("/user/register")
                .send(newUser);

            expect(response.status).toBe(401);
            expect(response.body.message).toBe("Please check your inputs");
        });
    });
});

describe("Post login user", () => {
    test("user login and response token", async () => {
        // isi test kondisi sukses
        const login = {
            email: "chang@mail.com",
            password: "12345"
        }

        const response = await request(app)
                .post("/user/login")
                .send(login);

                // console.log(response, ">>>")
            expect(response.status).toBe(200);
            expect(typeof response.body.access_token).toBe("string");
    });

    test("failed login with wrong email", async () => {
        const login = {
            email: "benita@mail.com",
            password: "12345"
        }

        const response = await request(app)
                .post("/user/login")
                .send(login);

                // console.log(response, ">>>")
            expect(response.status).toBe(401);
            expect(response.body.message).toBe("Invalid email/password input");
    });

    test("failed login with wrong password", async () => {
        const login = {
            email: "benita@mail.com",
            password: "54321"
        }

        const response = await request(app)
                .post("/user/login")
                .send(login);

                // console.log(response, ">>>")
            expect(response.status).toBe(401);
            expect(response.body.message).toBe("Invalid email/password input");
    });
});
// =======
function getDb(){ 
    return client.db("Impromptu_test")
}

beforeAll(async ()=>{
    //connect db
    await client.connect()
})

afterAll(async ()=>{
    // disconnect
    await client.close()
})

describe('/user', () => {
    describe('Post register user', () => {
        test('create user and response user', async () => {
            // isi test kondisi sukses
        })

        test('user register but email has been used', async () => {
            // isi test kondisi email sudah ada
        })

        test('user register with empty name', async () => {
            // isi test kondisi inputan name kosong
        })

        // buat test sampai address kosong seharusnya
    })

    describe('Post login user', () => {
        test('user login and response token', async () => { 
            // isi test kondisi sukses
        })

        test("failed login with wrong email",async ()=>{

        })

        test('failed login with wrong password', async () => {

        })
    })
})
