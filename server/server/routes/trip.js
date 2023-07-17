const express = require('express')
const { TripController } = require('../controller/tripController')
const router = express.Router()

router.get('/', TripController.fetchTrip) // D
router.get('/:id', TripController.fetchTripDetail) // D
router.post('/create', TripController.createTrip) // D
router.post("/invite/:id", TripController.inviteFriend) // D
router.delete("/delete/:id", TripController.deleteTrip) // D
router.delete("/remove/:id", TripController.removeParticipant) //

// itinerary settings part
router.post("/save-itenararies/:id", TripController.saveItenararies) //
router.put("/hotel/edit/:id", TripController.editHotel) //
router.post("/activity/add/:id", TripController.addActivities) // D
router.delete("/activity/delete/:id", TripController.deleteActivities) // D

// budgeting part
router.post("/budget/add/:id", TripController.addBudget)
router.put("/budget/edit/:id", TripController.editBudget) // D
router.delete("/budget/delete/:id", TripController.deleteBudget)

module.exports = router