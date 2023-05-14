const express = require("express");
const NoteController = require("./note.controller");

const router = express.Router();

router.route("/add-note").post(NoteController.addNote);

router.route("/get-note").get(NoteController.getAllNotes);

router.route("/update-note/:id").put(NoteController.updateNote);

router.route("/delete-note/:id").delete(NoteController.deleteNote);

module.exports = router;
