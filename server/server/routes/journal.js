const express = require("express");
const router = express.Router();
const { JournalController } = require("../controller/journalController");

router.get("/one/:journalId", JournalController.fetchOneJournal)
router.get("/:id", JournalController.fetchJournalByTripId)
router.post("/add/:id", JournalController.addJounral);
router.put("/edit/:id/", JournalController.editJournal)
router.delete("/delete/:id", JournalController.deleteJournal)

module.exports = router;
