const { ObjectId } = require("mongodb");
const { getDb } = require("../config/connection");
const collection = getDb().collection("Journal");

class JournalController {
    static async fetchJournalByTripId(req, res, next) {
        try {
            const { id } = req.params;
            const query = { tripId: new ObjectId(id) };
            const fetch = await collection.find(query).toArray();
            if (!fetch) {
                throw { name: "Data not found" };
            } else {
                res.status(200).json(fetch);
            }
        } catch (error) {
            next(error);
        }
    }
    static async fetchOneJournal(req, res, next) {
        try {
            const { journalId } = req.params;
            const query = { _id: new ObjectId(journalId) };
            const fetch = await collection.find(query).toArray();
            if (!fetch) {
                throw { name: "Data not found" };
            } else {
                res.status(200).json(fetch);
            }
        } catch (error) {
            next(error);
        }
    }

    static async addJounral(req, res, next) {
        try {
            const { name, expenses, notes, location } = req.body;
            const { id } = req.params;
            if (!name || !expenses || !location) {
                throw { name: "Invalid Input" };
            } else {
                const findTrip = await getDb()
                    .collection("Trips")
                    .findOne({ _id: new ObjectId(id) });
                console.log(findTrip);
                if (!findTrip) {
                    throw { name: "Data not found" };
                } else {
                    const doc = {
                        name,
                        expenses,
                        notes,
                        location,
                        tripId: new ObjectId(id),
                    };
                    const addJournal = await collection.insertOne(doc);
                    res.status(201).json({
                        message: `Successfully addded journal expenses to ${findTrip.tripName}`,
                    });
                }
            }
        } catch (error) {
            next(error);
        }
    }

    static async editJournal(req, res, next) {
        try {
            const { id } = req.params;
            const { name, expenses, notes, location } = req.body;
            if (!name || !expenses || !notes || !location) {
                throw { name: "Invalid Input" };
            } else {
                const findJournal = await collection.findOne({
                    _id: new ObjectId(id),
                });
                if (!findJournal) {
                    throw { name: "Data not Found" };
                } else {
                    const edit = await collection.updateOne(
                        { _id: new ObjectId(id) },
                        {
                            $set: {
                                name: name,
                                expenses: expenses,
                                notes: notes,
                                location: location,
                            },
                        }
                    );
                }
                res.status(200).json({
                    message: `Expense Journal successfully updated!`,
                });
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async deleteJournal(req, res, next) {
        try {
            const { id } = req.params;
            const findJournal = await collection.findOne({
                _id: new ObjectId(id),
            });
            if (!findJournal) {
                throw { name: "Data not Found" };
            } else {
                const deleteJournal = await collection.deleteOne({
                    _id: new ObjectId(id),
                });
                res.status(200).json({
                    message: `Successfully deleted a journal entry`,
                });
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = { JournalController };
