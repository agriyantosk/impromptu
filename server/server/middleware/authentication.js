const { ObjectId } = require("mongodb");
const { getDb } = require("../config/connection");
const { verifyToken } = require("../helpers/jwt");
const collection = getDb().collection("Users")

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers;
        if (!access_token) {
            throw { name: "Invalid Token" };
        } else {
            const decodeToken = verifyToken(
                access_token,
                process.env.SECRET_KEY
            );
            const userFromDatabase = await collection.findOne({ _id: new ObjectId(decodeToken._id) });
            if (!userFromDatabase) {
                throw { name: "Invalid Token" };
            } else {
                req.user = { id: userFromDatabase._id };
                next();
            }
        }
    } catch (error) {
        console.log(error)
        next(error);
    }
};

module.exports = authentication;