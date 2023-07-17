const { ObjectId } = require("mongodb");
const { getDb } = require("../config/connection");
const collection = getDb().collection("Trips");

class TripController {
    static async createTrip(req, res, next) {
        try {
            const { tripName } = req.body;
            if (!tripName) {
                throw { name: "Invalid Input" };
            }
            const query = {
                tripMaster: req.user.id,
                tripName: tripName,
            };
            const checkTrip = await collection.findOne(query);
            if (checkTrip) {
                throw { name: "Trip has already been created before" };
            } else {
                const create = await collection.insertOne({
                    tripMaster: req.user.id,
                    tripName: tripName,
                    tripParticipant: [req.user.id],
                });
                res.status(201).json({
                    message: `Trip with "${tripName}" has been created`,
                    id: create.insertedId,
                });
            }
        } catch (error) {
            next(error);
        }
    }

    static async inviteFriend(req, res, next) {
        try {
            const { newTripParticipant } = req.body;
            const { id } = req.params;
            const query = { _id: new ObjectId(id) };
            const findTrip = await collection.findOne(query);
            if (!findTrip) {
                throw { name: "Data not found" };
            } else {
                if (findTrip.tripMaster.toString() !== req.user.id.toString()) {
                    throw { name: "Unauthorized" };
                } else {
                    const checkParticipant =
                        await findTrip.tripParticipant.find(
                            (el) => el._id == new ObjectId(newTripParticipant)
                        );
                    if (checkParticipant) {
                        throw { name: "You've already invited this account!" };
                    } else {
                        const findUser = await getDb()
                            .collection("Users")
                            .findOne({ _id: new ObjectId(newTripParticipant) });
                        if (!findUser) {
                            throw { name: "Data not found" };
                        } else {
                            const update = {
                                $push: {
                                    tripParticipant: new ObjectId(
                                        newTripParticipant
                                    ),
                                },
                            };
                            const addParticipant = await collection.updateOne(
                                query,
                                update
                            );
                            res.status(201).json({
                                message: `Yeay! ${findUser.name} has already aboard`,
                            });
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async deleteTrip(req, res, next) {
        try {
            const { id } = req.params;
            const findTrip = await collection.findOne({
                _id: new ObjectId(id),
            });
            if (findTrip.tripMaster.toString() !== req.user.id.toString()) {
                throw { name: "Unauthorized" };
            } else {
                if (!findTrip) {
                    throw { name: "Data not found" };
                } else {
                    const query = { _id: new ObjectId(id) };
                    await collection.findOneAndDelete(query);
                    res.status(200).json({
                        message: `You have just deleted ${findTrip.tripName} trip`,
                    });
                }
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async removeParticipant(req, res, next) {
        try {
            const { participantId } = req.body;
            const { id } = req.params;
            const query = { _id: new ObjectId(id) };
            const findTrip = await getDb().collection("Trips").findOne(query);
            if (!findTrip) {
                throw { name: "Data not found" };
            } else {
                if (findTrip.tripMaster.toString() !== req.user.id.toString()) {
                    throw { name: "Unauthorized" };
                } else {
                    const findUser = await getDb()
                        .collection("Users")
                        .findOne({ _id: new ObjectId(participantId) });
                    if (!findUser) {
                        throw { name: "Data not found" };
                    } else {
                        const filter = {
                            _id: new ObjectId(id),
                        };

                        const update = {
                            $pull: {
                                tripParticipant: new ObjectId(participantId),
                            },
                        };
                        const result = await collection.updateOne(
                            filter,
                            update
                        );
                        res.status(200).json({
                            message: `Successfully removed ${findUser.name} from ${findTrip.tripName}`,
                        });
                    }
                }
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async fetchTrip(req, res, next) {
        try {
            console.log("masukk sini");
            const query = { tripParticipant: { $in: [req.user.id] } };
            const findTrips = await collection.find(query).toArray();
            if (!findTrips) {
                throw { name: "Data not found" };
            } else {
                res.status(200).json(findTrips);
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async fetchTripDetail(req, res, next) {
        try {
            const { id } = req.params;
            const query = { _id: new ObjectId(id) };
            const tripDetail = await collection.findOne(query);
            if (!tripDetail) {
                throw { name: "Data not found" };
            } else {
                const pipeline = [
                    { $match: { _id: tripDetail._id } },
                    {
                        $lookup: {
                            from: "Users",
                            localField: "tripParticipant",
                            foreignField: "_id",
                            as: "participants",
                        },
                    },
                ];
                // const userDb = await getDb().collection("Users").find({}).toArray()

                // console.log(tripDetail)

                const result = await collection.aggregate(pipeline).toArray();
                res.status(200).json(result);
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async saveItenararies(req, res, next) {
        try {
            const { itenararies } = req.body;
            const { id } = req.params;
            console.log(itenararies, id);
            const data = itenararies
            console.log(data);
            const query = { _id: new ObjectId(id) };
            const findTrip = await collection.findOne(query);
            if (!findTrip) {
                throw { name: "Data not found" };
            } else {
                if (findTrip.tripMaster.toString() !== req.user.id.toString()) {
                    throw { name: "Unauthorized" };
                } else {
                    const filter = { _id: new ObjectId(id) };
                    const update = {
                        $set: {
                            itenararies: data,
                        },
                    };

                    const options = {
                        upsert: false,
                    };

                    const result = await collection.updateMany(
                        filter,
                        update,
                        options
                    );
                    res.status(201).json({
                        message: `Yeay! Your personally generated itineraries have been saved for ${findTrip.tripName}. Enjoy!`,
                    });
                }
            }
        } catch (error) {
            console.log(req.user.id, ">>>");

            console.log(error);
            next(error);
        }
    }

    static async editHotel(req, res, next) {
        try {
            const { placeToStay, address, pricePerNight, description } =
                req.body;
            const { id } = req.params;
            const query = { _id: new ObjectId(id) };
            const findTrip = await collection.findOne(query);
            console.log(findTrip, "ini dari et hotel");
            if (!findTrip) {
                throw { name: "Data not found" };
            } else {
                if (findTrip.tripMaster.toString() !== req.user.id.toString()) {
                    throw { name: "Unauthorized" };
                } else {
                    const filter = {
                        _id: new ObjectId(id),
                    };
                    const update = {
                        $set: {
                            "itenararies.accommodation": {
                                placeToStay: placeToStay,
                                address: address,
                                pricePerNight: pricePerNight,
                                description: description,
                            },
                        },
                    };

                    const result = await collection.updateOne(filter, update);
                    res.status(200).json({
                        message: `Successfully edit accomodations information for ${findTrip.tripName}`,
                    });
                }
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async addActivities(req, res, next) {
        try {
            const { dayIndex, placeToVisit, description, address, toDo } =
                req.body;
            const { id } = req.params;
            const query = { _id: new ObjectId(id) };
            const findTrip = await collection.findOne(query);
            if (!findTrip) {
                throw { name: "Data not found" };
            } else {
                if (findTrip.tripMaster.toString() !== req.user.id.toString()) {
                    throw { name: "Unauthorized" };
                } else {
                    const addActivities = await collection.updateOne(
                        { _id: new ObjectId(id) },
                        {
                            $push: {
                                [`itenararies.itinerary.${dayIndex}.day`]: {
                                    placeToVisit: placeToVisit,
                                    description: description,
                                    address: address,
                                    toDo: toDo,
                                },
                            },
                        }
                    );
                    res.status(201).json({
                        message: `Successfully added new activity to ${findTrip.tripName} itinerary`,
                    });
                }
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async deleteActivities(req, res, next) {
        try {
            const { dayIndex, activityIndex } = req.body;
            const { id } = req.params;
            const query = { _id: new ObjectId(id) };
            const findTrip = await collection.findOne(query);
            if (!findTrip) {
                throw { name: "Data not found" };
            } else {
                if (findTrip.tripMaster.toString() !== req.user.id.toString()) {
                    throw { name: "Unauthorized" };
                } else {
                    const test = await collection
                        .find({ tripParticipant: { $in: [req.user.id] } })
                        .toArray();
                    const fixed = test[1].itenararies.itinerary[dayIndex].day;
                    const filtered = fixed.filter((data, index) => {
                        return index !== activityIndex;
                    });

                    const deleteActivity = await collection.updateOne(
                        { _id: new ObjectId(id) },
                        {
                            $set: {
                                "itenararies.itinerary.0.day": filtered,
                            },
                        }
                    );
                    // const deletedActivity = await collection.updateOne({
                    //     _id: new ObjectId(id)} ,
                    //     { $pull: {"itenararies": {"itinerary": {"day": {"placeToVisit": "Mount Bromo"}}}}}, false, true)

                    // console.log(findActivity.itenararies.itinerary[0].day[2])

                    // const removeNull = await collection.updateOne(
                    //     { _id: new ObjectId(id) },
                    //     {
                    //         $pull: {
                    //             [`itinerary.${+dayIndex}.day`]: null,
                    //         },
                    //     }
                    // );
                    res.status(200).json({
                        message: `Successfully delete activity from ${findTrip.tripName}`,
                    });
                }
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async addBudget(req, res, next) {
        try {
            const { dayIndex, inputBudget } = req.body;
            const { id } = req.params;
            if (!inputBudget) {
                throw { name: "You have not inputed a budget!" };
            } else {
                const query = { _id: new ObjectId(id) };
                const findTrip = await collection.findOne(query);
                if (!findTrip) {
                    throw { name: "Data not found" };
                } else {
                    if (
                        findTrip.tripMaster.toString() !==
                        req.user.id.toString()
                    ) {
                        throw { name: "Unauthorized" };
                    } else {
                        const checkBudget = await collection.findOne(query);
                        const budget =
                            checkBudget.itenararies.itinerary[dayIndex].budget;
                        if (budget) {
                            throw { name: "You already inputed a budget!" };
                        } else {
                            const update = {
                                $set: {
                                    [`itenararies.itinerary.${dayIndex}.budget`]:
                                        inputBudget,
                                },
                            };
                            const addBudget = await collection.updateOne(
                                query,
                                update
                            );
                            res.status(201).json({
                                message: `Budget has been added to ${
                                    findTrip.tripName
                                } - Day ${+dayIndex + 1}`,
                            });
                        }
                    }
                }
            }
        } catch (error) {
            next(error);
        }
    }

    static async editBudget(req, res, next) {
        try {
            const { dayIndex, inputBudget } = req.body;
            const { id } = req.params;
            if (!inputBudget) {
                throw { name: "You have not inputed a budget!" };
            } else {
                const query = { _id: new ObjectId(id) };
                const findTrip = await collection.findOne(query);
                if (!findTrip) {
                    throw { name: "Data not found" };
                } else {
                    if (
                        findTrip.tripMaster.toString() !==
                        req.user.id.toString()
                    ) {
                        throw { name: "Unauthorized" };
                    } else {
                        const update = {
                            $set: {
                                [`itenararies.itinerary.${dayIndex}.budget`]:
                                    inputBudget,
                            },
                        };
                        const result = await collection.updateOne(
                            query,
                            update
                        );
                        res.status(201).json({
                            message: `Budget on ${findTrip.tripName} - Day ${
                                +dayIndex + 1
                            } successfully updated`,
                        });
                    }
                }
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async deleteBudget(req, res, next) {
        try {
            const { dayIndex } = req.body;
            const { id } = req.params;
            const query = { _id: new ObjectId(id) };
            const findTrip = await collection.findOne(query);
            if (!findTrip) {
                throw { name: "Data not found" };
            } else {
                if (findTrip.tripMaster.toString() !== req.user.id.toString()) {
                    throw { name: "Unauthorized" };
                } else {
                    const checkBudget = await collection.findOne(query);
                    const budget =
                        checkBudget.itenararies.itinerary[dayIndex].budget;
                    if (!budget) {
                        throw { name: "You have not inputed a budget!" };
                    } else {
                        console.log(id, dayIndex);
                    }
                }
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = { TripController };
