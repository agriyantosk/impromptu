const { ObjectId } = require("mongodb");
const { getDb } = require("../config/connection");
const collection = getDb().collection("Users");
const { hashPassword, checkPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { search } = require("../routes");

class UserController {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await collection.findOne({ email: email });
            if (!result) {
                throw { name: "Invalid email/password input" };
            } else {
                const access = checkPassword(password, result.password);
                if (!access) {
                    throw { name: "Invalid Input" };
                } else {
                    const access_token = signToken({ _id: result._id });
                    res.status(200).json({ access_token, name: result.name, id: result._id });
                }
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async register(req, res, next) {
        try {
            const { name, email, password, dateOfBirth, phoneNumber, address } =
                req.body;
            if (
                !name ||
                !email ||
                !password ||
                !dateOfBirth ||
                !phoneNumber ||
                !address
            ) {
                throw { name: "Invalid Input" };
            } else {
                const findEmail = await collection.findOne({ email: email });
                if (findEmail) {
                    throw { name: "Email has already been used" };
                } else {
                    const doc = {
                        name,
                        email,
                        password: hashPassword(password),
                        dateOfBirth,
                        phoneNumber,
                        address,
                        friends: [],
                    };
                    const result = await collection.insertOne(doc);
                    res.status(201).json({ message: "Register success" });
                }
            }
        } catch (error) {
            console.log(error, ">>>>>");
            next(error);
        }
    }

    static async fetchFriends(req, res, next) {
        try {
            const user = await collection.findOne({ _id: req.user.id });
            const query = user.friends.map((obj) => {
                const objectId = new ObjectId(obj._id);
                return { _id: objectId };
            });
            if (query.length === 0) {
                res.status(200).json({
                    message: "You dont have friends yet :(",
                });
            } else {
                const fetch = await collection.find({ $or: query }).toArray();
                res.status(200).json({ fetch });
            }
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
    static async addFriend(req, res, next) {
        try {
            const { id } = req.body;
            const findFriends = await collection.findOne({
                _id: new ObjectId(id),
            });
            if (!findFriends) {
                throw { name: "Data not found" };
            } else {
                const query = { _id: req.user.id };
                const update = { $push: { friends: { _id: id } } };
                const findUser = await collection.findOne(query);
                const checkFriends = await findUser.friends.find(
                    (el) => el._id === id
                );
                if (checkFriends) {
                    throw { name: "You already been friends" };
                } else {
                    const addFriend = await collection.updateOne(query, update);
                    res.status(200).json({
                        message: `Congrats! You've just make friends with ${findFriends.name}`,
                    });
                }
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    static async removeFriend(req, res, next) {
        try {
            const { id } = req.body;
            const user = await collection.findOne({ _id: new ObjectId(id) });
            const query = { _id: req.user.id };
            const update = {
                $pull: {
                    friends: { _id: id },
                },
            };
            const remove = await collection.findOneAndUpdate(query, update, {
                returnOriginal: false,
            });
            res.status(200).json({
                message: `Successfully remove ${user.name} from your friendlist`,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async searchUser(req, res, next) {
        try {
            const { searchInput } = req.body;
            console.log(req.body)
            const query = { name: { $regex: new RegExp(searchInput, "i") } };
            const result = await collection.find(query).toArray();
            res.status(200).json(result)
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = { UserController };
